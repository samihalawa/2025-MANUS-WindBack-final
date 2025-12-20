import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";

/**
 * PricingCards Component - Displays subscription plans with Stripe checkout
 */
export function PricingCards() {
  return (
    <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
      {/* Free Plan */}
      <Card className="p-12 border-gray-100 shadow-xl rounded-[2.5rem] transition-all hover:shadow-2xl hover:-translate-y-1">
        <div className="mb-10">
          <h3 className="text-2xl font-bold mb-3">Free</h3>
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-bold">$0</span>
            <span className="text-gray-400 font-semibold">/mo</span>
          </div>
          <p className="text-gray-500 mt-6 font-medium">The essential memory foundation.</p>
        </div>
        <ul className="space-y-5 mb-12">
          {[
            "10 hours of AI processing / mo",
            "Unlimited local recording",
            "Basic meeting summaries",
            "Standard search"
          ].map((feature, i) => (
            <li key={i} className="flex items-center gap-4 text-gray-600 font-semibold">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Link href="/app">
          <Button className="w-full rounded-full h-16 text-lg font-bold border-gray-200 hover:bg-gray-50" variant="outline">
            Get Started
          </Button>
        </Link>
      </Card>

      {/* Premium Plan */}
      <Card className="p-12 border-blue-100 shadow-2xl rounded-[2.5rem] bg-blue-50/30 relative overflow-hidden transition-all hover:shadow-blue-100 hover:-translate-y-1">
        <div className="absolute top-0 right-0 bg-blue-600 text-white text-[11px] font-black px-5 py-2 rounded-bl-2xl uppercase tracking-widest">
          Most Popular
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-bold mb-3">Premium</h3>
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-bold">$99</span>
            <span className="text-gray-400 font-semibold">/year</span>
          </div>
          <p className="text-gray-500 mt-6 font-medium">Full access to all features.</p>
        </div>
        <ul className="space-y-5 mb-12">
          {[
            "Unlimited AI processing",
            "Advanced GPT-5 Ask AI",
            "Pendant hardware sync",
            "Priority support & early access",
            "Cross-device cloud sync"
          ].map((feature, i) => (
            <li key={i} className="flex items-center gap-4 text-gray-700 font-semibold">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <StripeCheckoutButton priceId="price_pro_monthly" />
      </Card>
    </div>
  );
}

/**
 * StripeCheckoutButton Component - Triggers Stripe Checkout
 */
function StripeCheckoutButton({ priceId }: { priceId: string }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      // Call the Stripe checkout API via tRPC
      const response = await fetch("/api/trpc/stripe.createCheckoutSession", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          json: {
            priceId,
            successUrl: `${window.location.origin}/checkout/success`,
            cancelUrl: `${window.location.origin}/checkout/cancel`
          }
        })
      });

      const data = await response.json();

      if (data.result?.data?.checkoutUrl) {
        window.open(data.result.data.checkoutUrl, "_blank");
        toast.success("Redirecting to Stripe Checkout...");
      } else {
        toast.error("Failed to create checkout session");
      }
    } catch (error) {
      console.error("Checkout failed:", error);
      toast.error("Checkout failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleCheckout}
      disabled={isLoading}
      className="w-full rounded-full h-16 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200"
    >
      {isLoading ? "Loading..." : "Go Pro"}
    </Button>
  );
}
