import { motion } from "framer-motion";
import { Search, Monitor, MessageSquare, ChevronRight, Download, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";

export default function LandingOriginal() {
  const handleComingSoon = () => {
    toast.info("Feature coming soon", {
      description: "We're working hard to bring this to you!",
    });
  };

  const handleGetRewind = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Welcome to the future!", {
      description: "You've been added to the priority access list.",
    });
  };
  return (
    <div className="min-h-screen warm-gradient-bg selection:bg-[#8b5cf6] selection:text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-[#e8e8ed]">
        <div className="container h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#8b5cf6] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">✦</span>
              </div>
              <span className="quincy-heading text-xl font-bold tracking-tight">WindBack</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-sm font-bold text-[#86868b] hover:text-[#1d1d1f] transition-colors">Features</a>
              <a href="#compatibility" className="text-sm font-bold text-[#86868b] hover:text-[#1d1d1f] transition-colors">Compatibility</a>
              <Link href="/pricing">
                <a className="text-sm font-bold text-[#86868b] hover:text-[#1d1d1f] transition-colors">Pricing</a>
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleComingSoon}
              className="text-sm font-bold text-[#1d1d1f] hover:opacity-70 transition-opacity"
            >
              Sign In
            </button>
            <Link href="/app">
              <button className="bg-[#1d1d1f] text-white text-sm font-bold px-5 py-2 rounded-full hover:bg-[#2c2c2e] transition-colors">
                Open App
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Top Announcement */}
          <div className="pt-32 flex justify-center">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleComingSoon}
          className="bg-white/90 backdrop-blur-xl border border-[#e8e8ed] rounded-2xl px-6 py-3 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
        >
        </motion.div>
      </div>

      {/* Hero Content */}
      <section className="pt-24 pb-40">
        <div className="container flex flex-col items-center text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="quincy-heading text-5xl md:text-7xl lg:text-8xl mb-10 max-w-4xl"
          >
            Your AI assistant <br />
            that has all the <br />
            context
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="greycliff-body text-lg md:text-xl text-[#6e6e73] max-w-2xl mb-14 leading-relaxed"
          >
            WindBack is a personalized AI powered by everything <br className="hidden md:block" />
            you've seen, said, or heard. Your colleagues will <br className="hidden md:block" />
            wonder how you do it all.
          </motion.p>

          {/* Pill Input */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-md mx-auto mb-8"
          >
            <form onSubmit={handleGetRewind} className="pill-input-container flex items-center">
              <input 
                type="email" 
                required
                placeholder="Enter your email" 
                className="flex-1 bg-transparent px-6 py-3 outline-none greycliff-body font-medium text-lg"
              />
              <button type="submit" className="btn-rewind whitespace-nowrap">
                Get Rewind
              </button>
            </form>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            onClick={handleComingSoon}
            className="flex items-center justify-center gap-2 text-[#86868b] text-sm font-bold mb-24 cursor-pointer hover:text-[#1d1d1f] transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download for Mac and iOS today.</span>
          </motion.div>

          {/* Device Mockup Section */}
          <div className="relative max-w-6xl mx-auto">
            {/* MacBook Mockup */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative z-10 mx-auto w-[90%] md:w-full"
            >
              <div className="bg-[#1d1d1f] rounded-[2rem] p-2 shadow-2xl border-4 border-[#2c2c2e]">
                <div className="bg-white rounded-[1.5rem] overflow-hidden aspect-[16/10] relative">
                  <img 
                    src="/images/hero-vision.png" 
                    alt="Rewind Desktop Interface" 
                    className="w-full h-full object-cover"
                  />
                  {/* Mock UI Elements */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-full h-full bg-black/5" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* iPhone Mockup */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute -right-4 md:-right-12 bottom-0 w-[30%] md:w-[25%] z-20"
            >
              <div className="bg-[#1d1d1f] rounded-[3rem] p-2 shadow-2xl border-4 border-[#2c2c2e] aspect-[9/19.5] relative overflow-hidden">
                <div className="bg-white h-full w-full rounded-[2.5rem] overflow-hidden">
                  <img 
                    src="/images/ui-ai-chat-mockup.png" 
                    alt="Rewind Mobile Interface" 
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Product Hunt Badge */}
                <div className="absolute top-8 -right-2 bg-white rounded-xl p-3 shadow-xl border border-[#e8e8ed] flex items-center gap-3 scale-75 md:scale-100">
                  <div className="w-8 h-8 bg-[#da552f] rounded-full flex items-center justify-center text-white font-bold">P</div>
                  <div className="text-left">
                    <div className="text-[10px] font-bold text-[#da552f] uppercase tracking-wider">Product Hunt</div>
                    <div className="text-xs font-bold text-[#1d1d1f]">#1 Product of the Week</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bottom Navigation Bar */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 z-30">
              <div className="bottom-nav-pill flex items-center gap-8">
                <button className="flex items-center gap-2 text-[#1d1d1f] font-bold text-sm hover:opacity-70 transition-opacity">
                  <Monitor className="w-4 h-4" />
                  Browse
                </button>
                <button className="flex items-center gap-2 text-[#86868b] font-bold text-sm hover:text-[#1d1d1f] transition-colors">
                  <Search className="w-4 h-4" />
                  Search
                </button>
                <button className="flex items-center gap-2 text-[#86868b] font-bold text-sm hover:text-[#1d1d1f] transition-colors">
                  <MessageSquare className="w-4 h-4" />
                  Ask
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Successor Messaging Section */}
      <section className="py-32 bg-white">
        <div className="container px-4 text-center">
          <h2 className="quincy-heading text-4xl md:text-6xl mb-8">The successor that won't let you down</h2>
          <p className="greycliff-body text-lg md:text-xl text-[#6e6e73] max-w-3xl mx-auto mb-16">
            We've rebuilt the experience you love with 100% compatibility for your Rewind recordings and Pendant hardware. Meet the new team committed to your long-term memory.
          </p>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="p-8 rounded-3xl bg-[#f5f5f7] border border-[#e8e8ed]">
              <div className="w-12 h-12 bg-[#8b5cf6]/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Zap className="text-[#8b5cf6] w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">100% Compatible</h3>
              <p className="text-[#6e6e73]">Import your recordings, transcripts, and Pendant data in one click.</p>
            </div>
            <div className="p-8 rounded-3xl bg-[#f5f5f7] border border-[#e8e8ed]">
              <div className="w-12 h-12 bg-[#8b5cf6]/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="text-[#8b5cf6] w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">Privacy First</h3>
              <p className="text-[#6e6e73]">Military-grade local encryption that even we can't break.</p>
            </div>
            <div className="p-8 rounded-3xl bg-[#f5f5f7] border border-[#e8e8ed]">
              <div className="w-12 h-12 bg-[#8b5cf6]/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <History className="text-[#8b5cf6] w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">Forever Home</h3>
              <p className="text-[#6e6e73]">No sunsets, no forced migrations—just pure, reliable AI memory.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Zap(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function History(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="m12 7 0 5 3 3" />
    </svg>
  );
}
