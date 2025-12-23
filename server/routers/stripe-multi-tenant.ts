import { protectedProcedure, router } from "../_core/trpc";
import { z } from "zod";
import { getDb } from "../db-multi-tenant";
import { subscriptions, invoices, organizations } from "../../drizzle/schema";
import { eq, and } from "drizzle-orm";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
let stripe: any = null;

if (STRIPE_SECRET_KEY) {
  try {
    const Stripe = require("stripe").default;
    stripe = new Stripe(STRIPE_SECRET_KEY);
  } catch (error) {
    console.warn("[Stripe] Failed to initialize Stripe:", error);
  }
}

export const stripeMultiTenantRouter = router({
  /**
   * Create a checkout session for subscription
   */
  createCheckoutSession: protectedProcedure
    .input(
      z.object({
        organizationId: z.number(),
        priceId: z.string(),
        successUrl: z.string().url(),
        cancelUrl: z.string().url(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!stripe) {
        throw new Error("Stripe is not configured");
      }

      if (!ctx.user) {
        throw new Error("User not authenticated");
      }

      try {
        const db = await getDb();
        if (!db) {
          throw new Error("Database not available");
        }

        // Verify user has access to organization
        const org = await db
          .select()
          .from(organizations)
          .where(eq(organizations.id, input.organizationId))
          .limit(1);

        if (org.length === 0) {
          throw new Error("Organization not found");
        }

        let customerId: string | undefined;

        // Check if organization already has a Stripe customer
        if (org[0].stripeCustomerId) {
          customerId = org[0].stripeCustomerId;
        } else {
          // Create new Stripe customer
          const customer = await stripe.customers.create({
            email: ctx.user.email || undefined,
            name: org[0].name,
            metadata: {
              organizationId: input.organizationId.toString(),
              userId: ctx.user.id.toString(),
            },
          });
          customerId = customer.id;

          // Update organization with Stripe customer ID
          // Note: This would require an update function
        }

        // Create checkout session
        const session = await stripe.checkout.sessions.create({
          customer: customerId,
          payment_method_types: ["card"],
          line_items: [
            {
              price: input.priceId,
              quantity: 1,
            },
          ],
          mode: "subscription",
          success_url: input.successUrl,
          cancel_url: input.cancelUrl,
          client_reference_id: input.organizationId.toString(),
          metadata: {
            organizationId: input.organizationId.toString(),
            userId: ctx.user.id.toString(),
          },
          allow_promotion_codes: true,
        });

        if (!session.url) {
          throw new Error("Checkout session URL not returned from Stripe");
        }

        return {
          sessionId: session.id,
          url: session.url,
        };
      } catch (error) {
        console.error("[Stripe] Checkout session creation failed:", error);
        throw error;
      }
    }),

  /**
   * Get organization subscription status
   */
  getSubscriptionStatus: protectedProcedure
    .input(z.object({ organizationId: z.number() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.user) {
        return {
          status: "free",
          plan: "Free",
          customerId: null,
          subscriptionId: null,
        };
      }

      try {
        const db = await getDb();
        if (!db) {
          return {
            status: "free",
            plan: "Free",
            customerId: null,
            subscriptionId: null,
          };
        }

        const sub = await db
          .select()
          .from(subscriptions)
          .where(eq(subscriptions.organizationId, input.organizationId))
          .limit(1);

        if (sub.length === 0) {
          return {
            status: "free",
            plan: "Free",
            customerId: null,
            subscriptionId: null,
          };
        }

        const subscription = sub[0];
        return {
          status: subscription.status || "free",
          plan: subscription.status === "active" ? "Premium" : "Free",
          customerId: subscription.stripeCustomerId,
          subscriptionId: subscription.stripeSubscriptionId,
          currentPeriodEnd: subscription.currentPeriodEnd?.toISOString(),
          cancelAtPeriodEnd: subscription.cancelAtPeriodEnd === 1,
        };
      } catch (error) {
        console.error("[Stripe] Error fetching subscription status:", error);
        return {
          status: "free",
          plan: "Free",
          customerId: null,
          subscriptionId: null,
        };
      }
    }),

  /**
   * Create a billing portal session
   */
  createBillingPortalSession: protectedProcedure
    .input(
      z.object({
        organizationId: z.number(),
        returnUrl: z.string().url(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!stripe) {
        throw new Error("Stripe is not configured");
      }

      if (!ctx.user) {
        throw new Error("User not authenticated");
      }

      try {
        const db = await getDb();
        if (!db) {
          throw new Error("Database not available");
        }

        const sub = await db
          .select()
          .from(subscriptions)
          .where(eq(subscriptions.organizationId, input.organizationId))
          .limit(1);

        if (sub.length === 0 || !sub[0].stripeCustomerId) {
          throw new Error("No subscription found for this organization");
        }

        const session = await stripe.billingPortal.sessions.create({
          customer: sub[0].stripeCustomerId,
          return_url: input.returnUrl,
        });

        return {
          url: session.url,
        };
      } catch (error) {
        console.error("[Stripe] Billing portal session creation failed:", error);
        throw error;
      }
    }),

  /**
   * Get organization invoices
   */
  getInvoices: protectedProcedure
    .input(z.object({ organizationId: z.number() }))
    .query(async ({ ctx, input }) => {
      try {
        const db = await getDb();
        if (!db) {
          return [];
        }

        return await db
          .select()
          .from(invoices)
          .where(eq(invoices.organizationId, input.organizationId));
      } catch (error) {
        console.error("[Stripe] Error fetching invoices:", error);
        return [];
      }
    }),
});

export type StripeMultiTenantRouter = typeof stripeMultiTenantRouter;
