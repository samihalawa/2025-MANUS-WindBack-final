import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, History, Cpu, Globe, Lock } from "lucide-react";
import { Link } from "wouter";

export default function LandingOriginal() {
  return (
    <div className="min-h-screen bg-white text-[#1d1d1f] selection:bg-[#5e43f3] selection:text-white">
      {/* Announcement Bar */}
      <div className="bg-[#5e43f3] text-white py-3 px-4 text-center text-sm font-bold tracking-tight">
        <span className="inline-flex items-center gap-2">
          <Zap className="w-4 h-4 fill-current" />
          100% Compatible with Rewind & Limitless. The official successor is here.
          <Link href="/app" className="underline underline-offset-4 hover:opacity-80 transition-opacity">
            Start Migration →
          </Link>
        </span>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass-nav border-b border-[#e8e8ed]">
        <div className="container h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#5e43f3] rounded-xl flex items-center justify-center">
                <History className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-tighter greycliff-body">Rewind</span>
            </Link>
            <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-[#6e6e73]">
              <a href="#features" className="hover:text-[#1d1d1f] transition-colors">Features</a>
              <a href="#compatibility" className="hover:text-[#1d1d1f] transition-colors">Compatibility</a>
              <a href="#pricing" className="hover:text-[#1d1d1f] transition-colors">Pricing</a>
              <div className="relative group">
                <button className="flex items-center gap-1 hover:text-[#1d1d1f] transition-colors">
                  The New Team
                  <motion.span animate={{ rotate: 0 }} className="text-[10px]">▼</motion.span>
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/app">
              <Button variant="ghost" className="font-bold text-[#6e6e73] hover:text-[#1d1d1f]">Sign In</Button>
            </Link>
            <Link href="/app">
              <button className="btn-primary px-6 py-2.5 text-sm">Start Free</button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-32 overflow-hidden">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f5f5f7] border border-[#e8e8ed] mb-8">
              <div className="w-2 h-2 rounded-full bg-[#5e43f3] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#86868b]">Zero Loss Migration</span>
            </div>
            <h1 className="quincy-heading text-6xl md:text-8xl mb-8">
              The successor that <br />
              <span className="text-[#5e43f3]">won't let you down</span>
            </h1>
            <p className="greycliff-body text-xl md:text-2xl text-[#6e6e73] max-w-3xl mx-auto mb-12 leading-relaxed">
              Meet the new team behind the ultimate AI memory. We’ve rebuilt the experience you love with 100% compatibility for your Rewind recordings and Pendant hardware.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <div className="relative w-full sm:w-auto">
                <input 
                  type="email" 
                  placeholder="Your email to start migration" 
                  className="w-full sm:w-80 h-14 px-6 rounded-full border-2 border-[#e8e8ed] focus:border-[#5e43f3] outline-none transition-all greycliff-body font-medium"
                />
                <button className="mt-4 sm:mt-0 sm:absolute sm:right-1.5 sm:top-1.5 btn-primary h-11 px-6 text-sm">
                  Get Started
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center gap-8 text-[#86868b]">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                <span className="text-sm font-bold">Mac, Windows, iOS</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5" />
                <span className="text-sm font-bold">Pendant Compatible</span>
              </div>
            </div>
          </motion.div>

          {/* App Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-24 relative"
          >
            <div className="relative mx-auto max-w-5xl rounded-3xl overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] border border-[#e8e8ed] bg-white">
              <img 
                src="/images/hero-vision.png" 
                alt="The New Rewind Interface" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-12 -left-12 hidden lg:block">
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="bg-white p-6 rounded-2xl shadow-2xl border border-[#e8e8ed] flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-[#5e43f3]/10 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="text-[#5e43f3] w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#86868b] uppercase tracking-wider">Status</div>
                  <div className="text-sm font-bold">100% Data Synced</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-32 bg-[#f5f5f7]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="quincy-heading text-5xl mb-8">A team committed to your long-term memory</h2>
              <p className="greycliff-body text-lg text-[#6e6e73] mb-8 leading-relaxed">
                We saw the gap left behind and decided to step up. Our mission is simple: provide a stable, forever-home for your digital and physical memory. No sunsets, no forced migrations—just pure, reliable AI.
              </p>
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <div className="text-4xl font-black text-[#5e43f3] greycliff-body">100%</div>
                  <div className="text-sm font-bold text-[#86868b] uppercase tracking-wider">Data Parity</div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-black text-[#5e43f3] greycliff-body">24/7</div>
                  <div className="text-sm font-bold text-[#86868b] uppercase tracking-wider">Support Team</div>
                </div>
              </div>
            </div>
            <div className="grid gap-6">
              {[
                { title: "Hardware First", desc: "Native support for Pendant and all legacy wearables.", icon: Cpu },
                { title: "Open Data", desc: "Your recordings are yours. Export anytime in standard formats.", icon: Globe },
                { title: "Privacy Vault", desc: "Military-grade local encryption that even we can't break.", icon: Lock }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ x: 10 }}
                  className="bg-white p-8 rounded-2xl border border-[#e8e8ed] flex gap-6 items-start"
                >
                  <div className="w-12 h-12 bg-[#5e43f3]/10 rounded-xl flex items-center justify-center shrink-0">
                    <item.icon className="text-[#5e43f3] w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-[#6e6e73] leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Compatibility Banner */}
      <section id="compatibility" className="py-32">
        <div className="container">
          <div className="bg-[#1d1d1f] rounded-[40px] p-12 md:p-24 text-white overflow-hidden relative">
            <div className="relative z-10 max-w-2xl">
              <h2 className="quincy-heading text-5xl md:text-6xl mb-8">Ready to migrate? It takes 30 seconds.</h2>
              <p className="greycliff-body text-xl text-[#86868b] mb-12">
                Simply point our app to your existing Rewind or Limitless data folder. We’ll index everything locally, preserving all your history and transcripts.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="px-6 py-3 rounded-full bg-white/10 border border-white/20 text-sm font-bold">Rewind Legacy</div>
                <div className="px-6 py-3 rounded-full bg-white/10 border border-white/20 text-sm font-bold">Limitless Cloud</div>
                <div className="px-6 py-3 rounded-full bg-white/10 border border-white/20 text-sm font-bold">Pendant Hardware</div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
              <img 
                src="/images/migration-banner.png" 
                alt="Migration Flow" 
                className="w-full h-full object-cover opacity-50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-32 bg-[#f5f5f7]">
        <div className="container text-center">
          <h2 className="quincy-heading text-5xl mb-16">Simple, transparent pricing</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-12 rounded-[32px] border border-[#e8e8ed] text-left">
              <div className="text-sm font-bold text-[#86868b] uppercase tracking-widest mb-4">Free Forever</div>
              <div className="text-5xl font-black mb-8 greycliff-body">$0</div>
              <ul className="space-y-4 mb-12">
                {["Unlimited local recording", "Basic search", "7-day history", "Standard meeting summaries"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#6e6e73]">
                    <CheckCircle2 className="w-5 h-5 text-[#5e43f3]" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/app">
                <Button variant="outline" className="w-full h-14 rounded-full border-2 font-bold">Get Started</Button>
              </Link>
            </div>
            <div className="bg-white p-12 rounded-[32px] border-2 border-[#5e43f3] text-left relative overflow-hidden">
              <div className="absolute top-6 right-6 bg-[#5e43f3] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Most Popular</div>
              <div className="text-sm font-bold text-[#5e43f3] uppercase tracking-widest mb-4">Pro Successor</div>
              <div className="text-5xl font-black mb-8 greycliff-body">$19<span className="text-lg text-[#86868b]">/mo</span></div>
              <ul className="space-y-4 mb-12">
                {["Unlimited everything", "Ask AI (GPT-5 Memory)", "Lifetime history", "Pendant Hardware Sync", "Priority Support"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#1d1d1f]">
                    <CheckCircle2 className="w-5 h-5 text-[#5e43f3]" />
                    <span className="font-bold">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/app">
                <button className="btn-primary w-full h-14">Go Pro</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 border-t border-[#e8e8ed]">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-24">
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-[#5e43f3] rounded-lg flex items-center justify-center">
                  <History className="text-white w-5 h-5" />
                </div>
                <span className="text-xl font-black tracking-tighter greycliff-body">Rewind</span>
              </Link>
              <p className="text-[#86868b] max-w-xs leading-relaxed">
                The official successor to Rewind and Limitless. Rebuilt for the long term.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6">Product</h4>
              <ul className="space-y-4 text-sm font-bold text-[#86868b]">
                <li><a href="#" className="hover:text-[#5e43f3]">Mac App</a></li>
                <li><a href="#" className="hover:text-[#5e43f3]">Windows App</a></li>
                <li><a href="#" className="hover:text-[#5e43f3]">Pendant Sync</a></li>
                <li><a href="#" className="hover:text-[#5e43f3]">Ask AI</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-sm font-bold text-[#86868b]">
                <li><a href="#" className="hover:text-[#5e43f3]">Our Vision</a></li>
                <li><a href="#" className="hover:text-[#5e43f3]">Security</a></li>
                <li><a href="#" className="hover:text-[#5e43f3]">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#5e43f3]">Terms</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Support</h4>
              <ul className="space-y-4 text-sm font-bold text-[#86868b]">
                <li><a href="#" className="hover:text-[#5e43f3]">Help Center</a></li>
                <li><a href="#" className="hover:text-[#5e43f3]">Migration Guide</a></li>
                <li><a href="#" className="hover:text-[#5e43f3]">Status</a></li>
                <li><a href="#" className="hover:text-[#5e43f3]">Community</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-12 border-t border-[#e8e8ed] text-xs font-bold text-[#86868b] uppercase tracking-widest">
            <div>© 2025 Rewind Successor Team. All rights reserved.</div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-[#1d1d1f]">Twitter</a>
              <a href="#" className="hover:text-[#1d1d1f]">LinkedIn</a>
              <a href="#" className="hover:text-[#1d1d1f]">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
