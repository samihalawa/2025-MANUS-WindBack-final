/**
 * Stripe Product & Price Configuration
 * Define all subscription plans and one-time purchases here
 */

export const PRODUCTS = {
  // Free Plan - No Stripe product needed (no payment)
  FREE: {
    name: "Free",
    description: "The essential memory foundation.",
    price: 0,
    currency: "usd",
    interval: "month",
    features: [
      "10 hours of AI processing / mo",
      "Unlimited local recording",
      "Basic meeting summaries",
      "Standard search"
    ]
  },

  // Pro Plan - Monthly Subscription
  PRO_MONTHLY: {
    name: "Pro",
    description: "For those who need total recall.",
    price: 1900, // $19.00 in cents
    currency: "usd",
    interval: "month",
    // Stripe Price ID should be set in environment or fetched from Stripe API
    // Example: price_1234567890abcdef
    features: [
      "Unlimited AI processing",
      "Advanced GPT-5 Ask AI",
      "Pendant hardware sync",
      "Priority support & early access",
      "Cross-device cloud sync"
    ]
  },

  // Pro Plan - Annual Subscription (20% discount)
  PRO_ANNUAL: {
    name: "Pro (Annual)",
    description: "For those who need total recall.",
    price: 18240, // $182.40 in cents (20% off)
    currency: "usd",
    interval: "year",
    features: [
      "Unlimited AI processing",
      "Advanced GPT-5 Ask AI",
      "Pendant hardware sync",
      "Priority support & early access",
      "Cross-device cloud sync"
    ]
  },

  // Enterprise Plan
  ENTERPRISE: {
    name: "Enterprise",
    description: "Custom solutions for teams and organizations.",
    price: null, // Custom pricing
    currency: "usd",
    interval: "month",
    features: [
      "Everything in Pro",
      "Team management & SSO",
      "Custom integrations",
      "Dedicated support",
      "Advanced analytics",
      "On-premise deployment options"
    ]
  }
};

/**
 * Get a product by key
 */
export function getProduct(key: keyof typeof PRODUCTS) {
  return PRODUCTS[key];
}

/**
 * Get all subscription products (excluding free)
 */
export function getSubscriptionProducts() {
  return [PRODUCTS.PRO_MONTHLY, PRODUCTS.PRO_ANNUAL, PRODUCTS.ENTERPRISE];
}

/**
 * Format price for display
 */
export function formatPrice(priceInCents: number | null, currency: string = "usd"): string {
  if (priceInCents === null) {
    return "Custom";
  }
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase()
  });
  return formatter.format(priceInCents / 100);
}
