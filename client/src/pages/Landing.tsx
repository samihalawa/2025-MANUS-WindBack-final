import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  Users,
  History,
  Lock,
  Settings,
  Download,
  Terminal,
  Calendar,
  MessageSquare,
  Activity,
  Globe
} from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] font-sans selection:bg-blue-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <History className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">Rewind <span className="text-blue-600">Limitless</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#technical" className="hover:text-blue-600 transition-colors">Technical</a>
            <a href="#compatibility" className="hover:text-blue-600 transition-colors">Ecosystem</a>
            <a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a>
          </div>
          <Link href="/app">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6">
              Open App
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 overflow-hidden">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.div {...fadeIn}>
              <Badge variant="outline" className="mb-4 border-blue-200 text-blue-700 bg-blue-50 px-4 py-1 rounded-full">
                The Next Generation of Personal AI
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                Go beyond your mind's <br />
                <span className="text-blue-600">limitations.</span>
              </h1>
              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                The team that won't let you down. We've built the ultimate successor to Rewind and Limitless, 
                preserving every moment you've seen, said, or heard with 100% hardware compatibility.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/app">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 h-14 text-lg shadow-lg shadow-blue-200">
                    Start Your Lifelog <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg border-gray-200">
                  Watch the Vision
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Main Product Showcase */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative max-w-6xl mx-auto"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white p-2">
              <img 
                src="/images/references/ui-hero-showcase.jpg" 
                alt="Limitless for Mac Dashboard" 
                className="w-full rounded-xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Real Product Tour Section */}
      <section id="features" className="py-24 bg-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">Real Product. Real Insights.</h2>
            <p className="text-gray-600 text-lg">Experience the actual UI that powers your second brain.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
            <motion.div {...fadeIn} className="space-y-6">
              <Badge className="bg-blue-50 text-blue-600 border-blue-100">The Lifelog</Badge>
              <h3 className="text-3xl font-bold tracking-tight">Your day, summarized.</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                A clean, vertical feed of your day. From "Mission briefings" to casual coffee chats, 
                everything is transcribed and summarized in real-time.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  <span>Automatic meeting detection & recording</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  <span>Speaker-labeled transcripts</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  <span>Action items extracted instantly</span>
                </li>
              </ul>
            </motion.div>
            <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
              <img src="/images/references/ui-daily-narrative.png" alt="Daily Narrative UI" className="w-full" />
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
            <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="order-2 md:order-1 rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
              <img src="/images/references/ui-ask-ai-chat.png" alt="Ask AI Interface" className="w-full" />
            </motion.div>
            <motion.div {...fadeIn} className="order-1 md:order-2 space-y-6">
              <Badge className="bg-purple-50 text-purple-600 border-purple-100">Ask AI (GPT-5)</Badge>
              <h3 className="text-3xl font-bold tracking-tight">Query your life.</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Ask anything you've seen, said, or heard. Our AI synthesizes your captured moments 
                to provide structured, actionable insights with direct source citations.
              </p>
              <div className="p-4 rounded-xl bg-purple-50 border border-purple-100 italic text-purple-900 text-sm">
                "What did I promise to send to the team during the sync over coffee?"
              </div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn} className="space-y-6">
              <Badge className="bg-green-50 text-green-600 border-green-100">Timeline Scrubber</Badge>
              <h3 className="text-3xl font-bold tracking-tight">Go back in time.</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Scrub through your day with a high-fidelity timeline. Click any moment to see 
                the exact screenshot and context of what was happening.
              </p>
              <div className="flex gap-4">
                <div className="flex-1 p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <img src="/images/references/ui-timeline-scrub.png" alt="Timeline Scrubber" className="w-full rounded border border-gray-200" />
                </div>
              </div>
            </motion.div>
            <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
              <img src="/images/references/ui-search-results.png" alt="Search Results UI" className="w-full" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technical Deep Dive Section */}
      <section id="technical" className="py-24 bg-[#F8F9FA] border-y border-gray-100">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">Technical Deep Dive</h2>
            <p className="text-gray-600 text-lg">Authentic UI and hardware integration details for power users.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Setup & Permissions */}
            <motion.div {...fadeIn} className="space-y-4">
              <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm aspect-video bg-white">
                <img src="/images/technical/macos-permissions.png" alt="macOS Permissions" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Settings className="w-5 h-5 text-blue-600" /> System Integration
              </h3>
              <p className="text-sm text-gray-600">
                Deep macOS integration with native permission prompts for microphone and system audio, ensuring secure and reliable capture.
              </p>
            </motion.div>

            {/* Pendant Hardware */}
            <motion.div {...fadeIn} transition={{ delay: 0.1 }} className="space-y-4">
              <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm aspect-video bg-white">
                <img src="/images/references/ui-hardware-pendant.png" alt="Pendant Hardware" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Cpu className="w-5 h-5 text-blue-600" /> Hardware Status
              </h3>
              <p className="text-sm text-gray-600">
                Real-time hardware feedback via Pendant LED indicators. Know exactly when you're recording, syncing, or fully charged.
              </p>
            </motion.div>

            {/* Installation Flow */}
            <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="space-y-4">
              <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm aspect-video bg-white">
                <img src="/images/technical/mac-installer.png" alt="Mac Installer" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Download className="w-5 h-5 text-blue-600" /> Native Installers
              </h3>
              <p className="text-sm text-gray-600">
                Familiar drag-and-drop installation for Mac and streamlined installers for Windows, getting you up and running in seconds.
              </p>
            </motion.div>
          </div>

          <div className="mt-16 grid md:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeIn} className="space-y-6">
              <h3 className="text-3xl font-bold tracking-tight">Advanced Meeting Control</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Copy meeting IDs instantly and access terminal-level logs for troubleshooting. Our platform is built for professionals who need absolute reliability.
              </p>
              <div className="flex gap-4">
                <div className="flex-1 p-4 rounded-xl bg-white border border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Terminal className="w-4 h-4 text-gray-400" />
                    <span className="text-xs font-bold text-gray-400 uppercase">Terminal Logs</span>
                  </div>
                  <img src="/images/technical/terminal-logs.png" alt="Terminal Logs" className="w-full rounded border border-gray-200" />
                </div>
                <div className="flex-1 p-4 rounded-xl bg-white border border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-xs font-bold text-gray-400 uppercase">Calendar Sync</span>
                  </div>
                  <img src="/images/technical/calendar-integration.png" alt="Calendar Integration" className="w-full rounded border border-gray-200" />
                </div>
              </div>
            </motion.div>
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
              <img src="/images/references/ui-meeting-summary.png" alt="Meeting Summary UI" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* 100% Compatibility Banner */}
      <section id="compatibility" className="py-20 bg-blue-600 text-white overflow-hidden relative">
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <Badge className="bg-white/20 text-white border-none mb-6 px-4 py-1">Zero Friction Migration</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              100% Compatible with your <br />
              existing Pendant & Recordings.
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Don't let your hardware become a paperweight. Our platform syncs perfectly with your 
              Limitless Pendant and imports every second of your legacy Rewind recordings.
            </p>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-xl backdrop-blur-sm">
                <Cpu className="w-6 h-6" />
                <span className="font-bold">Pendant Ready</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-xl backdrop-blur-sm">
                <History className="w-6 h-6" />
                <span className="font-bold">Rewind Import</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-xl backdrop-blur-sm">
                <ShieldCheck className="w-6 h-6" />
                <span className="font-bold">Encrypted Sync</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">Simple, Transparent Pricing</h2>
            <p className="text-gray-600 text-lg">Choose the plan that fits your memory needs.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-8 border-gray-100 shadow-lg">
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">Free</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-gray-500">/mo</span>
                </div>
                <p className="text-gray-500 mt-4">Perfect for getting started.</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  <span>10 hours of AI processing / mo</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  <span>Unlimited local recording</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  <span>Basic meeting summaries</span>
                </li>
              </ul>
              <Link href="/app">
                <Button className="w-full rounded-full h-12 border-gray-200" variant="outline">Get Started</Button>
              </Link>
            </Card>

            <Card className="p-8 border-blue-100 shadow-xl bg-blue-50 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">Most Popular</div>
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">Pro</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">$19</span>
                  <span className="text-gray-500">/mo</span>
                </div>
                <p className="text-gray-500 mt-4">For power users who need it all.</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  <span>Unlimited AI processing</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  <span>Advanced GPT-5 Ask AI</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  <span>Pendant hardware sync</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  <span>Priority support</span>
                </li>
              </ul>
              <Link href="/app">
                <Button className="w-full rounded-full h-12 bg-blue-600 hover:bg-blue-700 text-white">Go Pro</Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#F8F9FA]">
        <div className="container text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Ready to augment <br />your memory?</h2>
            <p className="text-xl text-gray-600 mb-12">
              Join the thousands of power users who have found their forever home for personal AI.
            </p>
            <Link href="/app">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-12 h-16 text-xl shadow-xl shadow-blue-200">
                Get Started for Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100 bg-white">
        <div className="container flex flex-col md:row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <History className="text-blue-600 w-6 h-6" />
            <span className="text-lg font-bold tracking-tight">Rewind Limitless</span>
          </div>
          <p className="text-gray-500 text-sm">© 2025 The New Team. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
