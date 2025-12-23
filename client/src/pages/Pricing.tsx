import { Link } from "wouter";
import { History, ArrowLeft, Check } from "lucide-react";
import { usePageMeta } from "@/hooks/usePageMeta";
import { PricingCards } from "@/components/PricingCards";
import { FAQ } from "@/components/FAQ";

export default function Pricing() {
  usePageMeta({
    title: "Pricing - WindBack",
    description: "Simple, transparent pricing for WindBack. Start free or go premium for unlimited AI-powered memory at $99/year.",
    keywords: ["pricing", "subscription", "plans", "cost", "premium"]
  });

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-gray-100/50">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2.5 cursor-pointer">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                <History className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">WindBack</span>
            </div>
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/">
              <button className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back to Home</span>
              </button>
            </Link>
            <Link href="/app">
              <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 sm:px-6 py-2 text-sm sm:text-base font-bold shadow-md shadow-blue-100 transition-all hover:scale-105">
                Open App
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
            Simple, Honest Pricing
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Choose the plan that powers your memory. No hidden fees, no surprises.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 px-4">
        <div className="container">
          <PricingCards />
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Complete Feature Comparison
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-6 font-bold text-gray-900">Feature</th>
                  <th className="text-center py-4 px-6 font-bold text-gray-900">Free</th>
                  <th className="text-center py-4 px-6 font-bold text-blue-600 bg-blue-50 rounded-t-xl">Premium</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-4 px-6 font-semibold text-gray-800">AI Processing</td>
                  <td className="py-4 px-6 text-center text-gray-600">10 hours/month</td>
                  <td className="py-4 px-6 text-center bg-blue-50 font-bold text-blue-600">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-gray-800">Local Recording</td>
                  <td className="py-4 px-6 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                  <td className="py-4 px-6 text-center bg-blue-50"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-gray-800">Cloud Sync</td>
                  <td className="py-4 px-6 text-center text-gray-400">—</td>
                  <td className="py-4 px-6 text-center bg-blue-50"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-gray-800">Meeting Summaries</td>
                  <td className="py-4 px-6 text-center text-gray-600">Basic</td>
                  <td className="py-4 px-6 text-center bg-blue-50 font-bold text-blue-600">Advanced</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-gray-800">Search Capability</td>
                  <td className="py-4 px-6 text-center text-gray-600">Standard</td>
                  <td className="py-4 px-6 text-center bg-blue-50 font-bold text-blue-600">AI-Powered</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-gray-800">Ask AI (GPT-5)</td>
                  <td className="py-4 px-6 text-center text-gray-400">—</td>
                  <td className="py-4 px-6 text-center bg-blue-50"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-gray-800">Pendant Sync</td>
                  <td className="py-4 px-6 text-center text-gray-400">—</td>
                  <td className="py-4 px-6 text-center bg-blue-50"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-gray-800">Cross-Device Access</td>
                  <td className="py-4 px-6 text-center text-gray-400">—</td>
                  <td className="py-4 px-6 text-center bg-blue-50"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-gray-800">Priority Support</td>
                  <td className="py-4 px-6 text-center text-gray-400">—</td>
                  <td className="py-4 px-6 text-center bg-blue-50"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-gray-800">Early Access to Features</td>
                  <td className="py-4 px-6 text-center text-gray-400">—</td>
                  <td className="py-4 px-6 text-center bg-blue-50 rounded-b-xl"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Money-Back Guarantee */}
      <section className="py-20 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            30-Day Money-Back Guarantee
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Try Premium risk-free. If you're not completely satisfied within 30 days of purchase, 
            we'll refund your payment—no questions asked.
          </p>
          <p className="text-gray-500">
            Your satisfaction is our priority. We want you to love WindBack.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Join thousands of professionals using WindBack to augment their memory.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/app">
              <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-10 py-4 text-lg font-bold shadow-xl shadow-blue-200 transition-all hover:scale-105">
                Start Free
              </button>
            </Link>
            <Link href="#pricing">
              <button className="bg-white hover:bg-gray-50 text-gray-900 rounded-full px-10 py-4 text-lg font-bold border-2 border-gray-200 transition-all hover:scale-105">
                View Plans
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-gray-100 bg-[#FDFDFD]">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <History className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight">WindBack</span>
            </div>
            <div className="flex gap-10 text-sm font-bold text-gray-400">
              <Link href="/privacy" className="hover:text-blue-600 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-blue-600 transition-colors">
                Terms
              </Link>
              <a href="#" className="hover:text-blue-600 transition-colors">Security</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
            </div>
            <p className="text-gray-400 text-sm font-medium">© 2025 WindBack. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
