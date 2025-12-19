import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Search, Mic, Monitor, Shield, Zap, ArrowRight, CheckCircle2, Globe, Lock } from "lucide-react";

export default function Landing() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
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

      {/* Compatibility Section */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Ecosystem</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">100% Compatible with <br />Rewind & Limitless.</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Seamlessly import your entire history. Our platform is fully compatible with original Rewind recordings, Limitless transcripts, and the Pendant wearable. 
                Don't lose a single moment of your digital life.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <p className="text-sm font-bold mb-1">Rewind</p>
                  <p className="text-xs text-gray-500">Full recording import</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <p className="text-sm font-bold mb-1">Limitless</p>
                  <p className="text-xs text-gray-500">Transcript & AI sync</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <p className="text-sm font-bold mb-1">Pendant</p>
                  <p className="text-xs text-gray-500">Hardware integration</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <p className="text-sm font-bold mb-1">Legacy Data</p>
                  <p className="text-xs text-gray-500">Zero-loss migration</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4">
                  <motion.img 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    src="/images/compat-1.png" 
                    className="w-full rounded-3xl shadow-2xl border border-gray-200"
                    alt="Compatibility 1"
                  />
                  <motion.img 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    src="/images/compat-2.png" 
                    className="w-full rounded-3xl shadow-2xl border border-gray-200 mt-8"
                    alt="Compatibility 2"
                  />
                  <motion.img 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    src="/images/compat-3.png" 
                    className="w-full rounded-3xl shadow-2xl border border-gray-200 -mt-8"
                    alt="Compatibility 3"
                  />
                  <motion.img 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    src="/images/compat-4.png" 
                    className="w-full rounded-3xl shadow-2xl border border-gray-200"
                    alt="Compatibility 4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-bold mb-6">Everything you need to be limitless.</h2>
            <p className="text-lg text-gray-600">We've built the world's most powerful personal AI, designed to work seamlessly across all your devices.</p>
          </div>
          
          <motion.div 
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            {[
              {
                icon: <Search className="w-8 h-8 text-primary" />,
                title: "Search Everything",
                desc: "Find anything you've seen on your screen, heard in a meeting, or said in a conversation."
              },
              {
                icon: <Mic className="w-8 h-8 text-primary" />,
                title: "Meeting Superpowers",
                desc: "Automatic transcripts, summaries, and action items for every meeting you attend."
              },
              {
                icon: <Shield className="w-8 h-8 text-primary" />,
                title: "Privacy First",
                desc: "Your data is encrypted and stored locally. We never sell your data or use it to train models."
              }
            ].map((feature, i) => (
              <motion.div key={i} variants={fadeIn} className="p-8 rounded-3xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
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
            <div className="lg:w-1/2 relative">
              <div className="aspect-square bg-primary/20 rounded-full blur-[120px] absolute inset-0" />
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
                <pre className="text-xs text-primary font-mono">
                  {`{
  "privacy_policy": "v2.0",
  "encryption": "AES-256-GCM",
  "data_ownership": "USER",
  "cloud_storage": "OPTIONAL",
  "ai_training": "DISABLED"
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Persona Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-bold mb-6">Built for every way you work.</h2>
            <p className="text-lg text-gray-600">Whether you're a Mac power user or a hardware pioneer, we've got you covered.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "The Mac Power User", desc: "Instant retrieval of every tab, Slack, and code snippet with Cmd+Shift+Space.", icon: "💻" },
              { title: "The Pendant Pioneer", desc: "Seamless sync with your Limitless hardware for in-person conversation capture.", icon: "🎙️" },
              { title: "The Executive Assistant", desc: "Automated meeting action items and summaries delivered to your inbox.", icon: "📅" },
              { title: "The Privacy Purist", desc: "Local-first processing with zero cloud training. Your data stays yours.", icon: "🔒" },
              { title: "The Sales Pro", desc: "Search client objections across months of calls to refine your winning pitch.", icon: "📈" },
              { title: "The Legacy Migrator", desc: "100% compatible with your existing Rewind and Limitless archives.", icon: "📦" }
            ].map((persona, i) => (
              <div key={i} className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{persona.icon}</div>
                <h3 className="text-lg font-bold mb-2">{persona.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{persona.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-16">Simple, transparent pricing.</h2>
          <div className="max-w-lg mx-auto bg-gray-50 rounded-3xl p-12 border border-gray-100 shadow-xl">
            <h3 className="text-2xl font-bold mb-2">Unlimited Plan</h3>
            <div className="flex items-baseline justify-center mb-6">
              <span className="text-5xl font-extrabold">$0</span>
              <span className="text-gray-500 ml-2">/ month</span>
            </div>
            <p className="text-gray-600 mb-8">Everything you need to be limitless, now free for everyone.</p>
            <ul className="text-left space-y-4 mb-10">
              {['Unlimited Screen Recording', 'Unlimited Audio Transcripts', 'Ask Rewind AI Assistant', 'Meeting Summaries', 'Cross-device Sync'].map((item, i) => (
                <li key={i} className="flex items-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/app">
              <Button className="w-full h-14 rounded-full text-lg font-bold">Get Started Now</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100 bg-white">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Zap className="w-5 h-5 text-primary" />
            <span className="font-bold">Limitless</span>
          </div>
          <p className="text-sm text-gray-500">© 2025 Limitless AI. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-primary">Twitter</a>
            <a href="#" className="hover:text-primary">LinkedIn</a>
            <a href="#" className="hover:text-primary">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
