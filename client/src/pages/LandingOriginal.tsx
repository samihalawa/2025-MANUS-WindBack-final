import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function LandingOriginal() {
  return (
    <div className="min-h-screen bg-white text-[#1d1d1f] font-sans selection:bg-[#5e43f3] selection:text-white antialiased">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 h-20">
        <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link href="/">
              <div className="group flex items-center cursor-pointer">
                <img 
                  src="/original-assets/64b9a8b87d7ee6f947910e82_rewind-icon.svg" 
                  alt="Rewind Successor" 
                  className="h-8 transition-transform duration-300 group-hover:-translate-x-1"
                />
                <img 
                  src="/original-assets/64c088267e8881a7472517a4_rewind-logotype.svg" 
                  alt="Rewind Successor" 
                  className="h-5 ml-2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                />
              </div>
            </Link>
            <div className="hidden md:flex items-center gap-8 text-[15px] font-medium text-[#6e6e73]">
              <a href="#features" className="hover:text-[#5e43f3] transition-colors">Features</a>
              <a href="#compatibility" className="hover:text-[#5e43f3] transition-colors">Compatibility</a>
              <a href="#pricing" className="hover:text-[#5e43f3] transition-colors">Pricing</a>
              <div className="flex items-center gap-1 cursor-pointer hover:text-[#5e43f3] transition-colors">
                The New Team
                <img src="/original-assets/64c0548c24cef38c31fcb2c8_ic-down-chevron.svg" className="w-3 h-3 opacity-50" alt="" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/app">
              <Button className="bg-[#5e43f3] hover:bg-[#4b35c3] text-white rounded-full px-7 h-[46px] text-[15px] font-bold transition-all shadow-[0_8px_20px_-4px_rgba(94,67,243,0.3)]">
                Start Free
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Announcement Bar: The Successor Promise */}
      <div className="pt-32 pb-6 px-6">
        <div className="max-w-[820px] mx-auto">
          <div className="group flex items-center justify-between p-4 bg-[#f5f5f7] rounded-[22px] border border-[#e8e8ed] transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 bg-white rounded-[14px] flex items-center justify-center shadow-sm border border-[#e8e8ed]">
                <img src="/original-assets/64bdc13eb6b02693f01c190b_ic-limitless.svg" alt="Compatibility" className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-[17px] text-[#1d1d1f]">100% Compatible with Rewind & Limitless</div>
                <div className="text-[14px] text-[#86868b]">Import your recordings, transcripts, and Pendant data in one click.</div>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 bg-[#5e43f3]/10 text-[#5e43f3] rounded-full text-[12px] font-bold">
              ZERO LOSS MIGRATION
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section: The New Vision */}
      <section className="pt-10 pb-24 px-6 text-center">
        <div className="max-w-[1000px] mx-auto">
          <h1 className="text-[56px] md:text-[84px] font-bold tracking-tight mb-8 leading-[1.05] text-[#1d1d1f] font-serif">
            The successor that <br />
            <span className="text-[#5e43f3]">won't let you down</span>
          </h1>
          <p className="text-[20px] md:text-[24px] text-[#86868b] mb-12 max-w-[780px] mx-auto leading-[1.4] font-medium">
            Meet the new team behind the ultimate AI memory. We’ve rebuilt the experience you love with 100% compatibility for your Rewind recordings and Pendant hardware.
          </p>
          
          <div className="flex flex-col items-center gap-4 mb-20">
            <div className="flex bg-[#f5f5f7] p-1.5 rounded-full border border-[#e8e8ed] shadow-inner w-full max-w-[480px]">
              <input 
                type="email" 
                placeholder="Your email to start migration" 
                className="bg-transparent px-6 py-3 outline-none flex-1 text-[17px] text-[#1d1d1f] placeholder:text-[#86868b]"
              />
              <Button className="bg-[#5e43f3] hover:bg-[#4b35c3] text-white rounded-full px-8 h-[48px] text-[16px] font-bold shadow-lg shadow-[#5e43f3]/20">
                Get Started
              </Button>
            </div>
            <p className="text-[13px] text-[#86868b] font-medium">Fully compatible with Mac, Windows, iOS, and Pendant.</p>
          </div>

          {/* Hero Device Mockup */}
          <div className="relative max-w-[1100px] mx-auto mt-10">
            <div className="relative z-10 bg-[#f5f5f7] rounded-[40px] p-4 border border-[#e8e8ed] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)]">
              <div className="relative aspect-[16/10] bg-white rounded-[28px] overflow-hidden border border-[#e8e8ed] flex items-center justify-center group cursor-pointer">
                <img src="/original-assets/rewind-ogthumb.jpg" alt="The New App" className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" />
                <div className="relative z-20 w-24 h-24 bg-[#5e43f3] rounded-full flex items-center justify-center shadow-2xl shadow-[#5e43f3]/40 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-0 h-0 border-t-[14px] border-t-transparent border-l-[24px] border-l-white border-b-[14px] border-b-transparent ml-2"></div>
                </div>
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md px-6 py-3 rounded-full text-white text-sm font-bold flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  See the New Experience
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The "New Team" Promise */}
      <section className="py-32 bg-[#f5f5f7] border-y border-[#e8e8ed]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-[40px] md:text-[52px] font-bold text-[#1d1d1f] mb-8 leading-[1.1] tracking-tight">
                A team committed to your long-term memory
              </h2>
              <p className="text-[20px] text-[#86868b] mb-10 leading-[1.5] font-medium">
                We saw the gap left behind and decided to step up. Our mission is simple: provide a stable, forever-home for your digital and physical memory. No sunsets, no forced migrations—just pure, reliable AI.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-[32px] font-bold text-[#5e43f3] mb-2">100%</div>
                  <div className="text-[15px] text-[#6e6e73] font-bold uppercase tracking-wider">Data Parity</div>
                </div>
                <div>
                  <div className="text-[32px] font-bold text-[#5e43f3] mb-2">24/7</div>
                  <div className="text-[15px] text-[#6e6e73] font-bold uppercase tracking-wider">Support Team</div>
                </div>
              </div>
            </div>
            <div className="bg-white p-10 rounded-[40px] border border-[#e8e8ed] shadow-xl">
              <h3 className="text-[24px] font-bold mb-6">Why we're different:</h3>
              <ul className="space-y-6">
                {[
                  { title: "Hardware First", desc: "Native support for Pendant and all legacy wearables." },
                  { title: "Open Data", desc: "Your recordings are yours. Export anytime in standard formats." },
                  { title: "Privacy Vault", desc: "Military-grade local encryption that even we can't break." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-5">
                    <div className="w-12 h-12 bg-[#5e43f3]/10 rounded-2xl flex items-center justify-center shrink-0">
                      <img src="/original-assets/64bc707b7cfdea0d0a6f262f_ic-check.svg" className="w-5 h-5" alt="" />
                    </div>
                    <div>
                      <div className="font-bold text-[18px] mb-1">{item.title}</div>
                      <div className="text-[#86868b] font-medium">{item.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Feature: Meeting Intelligence */}
      <section id="features" className="py-40 px-6 overflow-hidden">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="max-w-[540px]">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#5e43f3]/10 text-[#5e43f3] rounded-full text-[13px] font-bold mb-8 tracking-wider">
                <img src="/original-assets/64bc707b7cfdea0d0a6f262f_ic-check.svg" className="w-3.5 h-3.5" alt="" />
                NEXT-GEN MEETINGS
              </div>
              <h2 className="text-[40px] md:text-[52px] font-bold text-[#1d1d1f] mb-8 leading-[1.1] tracking-tight">
                The meeting summaries you actually want to read
              </h2>
              <p className="text-[20px] text-[#86868b] mb-10 leading-[1.5] font-medium">
                We’ve taken the original meeting detection and supercharged it with GPT-5 level intelligence. Get human-level summaries, action items, and sentiment analysis automatically.
              </p>
              <ul className="space-y-5">
                {['Zero-latency detection', 'Multi-speaker identification', 'Auto-sync to Notion & Slack', 'Works with Pendant audio'].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-[17px] text-[#424245] font-semibold">
                    <div className="w-6 h-6 bg-[#5e43f3] rounded-full flex items-center justify-center shadow-lg shadow-[#5e43f3]/20">
                      <img src="/original-assets/64bc707b7cfdea0d0a6f262f_ic-check.svg" className="w-3.5 h-3.5 invert" alt="" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute -inset-20 bg-[#5e43f3]/5 blur-[100px] rounded-full"></div>
              <div className="relative bg-[#f5f5f7] rounded-[40px] p-8 border border-[#e8e8ed] shadow-2xl">
                <img src="/original-assets/64bc67270b3b039b770e3afe_hiw-step-1.svg" alt="Meetings" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compatibility Banner */}
      <section id="compatibility" className="py-24 bg-[#5e43f3] text-white">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="text-[36px] md:text-[48px] font-bold mb-8 tracking-tight">Ready to migrate? It takes 30 seconds.</h2>
          <p className="text-[20px] text-white/80 mb-12 max-w-[700px] mx-auto font-medium">
            Simply point our app to your existing Rewind or Limitless data folder. We’ll index everything locally, preserving all your history and transcripts.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-white/10 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/20 flex items-center gap-4">
              <img src="/original-assets/64b9a8b87d7ee6f947910e82_rewind-icon.svg" className="w-8 h-8 invert" alt="" />
              <span className="font-bold">Rewind Legacy</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/20 flex items-center gap-4">
              <img src="/original-assets/64bdc13eb6b02693f01c190b_ic-limitless.svg" className="w-8 h-8 invert" alt="" />
              <span className="font-bold">Limitless Cloud</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/20 flex items-center gap-4">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-[#5e43f3] rounded-full"></div>
              </div>
              <span className="font-bold">Pendant Hardware</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing: High Conversion */}
      <section id="pricing" className="py-40 bg-[#f5f5f7]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-[40px] md:text-[52px] font-bold text-[#1d1d1f] tracking-tight">Simple, transparent pricing</h2>
            <p className="text-[20px] text-[#86868b] mt-4 font-medium">The memory you deserve, at a price that makes sense.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px] mx-auto">
            <div className="bg-white p-12 rounded-[40px] border border-[#e8e8ed] shadow-sm">
              <div className="text-[15px] font-bold text-[#6e6e73] uppercase tracking-widest mb-4">Free Forever</div>
              <div className="text-[48px] font-bold text-[#1d1d1f] mb-8">$0</div>
              <ul className="space-y-5 mb-12">
                {['Unlimited local recording', 'Basic search', '7-day history', 'Standard meeting summaries'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[16px] text-[#424245] font-medium">
                    <img src="/original-assets/64bc707b7cfdea0d0a6f262f_ic-check.svg" className="w-4 h-4 opacity-40" alt="" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-[#f5f5f7] hover:bg-[#ebebef] text-[#1d1d1f] rounded-full h-[56px] text-[17px] font-bold transition-all">
                Get Started
              </Button>
            </div>
            <div className="bg-white p-12 rounded-[40px] border-2 border-[#5e43f3] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#5e43f3] text-white px-6 py-2 rounded-bl-2xl text-[13px] font-bold uppercase tracking-wider">
                Most Popular
              </div>
              <div className="text-[15px] font-bold text-[#5e43f3] uppercase tracking-widest mb-4">Pro Successor</div>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-[48px] font-bold text-[#1d1d1f]">$19</span>
                <span className="text-[20px] text-[#86868b] font-medium">/mo</span>
              </div>
              <ul className="space-y-5 mb-12">
                {['Unlimited everything', 'Ask AI (GPT-5 Memory)', 'Lifetime history', 'Pendant Hardware Sync', 'Priority Support'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[16px] text-[#424245] font-bold">
                    <img src="/original-assets/64bc707b7cfdea0d0a6f262f_ic-check.svg" className="w-4 h-4 text-[#5e43f3]" alt="" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-[#5e43f3] hover:bg-[#4b35c3] text-white rounded-full h-[56px] text-[17px] font-bold transition-all shadow-lg shadow-[#5e43f3]/30">
                Go Pro
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 bg-white border-t border-[#e8e8ed]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-16 mb-24">
            <div className="col-span-2 lg:col-span-1">
              <img src="/original-assets/64bdc6b6f1a71b415d71679f_rewind-footer-logo.png" alt="Rewind Successor" className="h-9 mb-10" />
              <p className="text-[#86868b] text-[15px] leading-[1.6] font-medium">
                The team that won't let you down. Rebuilding the future of memory.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-[17px] text-[#1d1d1f] mb-8">Successor</h4>
              <ul className="space-y-5 text-[15px] text-[#6e6e73] font-medium">
                <li><a href="#" className="hover:text-[#5e43f3] transition-colors">Our Vision</a></li>
                <li><a href="#" className="hover:text-[#5e43f3] transition-colors">Migration Guide</a></li>
                <li><a href="#" className="hover:text-[#5e43f3] transition-colors">Compatibility</a></li>
                <li><a href="#" className="hover:text-[#5e43f3] transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[17px] text-[#1d1d1f] mb-8">Product</h4>
              <ul className="space-y-5 text-[15px] text-[#6e6e73] font-medium">
                <li><a href="#" className="hover:text-[#5e43f3] transition-colors">Mac App</a></li>
                <li><a href="#" className="hover:text-[#5e43f3] transition-colors">Windows App</a></li>
                <li><a href="#" className="hover:text-[#5e43f3] transition-colors">Pendant Sync</a></li>
                <li><a href="#" className="hover:text-[#5e43f3] transition-colors">Ask AI</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[17px] text-[#1d1d1f] mb-8">Support</h4>
              <ul className="space-y-5 text-[15px] text-[#6e6e73] font-medium">
                <li><a href="#" className="hover:text-[#5e43f3] transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-[#5e43f3] transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-[#5e43f3] transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-[#5e43f3] transition-colors">Community</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-[#e8e8ed] flex flex-col md:flex-row justify-between items-center gap-8 text-[#86868b] text-[13px] font-medium">
            <div>©2025 The New Team. All rights reserved.</div>
            <div className="flex gap-10">
              <a href="#" className="hover:text-[#1d1d1f] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#1d1d1f] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
