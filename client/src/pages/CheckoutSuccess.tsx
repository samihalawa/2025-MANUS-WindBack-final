import { CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { usePageMeta } from "@/hooks/usePageMeta";
import { seoPages } from "@/lib/seoMeta";

export default function CheckoutSuccess() {
  usePageMeta(seoPages.checkoutSuccess);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-20 h-20 text-green-500" />
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to WindBack Pro!
        </h1>

        <p className="text-xl text-gray-600 mb-8">
          Your payment was successful. Your premium subscription is now active.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            What's next?
          </h2>
          <ul className="text-left space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-green-500 font-bold">✓</span>
              <span>Access all premium features immediately</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 font-bold">✓</span>
              <span>Unlimited searches and memory storage</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 font-bold">✓</span>
              <span>Priority support and updates</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 font-bold">✓</span>
              <span>Advanced AI features and analytics</span>
            </li>
          </ul>
        </div>

        <p className="text-sm text-gray-600 mb-8">
          A confirmation email has been sent to your inbox with your receipt and subscription details.
        </p>

        <div className="flex flex-col gap-3">
          <Link href="/app">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
              Start Using WindBack
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>

          <Link href="/">
            <Button variant="outline" className="w-full py-3 rounded-lg font-semibold">
              Back to Home
            </Button>
          </Link>
        </div>

        <p className="text-xs text-gray-500 mt-8">
          Need help? Contact our support team at support@windback.ai
        </p>
      </div>
    </div>
  );
}
