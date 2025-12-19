import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Search, Mic, Monitor, Shield, Zap, ArrowRight, CheckCircle2, Globe, Lock, Sparkles } from "lucide-react";

export default function Landing() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827] font-sans selection:bg-primary/20">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">Limitless</span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#privacy" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
            <Link href="/app">
              <Button variant="default" className="rounded-full px-6">Sign In</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img 
            src="/images/hero-abstract.png" 
            className="w-full h-full object-cover opacity-40"
            alt="Background"
          />
        </div>
        <div className="container mx-auto px-6 text-center">
          <motion.div {...fadeIn}>
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
              The Future of Memory
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Go beyond your <br />
              <span className="text-primary">mind's limitations.</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              Personalized AI powered by what you’ve seen, said, and heard. 
              Search anything, automate meetings, and never forget a detail again.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/app">
                <Button size="lg" className="h-14 px-8 rounded-full text-lg font-bold shadow-xl shadow-primary/20 group">
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="h-14 px-8 rounded-full text-lg font-bold bg-white">
                Watch Demo
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-20 relative max-w-5xl mx-auto"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-white p-2">
              <img 
                src="/images/app-preview-mockup.png" 
                className="w-full rounded-2xl"
                alt="App Preview"
              />
            </div>
            {/* Floating Badges */}
            <div className="absolute -top-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 hidden lg:block">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-gray-400 uppercase">Meeting Detected</p>
                  <p className="text-sm font-bold">Project Alpha Sync</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* New Team Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn}>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-bold tracking-wider uppercase mb-6">
                The New Team
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                The team that <br />
                <span className="text-blue-600">won't let you down.</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                After the acquisition of Rewind, we saw a community left behind. We are the new team dedicated to the original vision of personal superintelligence. We're not just building a successor; we're building a forever home for your memories.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Independent & Sustainable</h4>
                    <p className="text-sm text-slate-500">No big-tech acquisitions. We are funded by users, for users.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Continuous Innovation</h4>
                    <p className="text-sm text-slate-500">Weekly updates and a public roadmap driven by community feedback.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img src="/images/new-team-vision.png" alt="The New Team Vision" className="rounded-3xl shadow-2xl border border-slate-100" />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 max-w-xs">
                <p className="text-sm italic text-slate-600">"We're here to stay. Your data, your privacy, and your trust are our only priorities."</p>
                <p className="text-xs font-bold text-slate-900 mt-2">— The Founding Team</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Compatibility Banner Section */}
      <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="/images/migration-banner.png" alt="Migration Background" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">100% Compatible. <br />Zero Compromise.</h2>
            <p className="text-xl text-slate-400">Whether you're coming from Rewind or Limitless, your data is safe with us. We support all existing hardware and recording formats.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6">
                <Monitor className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Rewind Recordings</h3>
              <p className="text-slate-400 text-sm">Import your entire .rewind archive with a single click. All OCR data and timestamps preserved.</p>
            </div>
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6">
                <Mic className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Limitless Transcripts</h3>
              <p className="text-slate-400 text-sm">Full sync with your Limitless cloud or local backups. Your meeting history is ready to search.</p>
            </div>
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Pendant Hardware</h3>
              <p className="text-slate-400 text-sm">Direct Bluetooth integration with your existing Pendant. No new hardware required.</p>
            </div>
          </div>

          <div className="mt-20 p-1 rounded-[2.5rem] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            <div className="bg-slate-950 rounded-[2.4rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <img src="/images/pendant-compatibility.png" alt="Pendant Compatibility" className="w-24 h-24 rounded-2xl object-cover border border-white/10" />
                <div>
                  <h4 className="text-2xl font-bold">Ready to migrate?</h4>
                  <p className="text-slate-400">Join 50,000+ users who have already made the switch.</p>
                </div>
              </div>
              <Link href="/app">
                <Button size="lg" className="bg-white text-slate-950 hover:bg-slate-200 px-8 py-6 text-lg font-bold rounded-2xl">
                  Start Zero-Loss Migration
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Real Product Tour Section */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">The Real Product. <br />No Placeholders.</h2>
            <p className="text-lg text-gray-600">Experience the actual interface used by thousands of high-performers to capture and recall every moment.</p>
          </div>
          
          <div className="space-y-32">
            {/* Feature 1: Lifelog */}
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <h3 className="text-3xl font-bold mb-6">The Lifelog: Your Digital Memory</h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  A continuous, searchable feed of your life. From "Mission briefings over coffee" to deep technical discussions, every word is transcribed, summarized, and time-stamped with pixel-perfect accuracy.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="font-medium">Speaker-labeled transcripts</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="font-medium">Instant meeting summaries</span>
                  </li>
                </ul>
              </div>
              <div className="lg:w-1/2">
                <img src="/images/ui-lifelog.png" alt="Lifelog UI" className="rounded-[2.5rem] shadow-2xl border-8 border-slate-900 max-w-sm mx-auto" />
              </div>
            </div>

            {/* Feature 2: Ask AI */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
              <div className="lg:w-1/2">
                <h3 className="text-3xl font-bold mb-6">Ask AI: Insights from Your Life</h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Go beyond simple search. Ask your personalized AI for insights about your work and your life. "How can I be more present for my kids?" or "What were the key objections in the Alpha project?" — get answers based on reality.
                </p>
                <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
                  <p className="text-sm italic text-primary">"To be more present for your children, take a moment to reflect on your recent interactions with them..."</p>
                </div>
              </div>
              <div className="lg:w-1/2">
                <img src="/images/ui-ask-ai.png" alt="Ask AI UI" className="rounded-[2.5rem] shadow-2xl border-8 border-slate-900 max-w-sm mx-auto" />
              </div>
            </div>

            {/* Feature 3: Daily Insights */}
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <h3 className="text-3xl font-bold mb-6">Daily Narrative & Highlights</h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Receive a fascinating blend of personal logistics and deep dives into your daily activities. Our AI captures the "moments that matter" and presents them in a beautiful, readable narrative every morning.
                </p>
              </div>
              <div className="lg:w-1/2">
                <img src="/images/ui-insights.png" alt="Daily Insights UI" className="rounded-[2.5rem] shadow-2xl border-8 border-slate-900 max-w-sm mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section id="privacy" className="py-24 bg-[#111827] text-white overflow-hidden relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Security</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">Your data is yours. <br />Period.</h2>
              <div className="space-y-6">
                {[
                  { icon: <Lock className="w-5 h-5" />, text: "End-to-end encryption for all synced data" },
                  { icon: <Globe className="w-5 h-5" />, text: "Local-first processing for maximum speed and privacy" },
                  { icon: <Shield className="w-5 h-5" />, text: "SOC2 Type II compliant infrastructure" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <p className="text-lg text-gray-300">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <img src="/images/ui-security.png" alt="Security UI" className="rounded-[2.5rem] shadow-2xl border-8 border-slate-800 max-w-sm mx-auto" />
                <div className="absolute -bottom-6 -left-6 p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 hidden md:block">
                  <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Compliance</p>
                  <p className="text-sm font-bold">HIPAA Compliant</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-bold mb-6">Simple, transparent pricing.</h2>
          </div>
          <div className="max-w-lg mx-auto">
            <div className="p-12 rounded-[3rem] bg-gray-50 border border-gray-100 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary text-white px-6 py-2 rounded-bl-3xl text-xs font-bold uppercase tracking-widest">
                Limited Time
              </div>
              <h3 className="text-2xl font-bold mb-4">Unlimited Plan</h3>
              <div className="flex items-center justify-center mb-8">
                <span className="text-5xl font-extrabold">$0</span>
                <span className="text-gray-400 ml-2">/ month</span>
              </div>
              <p className="text-gray-600 mb-10">Everything you need to be limitless, now free for everyone.</p>
              <ul className="text-left space-y-4 mb-10">
                {[
                  "Unlimited Screen Recording",
                  "Unlimited Audio Transcripts",
                  "Ask Rewind AI Assistant",
                  "Meeting Summaries",
                  "Cross-device Sync"
                ].map((item, i) => (
                  <li key={i} className="flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/app">
                <Button size="lg" className="w-full h-14 rounded-full text-lg font-bold">Get Started Now</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">Limitless</span>
            </div>
            <div className="flex space-x-8 text-sm font-medium text-gray-500">
              <a href="#" className="hover:text-primary transition-colors">Twitter</a>
              <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            </div>
            <p className="text-sm text-gray-400">© 2025 Limitless AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
