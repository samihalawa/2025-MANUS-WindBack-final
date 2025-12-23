import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Sparkles, Lock, Zap, Shield } from "lucide-react";
import { toast } from "sonner";

interface PremiumPaywallProps {
  isOpen: boolean;
  onClose?: () => void;
  onUpgrade?: () => void;
}

/**
 * PremiumPaywall Modal - Shows premium upgrade offer with $99/year pricing
 * Appears when users access the app demo
 */
export function PremiumPaywall({ isOpen, onClose, onUpgrade }: PremiumPaywallProps) {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleUpgrade = async () => {
    setIsLoading(true);
    try {
      // Call the Stripe checkout API via tRPC
      const response = await fetch("/api/trpc/stripe.createCheckoutSession", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          json: {
            priceId: "price_premium_annual",
            successUrl: `${window.location.origin}/app?payment=success`,
            cancelUrl: `${window.location.origin}/app?payment=cancelled`
          }
        })
      });

      const data = await response.json();

      if (data.result?.data?.checkoutUrl) {
        const checkoutWindow = window.open(data.result.data.checkoutUrl, "_blank", "noopener,noreferrer");
        if (checkoutWindow) checkoutWindow.opener = null;
        toast.success("Opening Stripe Checkout...");
        onUpgrade?.();
      } else {
        toast.error("Failed to create checkout session");
      }
    } catch (error) {
      toast.error("Upgrade failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-lg mx-4 bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Content */}
        <div className="p-12 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Unlock Your Memory
          </h2>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Experience the full power of WindBack with unlimited AI processing, advanced search, and cross-device sync.
          </p>

          {/* Features List */}
          <div className="space-y-4 mb-10 text-left">
            {[
              { icon: Zap, label: "Unlimited AI Processing" },
              { icon: Shield, label: "Advanced Security & Privacy" },
              { icon: Lock, label: "Cross-Device Cloud Sync" }
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-gray-700">
                <feature.icon className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="font-medium">{feature.label}</span>
              </div>
            ))}
          </div>

          {/* Pricing */}
          <div className="mb-8 p-6 bg-blue-50 rounded-2xl border-2 border-blue-100">
            <div className="flex items-baseline justify-center gap-2 mb-2">
              <span className="text-5xl font-bold text-gray-900">$99</span>
              <span className="text-lg text-gray-600">/year</span>
            </div>
            <p className="text-sm text-gray-600">Just $8.25 per month, billed annually</p>
          </div>

          {/* CTA Button */}
          <Button
            onClick={handleUpgrade}
            disabled={isLoading}
            className="w-full h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-200 transition-all mb-4"
          >
            {isLoading ? "Processing..." : "Upgrade Now"}
          </Button>

          {/* Dismiss Option */}
          <button
            onClick={onClose}
            className="w-full text-gray-600 hover:text-gray-900 font-medium py-2 transition-colors"
          >
            Continue as Guest
          </button>

          {/* Trust Badge */}
          <p className="text-xs text-gray-500 mt-6">
            🔒 Secure payment powered by Stripe. No hidden fees.
          </p>
        </div>
      </div>
    </div>
  );
}
