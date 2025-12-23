import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";

const SUMUP_API = "https://api.sumup.com/v0.1";
const SUMUP_KEY = process.env.SUMUP_API_KEY!;
const MERCHANT_CODE = process.env.SUMUP_MERCHANT_CODE!;

async function sumupFetch(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${SUMUP_API}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${SUMUP_KEY}`,
      ...options.headers,
    },
  });
  return res.json();
}

export const sumupRouter = router({
  // Create checkout for one-time payment
  createCheckout: protectedProcedure
    .input(z.object({
      amount: z.number().min(0.01),
      currency: z.string().default("EUR"),
      description: z.string().optional(),
      customerId: z.string().optional(),
      saveCard: z.boolean().default(false),
    }))
    .mutation(async ({ ctx, input }) => {
      const ref = `WB-${ctx.user.id}-${Date.now()}`;
      const body: Record<string, unknown> = {
        checkout_reference: ref,
        amount: input.amount,
        currency: input.currency,
        merchant_code: MERCHANT_CODE,
        description: input.description || "WindBack Payment",
      };
      if (input.customerId) body.customer_id = input.customerId;
      if (input.saveCard) body.purpose = "SETUP_RECURRING_PAYMENT";

      return sumupFetch("/checkouts", {
        method: "POST",
        body: JSON.stringify(body),
      });
    }),

  // Create customer for saving cards
  createCustomer: protectedProcedure
    .input(z.object({
      email: z.string().email(),
      firstName: z.string().optional(),
      lastName: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      return sumupFetch("/customers", {
        method: "POST",
        body: JSON.stringify({
          customer_id: `WB-${ctx.user.id}`,
          personal_details: {
            email: input.email,
            first_name: input.firstName,
            last_name: input.lastName,
          },
        }),
      });
    }),

  // Get saved cards for customer
  getSavedCards: protectedProcedure.query(async ({ ctx }) => {
    return sumupFetch(`/customers/WB-${ctx.user.id}/payment-instruments`);
  }),

  // Charge saved card
  chargeToken: protectedProcedure
    .input(z.object({
      token: z.string(),
      amount: z.number().min(0.01),
      currency: z.string().default("EUR"),
      description: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const ref = `WB-${ctx.user.id}-${Date.now()}`;
      const customerId = `WB-${ctx.user.id}`;

      // Create checkout
      const checkout = await sumupFetch("/checkouts", {
        method: "POST",
        body: JSON.stringify({
          checkout_reference: ref,
          amount: input.amount,
          currency: input.currency,
          merchant_code: MERCHANT_CODE,
          description: input.description || "WindBack Recurring",
          customer_id: customerId,
        }),
      });

      if (checkout.error_code) return checkout;

      // Process with token
      return sumupFetch(`/checkouts/${checkout.id}`, {
        method: "PUT",
        body: JSON.stringify({
          payment_type: "card",
          token: input.token,
          customer_id: customerId,
        }),
      });
    }),

  // Get checkout status
  getCheckout: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return sumupFetch(`/checkouts/${input.id}`);
    }),

  // Get public key for frontend widget
  getPublicKey: publicProcedure.query(() => ({
    publicKey: process.env.SUMUP_PUBLIC_KEY,
    merchantCode: MERCHANT_CODE,
  })),
});
