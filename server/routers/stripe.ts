import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { z } from "zod";
import Stripe from "stripe";
import { ENV } from "../_core/env";
import { getDb } from "../db";
import { subscriptions } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

let stripe: any = null;
if (ENV.stripeSecretKey) {
  stripe = new Stripe(ENV.stripeSecretKey);
}
// Stripe SDK handles API versioning automatically

/**
 * Stripe Router - Handle all payment-related operations
 */
export const stripeRouter = router({
  /**
   * Create a checkout session for a subscription or one-time purchase
   * Returns the checkout URL to redirect the user to Stripe Checkout
   */
  createCheckoutSession: protectedProcedure
    .input(
      z.object({
        priceId: z.string().describe("Stripe Price ID"),
        successUrl: z.string().url().describe("URL to redirect after successful payment"),
        cancelUrl: z.string().url().describe("URL to redirect if user cancels")
      })
    )
    .mutation(async ({ input, ctx }) => {
    if (!stripe) {
      throw new Error("Stripe is not configured. Please set STRIPE_SECRET_KEY environment variable.");
    }
      if (!ctx.user) {
        throw new Error("User not authenticated");
      }

      try {
        const db = await getDb();
        let customerId: string;

        // Check if user already has a Stripe customer ID in the database
        if (db) {
          const existingSubscription = await db
            .select()
            .from(subscriptions)
            .where(eq(subscriptions.userId, ctx.user.id))
            .limit(1);

          if (existingSubscription.length > 0) {
            customerId = existingSubscription[0].stripeCustomerId;
          } else {
            const customer = await stripe.customers.create({
              email: ctx.user.email || undefined,
              name: ctx.user.name || undefined,
              metadata: {
                userId: ctx.user.id.toString(),
                openId: ctx.user.openId
              }
            });
            customerId = customer.id;
          }
        } else {
          const customer = await stripe.customers.create({
            email: ctx.user.email || undefined,
            name: ctx.user.name || undefined,
            metadata: {
              userId: ctx.user.id.toString(),
              openId: ctx.user.openId
            }
          });
          customerId = customer.id;
        }

        // Create checkout session
        const session = await stripe.checkout.sessions.create({
          customer: customerId,
          payment_method_types: ["card"],
          line_items: [
            {
              price: input.priceId,
              quantity: 1
            }
          ],
          mode: "subscription", // Use "payment" for one-time purchases
          success_url: input.successUrl,
          cancel_url: input.cancelUrl,
          client_reference_id: ctx.user.id.toString(),
          metadata: {
            userId: ctx.user.id.toString(),
            userEmail: ctx.user.email || "unknown"
          },
          allow_promotion_codes: true
        });

        if (!session.url) {
          throw new Error("Checkout session URL not returned from Stripe");
        }

        return {
          checkoutUrl: session.url,
          sessionId: session.id
        };
      } catch (error) {
        throw new Error("Failed to create checkout session");
      }
    }),

  /**
   * Get the user's subscription status
   */
  getSubscriptionStatus: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.user) {
      return {
        status: "free",
        plan: "Free",
        customerId: null,
        subscriptionId: null
      };
    }
    try {
      const db = await getDb();
      if (!db) {
        return {
          status: "free",
          plan: "Free",
          customerId: null,
          subscriptionId: null
        };
      }
      const userSubscription = await db
        .select()
        .from(subscriptions)
        .where(eq(subscriptions.userId, ctx.user.id))
        .limit(1);
      if (userSubscription.length === 0) {
        return {
          status: "free",
          plan: "Free",
          customerId: null,
          subscriptionId: null
        };
      }
      const sub = userSubscription[0];
      return {
        status: sub.status || "free",
        plan: sub.status === "active" ? "Premium" : "Free",
        customerId: sub.stripeCustomerId,
        subscriptionId: sub.stripeSubscriptionId,
        currentPeriodEnd: sub.currentPeriodEnd?.toISOString(),
        cancelAtPeriodEnd: sub.cancelAtPeriodEnd === 1
      };
    } catch (error) {
      console.error("Error fetching subscription status:", error);
      return {
        status: "free",
        plan: "Free",
        customerId: null,
        subscriptionId: null
      };
    }
  }),

  /**
   * Create a billing portal session for the user to manage their subscription
   */
  createBillingPortalSession: protectedProcedure
    .input(
      z.object({
        returnUrl: z.string().url()
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx.user) {
        throw new Error("User not authenticated");
      }

      try {
        const db = await getDb();
        if (!db) {
          throw new Error("Database not available");
        }

        const userSubscription = await db
          .select()
          .from(subscriptions)
          .where(eq(subscriptions.userId, ctx.user.id))
          .limit(1);

        if (userSubscription.length === 0) {
          throw new Error("No subscription found for user");
        }

        const customerId = userSubscription[0].stripeCustomerId;

        const session = await stripe.billingPortal.sessions.create({
          customer: customerId,
          return_url: input.returnUrl
        });

        return {
          portalUrl: session.url
        };
      } catch (error) {
        throw new Error("Failed to create billing portal session");
      }
    })
});
