import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { z } from "zod";
import Stripe from "stripe";
import { ENV } from "../_core/env";

const stripe = new Stripe(ENV.stripeSecretKey || "");
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
      if (!ctx.user) {
        throw new Error("User not authenticated");
      }

      try {
        // Create or retrieve customer
        let customerId: string;

        // Check if user already has a Stripe customer ID in the database
        // For now, we'll create a new customer each time (you should store this)
        const customer = await stripe.customers.create({
          email: ctx.user.email || undefined,
          name: ctx.user.name || undefined,
          metadata: {
            userId: ctx.user.id.toString(),
            openId: ctx.user.openId
          }
        });

        customerId = customer.id;

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

        return {
          checkoutUrl: session.url || `${process.env.VITE_FRONTEND_FORGE_API_URL || 'http://localhost:3000'}/checkout/success`,
          sessionId: session.id
        };
      } catch (error) {
        console.error("[Stripe] Checkout session creation failed:", error);
        throw new Error("Failed to create checkout session");
      }
    }),

  /**
   * Get the user's subscription status
   */
  getSubscriptionStatus: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.user) {
      return null;
    }

    try {
      // In a real app, you'd fetch this from your database
      // For now, return a placeholder
      return {
        status: "free",
        plan: "Free",
        customerId: null,
        subscriptionId: null
      };
    } catch (error) {
      console.error("[Stripe] Failed to get subscription status:", error);
      return null;
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
        // You would fetch the customer ID from your database
        // For now, this is a placeholder
        const customerId = "cus_placeholder";

        const session = await stripe.billingPortal.sessions.create({
          customer: customerId,
          return_url: input.returnUrl
        });

        return {
          portalUrl: session.url
        };
      } catch (error) {
        console.error("[Stripe] Billing portal creation failed:", error);
        throw new Error("Failed to create billing portal session");
      }
    })
});
