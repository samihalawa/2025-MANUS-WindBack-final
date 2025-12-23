import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const subscribeMutation = trpc.newsletter.subscribe.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }

    try {
      await subscribeMutation.mutateAsync({
        email,
        source: "landing_page"
      });
      
      toast.success("Welcome to WindBack!", {
        description: "Check your email for exclusive updates and early access.",
      });
      
      setEmail("");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl border border-blue-200/20">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex items-center justify-center mb-4">
          <Mail className="w-6 h-6 text-blue-600 mr-2" />
          <h3 className="text-2xl font-bold text-gray-900">Stay Updated</h3>
        </div>
        
        <p className="text-gray-600 mb-8 text-lg">
          Get early access to new features, product updates, and exclusive tips for maximizing your memory with WindBack.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={subscribeMutation.isPending}
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
          <Button
            type="submit"
            disabled={subscribeMutation.isPending}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 whitespace-nowrap"
          >
            {subscribeMutation.isPending ? "Subscribing..." : "Subscribe"}
            {!subscribeMutation.isPending && <ArrowRight className="w-4 h-4" />}
          </Button>
        </form>
        
        <p className="text-sm text-gray-500 mt-4">
          No spam, just valuable insights. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
