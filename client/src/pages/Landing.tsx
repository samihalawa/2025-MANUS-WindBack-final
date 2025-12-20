import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PricingCards } from "@/components/PricingCards";
import { 
  Search, 
  Mic, 
  ShieldCheck, 
  Zap, 
  Clock, 
  Smartphone, 
  Monitor, 
  Cpu,
  ArrowRight,
  CheckCircle2,
  History,
  Lock,
  Settings,
  Download,
  Terminal,
  Calendar,
  MessageSquare,
  Activity,
  Globe,
  Sparkles
} from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { usePageMeta } from "@/hooks/usePageMeta";
import { seoPages } from "@/lib/seoMeta";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { Testimonials } from "@/components/Testimonials";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export default function Landing() {
  usePageMeta(seoPages.home);
  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#1A1A1A] font-sans selection:bg-blue-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-gray-100/50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
              <History className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">WindBack</span>
          </div>
          <div className="hidden md:flex items-center gap-10 text-sm font-semibold text-gray-500">
            <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#technical" className="hover:text-blue-600 transition-colors">Technical</a>
            <a href="#compatibility" className="hover:text-blue-600 transition-colors">Ecosystem</a>
            <a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a>
          </div>
          <Link href="/app">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-7 font-bold shadow-md shadow-blue-100 transition-all hover:scale-105">
              Open App
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-40 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-200/30 blur-[120px] rounded-full" />
          <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] bg-purple-200/20 blur-[100px] rounded-full" />
        </div>
        
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <motion.div {...fadeIn}>
              <Badge variant="outline" className="mb-6 border-blue-100 text-blue-600 bg-blue-50/50 px-5 py-1.5 rounded-full font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 mr-2 fill-blue-600" /> THE NEXT GENERATION OF PERSONAL AI
              </Badge>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.05] text-gray-900">
                Go beyond your <br />
                <span className="text-blue-600">limitations.</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
                The AI-powered lifelog app that remembers everything you see, say, and hear. 
                Designed for those who never want to forget a single moment. Unlimited cloud sync, advanced AI search, and cross-device access.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                <Link href="/app">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-10 h-16 text-lg font-bold shadow-xl shadow-blue-200 transition-all hover:scale-105">
                    Start Your Lifelog <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="rounded-full px-10 h-16 text-lg font-bold border-gray-200 bg-white/50 backdrop-blur-sm hover:bg-gray-50 transition-all">
                  Watch the Vision
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Main Product Showcase */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
            className="relative max-w-6xl mx-auto"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.12)] border border-white/40 bg-white/20 backdrop-blur-sm p-3">
              <img 
                src="/images/hero-vision.png" 
                alt="Visionary AI Concept" 
                className="w-full rounded-[2rem] shadow-inner"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
            </div>
            
            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-12 -right-12 w-48 h-48 bg-white rounded-3xl shadow-2xl border border-gray-100 p-4 hidden lg:block"
            >
              <div className="w-full h-full rounded-2xl bg-blue-50 flex items-center justify-center">
                <Activity className="w-12 h-12 text-blue-600" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-white relative">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Augmented Intelligence.</h2>
            <p className="text-gray-500 text-xl font-medium">Experience a seamless extension of your own memory.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-24 items-center mb-40">
            <motion.div {...fadeIn} className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 font-bold text-sm border border-blue-100">
                <Smartphone className="w-4 h-4" /> THE LIFELOG
              </div>
              <h3 className="text-4xl font-bold tracking-tight leading-tight">Your day, <br />perfectly captured.</h3>
              <p className="text-xl text-gray-500 leading-relaxed font-medium">
                A sophisticated vertical feed of your life. Every conversation, every briefing, 
                and every insight is transcribed and organized with surgical precision.
              </p>
              <div className="space-y-4 pt-4">
                {[
                  "Automatic meeting detection & labeling",
                  "High-fidelity speaker transcription",
                  "Instant action item extraction"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-gray-700 font-semibold">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="relative">
              <div className="rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100 bg-white p-2">
                <img src="/images/ui-lifelog-mockup.png" alt="Lifelog UI Mockup" className="w-full rounded-[1.5rem]" />
              </div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white rounded-3xl shadow-xl border border-gray-50 p-6 hidden lg:flex flex-col justify-between">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Mic className="text-purple-600 w-6 h-6" />
                </div>
                <span className="text-sm font-bold text-gray-400">Recording...</span>
              </div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-24 items-center">
            <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="order-2 md:order-1 relative">
              <div className="rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100 bg-white p-2">
                <img src="/images/ui-ai-chat-mockup.png" alt="AI Chat Interface" className="w-full rounded-[1.5rem]" />
              </div>
            </motion.div>
            <motion.div {...fadeIn} className="order-1 md:order-2 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 text-purple-600 font-bold text-sm border border-purple-100">
                <MessageSquare className="w-4 h-4" /> ASK AI (GPT-5)
              </div>
              <h3 className="text-4xl font-bold tracking-tight leading-tight">Query your <br />past, instantly.</h3>
              <p className="text-xl text-gray-500 leading-relaxed font-medium">
                Ask anything you've seen, said, or heard. Our AI synthesizes your entire history 
                to provide structured answers with verifiable source citations.
              </p>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-white border border-purple-100 shadow-sm">
                <p className="italic text-purple-900 font-semibold text-lg leading-relaxed">
                  "What were the three main concerns raised during the product sync yesterday?"
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hardware Section */}
      <section id="technical" className="py-32 bg-[#F9FAFB] border-y border-gray-100">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-24 items-center">
            <motion.div {...fadeIn}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 text-gray-600 font-bold text-sm border border-gray-200 mb-8">
                <Cpu className="w-4 h-4" /> THE PENDANT
              </div>
              <h2 className="text-5xl font-bold mb-8 tracking-tight">Hardware that <br />feels like magic.</h2>
              <p className="text-xl text-gray-500 mb-10 leading-relaxed font-medium">
                A minimalist wearable designed to be forgotten. High-fidelity audio capture 
                with real-time LED feedback, syncing seamlessly with your digital life.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <h4 className="font-bold text-gray-900">24h Battery</h4>
                  <p className="text-sm text-gray-500">All-day capture without compromise.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-gray-900">Studio Mic</h4>
                  <p className="text-sm text-gray-500">Crystal clear audio in any environment.</p>
                </div>
              </div>
            </motion.div>
            <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="relative">
              <div className="rounded-[3rem] overflow-hidden shadow-3xl border border-white bg-white p-4">
                <img src="/images/pendant-hardware-mockup.png" alt="Pendant Hardware" className="w-full rounded-[2.5rem]" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Compatibility Banner */}
      <section id="compatibility" className="py-24 bg-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        </div>
        <div className="container relative z-10 text-center max-w-4xl mx-auto">
          <Badge className="bg-white/20 text-white border-none mb-8 px-6 py-2 text-sm font-bold">ZERO FRICTION MIGRATION</Badge>
          <h2 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight leading-tight">
            100% Compatible with your <br />
            existing ecosystem.
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed font-medium">
            Don't let your data or hardware go to waste. We support every legacy Rewind recording 
            and sync perfectly with your Limitless Pendant from day one.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { icon: History, label: "Rewind Import" },
              { icon: Cpu, label: "Pendant Sync" },
              { icon: ShieldCheck, label: "Encrypted Data" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 bg-white/10 px-8 py-4 rounded-2xl backdrop-blur-md border border-white/10">
                <item.icon className="w-7 h-7" />
                <span className="text-lg font-bold">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 bg-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Simple, Honest Pricing.</h2>
            <p className="text-gray-500 text-xl font-medium">Choose the plan that powers your memory.</p>
          </div>

          <PricingCards />
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Newsletter Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-2xl mx-auto">
          <NewsletterSignup />
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
              <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
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
