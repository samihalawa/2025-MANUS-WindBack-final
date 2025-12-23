import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowRight, Zap, Brain, Lock, Share2, BarChart3, Users } from "lucide-react";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function LandingImproved() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const newsletterMutation = trpc.newsletter.subscribe.useMutation();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setIsLoading(true);
    try {
      await newsletterMutation.mutateAsync({ email });
      toast.success("Successfully subscribed!");
      setEmail("");
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <span className="font-bold text-lg">WindBack</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition">
              Features
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition">
              Pricing
            </a>
            <a href="#faq" className="text-gray-600 hover:text-gray-900 transition">
              FAQ
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => (window.location.href = getLoginUrl())}>
              Sign In
            </Button>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Your AI Assistant with All the Context
            </h1>
            <p className="text-xl md:text-2xl text-gray-600">
              WindBack captures everything you've seen, said, or heard. Your personal AI that truly understands you.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 text-base"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="h-12 px-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 whitespace-nowrap"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Subscribing...
                </>
              ) : (
                <>
                  Get Rewind
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          <p className="text-sm text-gray-500">
            Join thousands of professionals who remember everything that matters
          </p>
        </div>

        {/* Hero Image Placeholder */}
        <div className="mt-16 rounded-2xl bg-gradient-to-br from-purple-100 to-blue-100 p-8 md:p-12 aspect-video flex items-center justify-center">
          <div className="text-center">
            <Brain className="w-16 h-16 mx-auto mb-4 text-purple-600 opacity-50" />
            <p className="text-gray-600">Interactive Demo Coming Soon</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">Powerful Features</h2>
            <p className="text-xl text-gray-600">Everything you need to stay organized and productive</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI-Powered Search",
                description: "Find any memory instantly with natural language search powered by advanced AI",
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Instant access to your entire memory bank with optimized performance",
              },
              {
                icon: Lock,
                title: "Privacy First",
                description: "Your data is encrypted and secure. We never share your personal information",
              },
              {
                icon: Share2,
                title: "Easy Sharing",
                description: "Share memories and insights with your team securely",
              },
              {
                icon: BarChart3,
                title: "Analytics",
                description: "Understand your patterns and productivity with detailed insights",
              },
              {
                icon: Users,
                title: "Team Collaboration",
                description: "Work together with your team on shared projects and memories",
              },
            ].map((feature, idx) => (
              <Card key={idx} className="border-gray-200 hover:border-purple-300 transition">
                <CardHeader>
                  <feature.icon className="w-8 h-8 text-purple-600 mb-2" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-gradient-to-br from-purple-50 to-blue-50 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">Choose the plan that fits your needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: "Free",
                price: "0",
                description: "Perfect for getting started",
                features: ["5 GB storage", "Basic search", "1 organization"],
              },
              {
                name: "Pro",
                price: "29",
                description: "For power users",
                features: ["100 GB storage", "Advanced AI search", "Unlimited organizations", "Team collaboration"],
                highlighted: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                description: "For large teams",
                features: ["Unlimited storage", "Custom integrations", "Dedicated support", "SSO & advanced security"],
              },
            ].map((plan, idx) => (
              <Card
                key={idx}
                className={`${
                  plan.highlighted
                    ? "border-purple-600 shadow-lg scale-105"
                    : "border-gray-200"
                } transition`}
              >
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    {plan.price !== "Custom" && <span className="text-gray-600">/month</span>}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-purple-600 rounded-full" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      plan.highlighted
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                        : ""
                    }`}
                    variant={plan.highlighted ? "default" : "outline"}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">Ready to Remember Everything?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Join thousands of professionals who use WindBack to stay organized and productive
          </p>
          <Button
            size="lg"
            className="bg-white text-purple-600 hover:bg-gray-100"
            onClick={() => (window.location.href = getLoginUrl())}
          >
            Start Free Trial
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold mb-4">WindBack</h3>
              <p className="text-sm">Your AI assistant with all the context</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm">&copy; 2025 WindBack. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition">Twitter</a>
              <a href="#" className="hover:text-white transition">LinkedIn</a>
              <a href="#" className="hover:text-white transition">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
