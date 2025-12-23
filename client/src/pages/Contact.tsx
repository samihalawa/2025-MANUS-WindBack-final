import { useState } from "react";
import { Link } from "wouter";
import { History, ArrowLeft, Mail, MessageSquare, Send } from "lucide-react";
import { usePageMeta } from "@/hooks/usePageMeta";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

export default function Contact() {
  usePageMeta({
    title: "Contact Us - WindBack",
    description: "Get in touch with the WindBack team. We're here to help with questions, support, and feedback.",
    keywords: ["contact", "support", "help", "customer service"]
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const submitMutation = trpc.contact.submit.useMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await submitMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        message: formData.message
      });

      toast.success("Message sent successfully!", {
        description: "We'll get back to you within 24 hours.",
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    }
  };

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
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600">
            Have questions? We'd love to hear from you. Our team is here to help.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">For general inquiries and support</p>
              <a href="mailto:support@windback.ai" className="text-blue-600 font-semibold hover:text-blue-700">
                support@windback.ai
              </a>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4">Chat with our team in real-time</p>
              <button 
                onClick={() => toast.info("Live chat coming soon!")}
                className="text-purple-600 font-semibold hover:text-purple-700"
              >
                Start Chat
              </button>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sales Team</h3>
              <p className="text-gray-600 mb-4">Enterprise and custom plans</p>
              <a href="mailto:sales@windback.ai" className="text-green-600 font-semibold hover:text-green-700">
                sales@windback.ai
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-8 md:p-12 border border-gray-100 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Send us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitMutation.isPending}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
                >
                  {submitMutation.isPending ? "Sending..." : "Send Message"}
                  {!submitMutation.isPending && <Send className="w-5 h-5" />}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Link */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Looking for Answers?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Check out our frequently asked questions for quick answers to common inquiries.
          </p>
          <Link href="/pricing">
            <Button className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-3 rounded-full font-bold border-2 border-gray-200">
              View FAQ
            </Button>
          </Link>
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
              <Link href="/contact" className="hover:text-blue-600 transition-colors">
                Contact
              </Link>
            </div>
            <p className="text-gray-400 text-sm font-medium">© 2025 WindBack. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
