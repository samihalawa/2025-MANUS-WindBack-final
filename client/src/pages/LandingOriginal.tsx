import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function LandingOriginal() {
  return (
    <div className="min-h-screen bg-white text-[#1d1d1f] font-sans selection:bg-[#5e43f3] selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/">
              <img 
                src="/original-assets/64c088267e8881a7472517a4_rewind-logotype.svg" 
                alt="Rewind" 
                className="h-6 cursor-pointer"
              />
            </Link>
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
              <a href="#about" className="hover:text-[#5e43f3] transition-colors">About</a>
              <a href="#pricing" className="hover:text-[#5e43f3] transition-colors">Pricing</a>
              <a href="#use-cases" className="hover:text-[#5e43f3] transition-colors">Use Cases</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/app">
              <Button className="bg-[#5e43f3] hover:bg-[#4b35c3] text-white rounded-full px-6 h-11 font-semibold transition-all shadow-lg shadow-[#5e43f3]/20">
                Get Rewind
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Announcement Bar */}
      <div className="pt-28 pb-4 px-6">
        <div className="max-w-3xl mx-auto">
          <a 
            href="https://www.limitless.ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl border border-gray-100 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                <img src="/original-assets/64bdc13eb6b02693f01c190b_ic-limitless.svg" alt="Limitless" className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-gray-900">Introducing Limitless</div>
                <div className="text-sm text-gray-500">A web app, Mac app, Windows app, and wearable.</div>
              </div>
            </div>
            <img src="/original-assets/6508d8a09625bc305feec481_announcement-chevron.png" alt="" className="w-5 h-5 opacity-30 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-12 pb-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-gray-900">
            Your AI assistant that <br />
            <span className="text-[#5e43f3]">has all the context</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed">
            Rewind is a personalized AI powered by everything you’ve seen, said, or heard. Your colleagues will wonder how you do it all.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <div className="flex flex-col items-center gap-2">
              <div className="flex bg-gray-100 p-1 rounded-full border border-gray-200">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-transparent px-6 py-3 outline-none w-64 text-gray-900"
                />
                <Button className="bg-[#5e43f3] hover:bg-[#4b35c3] text-white rounded-full px-8 py-3 font-bold">
                  Get Rewind
                </Button>
              </div>
              <p className="text-xs text-gray-400">Download for Mac and iOS today.</p>
            </div>
          </div>

          {/* Hero Video/Image Placeholder */}
          <div className="relative max-w-5xl mx-auto mt-20 rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-gray-50 aspect-video flex items-center justify-center">
            <div className="text-center p-12">
              <div className="w-20 h-20 bg-[#5e43f3] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#5e43f3]/30">
                <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-2"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Watch Rewind in Action</h3>
              <p className="text-gray-500">See how personalized AI transforms your productivity.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Professionals use Rewind to get more done, faster.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Rewind is a refreshing revelation in the landscape of AI.",
                author: "Alexis Ohanian",
                role: "Founder, Reddit",
                avatar: "/original-assets/64bc4e93b9c30f67192c2bf8_alexis-av.jpg"
              },
              {
                quote: "I’m very optimistic about Rewind’s approach to personalized AI.",
                author: "Sam Altman",
                role: "CEO, OpenAI",
                avatar: "/original-assets/64bde966be4c261139ada397_sama-av.jpg"
              },
              {
                quote: "Rewind takes all the pressure of staying organized and taking notes off.",
                author: "David Lieb",
                role: "Creator, Google Photos",
                avatar: "/original-assets/64bedeac310a7840bd2f9cb7_davidlieb-av.jpg"
              }
            ].map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-lg text-gray-600 mb-8 italic">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.avatar} alt={t.author} className="w-12 h-12 rounded-full" />
                  <div>
                    <div className="font-bold text-gray-900">{t.author}</div>
                    <div className="text-sm text-gray-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#5e43f3]/10 text-[#5e43f3] rounded-full text-sm font-bold mb-6">
                <img src="/original-assets/64bc707b7cfdea0d0a6f262f_ic-check.svg" className="w-4 h-4" alt="" />
                MEETINGS
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Automate note-taking and get human-level meeting summaries
              </h2>
              <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                Record meetings no matter who’s the host and without inviting bots. Save hours each week with auto-recording and human-level meeting summaries, ready to share with your colleagues.
              </p>
              <ul className="space-y-4">
                {['No bots', 'Shareable summaries', 'Record no matter the host', 'Across Zoom, Meet, Teams'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                    <div className="w-5 h-5 bg-[#5e43f3] rounded-full flex items-center justify-center">
                      <img src="/original-assets/64bc707b7cfdea0d0a6f262f_ic-check.svg" className="w-3 h-3 invert" alt="" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-100 rounded-3xl aspect-square flex items-center justify-center p-12">
              <img src="/original-assets/64bc67270b3b039b770e3afe_hiw-step-1.svg" alt="Meetings" className="w-full h-auto" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1 bg-gray-100 rounded-3xl aspect-square flex items-center justify-center p-12">
              <img src="/original-assets/64f7adf6cb568c9ac876426f_hiw-step-2-updated.svg" alt="Backup" className="w-full h-auto" />
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#5e43f3]/10 text-[#5e43f3] rounded-full text-sm font-bold mb-6">
                <img src="/original-assets/64bc707b7cfdea0d0a6f262f_ic-check.svg" className="w-4 h-4" alt="" />
                BACKUP
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Avoid ever repeating lost work when a system inevitably crashes
              </h2>
              <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                Enjoy the safety net of having everything backed up without any of the data concerns. When you forget to hit save or your browser crashes, there’s no lost or wasted time. Scroll back in time to any moment.
              </p>
              <ul className="space-y-4">
                {['Find important details fast', 'Easily retrieve lost info', 'All your work backed up', 'Recall where you saw anything'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                    <div className="w-5 h-5 bg-[#5e43f3] rounded-full flex items-center justify-center">
                      <img src="/original-assets/64bc707b7cfdea0d0a6f262f_ic-check.svg" className="w-3 h-3 invert" alt="" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="py-32 bg-[#1d1d1f] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-8 leading-tight">Private by design</h2>
              <p className="text-xl text-gray-400 mb-12 leading-relaxed">
                Capturing everything you see, say, and hear means trust and privacy is more important than anything else.
              </p>
              <div className="space-y-12">
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                    <img src="/original-assets/64bdb9981b90be3b5fcc673e_ic-laptop-phone.svg" className="w-8 h-8" alt="" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Stored locally</h3>
                    <p className="text-gray-400">For your privacy, all of the recordings are stored locally on your Mac. No one else can access them - not even Rewind!</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                    <img src="/original-assets/64bdb37ad95372adf50c147d_ic-cloud-slash.svg" className="w-8 h-8" alt="" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">No cloud integration required</h3>
                    <p className="text-gray-400">It all just works automatically. No need to connect to a bunch of different services like Gmail, Dropbox, or Slack.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                    <img src="/original-assets/64bdb161b703f9575b6b9f2d_ic-incognito.svg" className="w-8 h-8" alt="" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Private browsing not captured</h3>
                    <p className="text-gray-400">Easily pause or delete recordings at any time. Decide which apps not to record, and auto-exclude incognito browsing windows.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-[#5e43f3] blur-[120px] opacity-20 rounded-full"></div>
              <img 
                src="/original-assets/64bc67270b3b039b770e3afe_hiw-step-1.svg" 
                alt="Privacy" 
                className="relative w-full h-auto invert opacity-80" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
            <div className="col-span-2 lg:col-span-1">
              <img src="/original-assets/64bdc6b6f1a71b415d71679f_rewind-footer-logo.png" alt="Rewind" className="h-8 mb-8" />
              <p className="text-gray-500 text-sm leading-relaxed">
                Your AI assistant that has all the context.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-6">Company</h4>
              <ul className="space-y-4 text-gray-500 text-sm">
                <li><a href="#" className="hover:text-[#5e43f3]">About</a></li>
                <li><a href="#" className="hover:text-[#5e43f3]">Blog</a></li>
                <li><a href="#" className="hover:text-[#5e43f3]">Careers</a></li>
                <li><a href="#" className="hover:text-[#5e43f3]">Press</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-6">Product</h4>
              <ul className="space-y-4 text-gray-500 text-sm">
                <li><a href="#" className="hover:text-[#5e43f3]">Mac</a></li>
                <li><a href="#" className="hover:text-[#5e43f3]">iPhone</a></li>
                <li><a href="#" className="hover:text-[#5e43f3]">Windows</a></li>
                <li><a href="#" className="hover:text-[#5e43f3]">Pendant</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-6">Support</h4>
              <ul className="space-y-4 text-gray-500 text-sm">
                <li><a href="#" className="hover:text-[#5e43f3]">Help Center</a></li>
                <li><a href="#" className="hover:text-[#5e43f3]">Changelog</a></li>
                <li><a href="#" className="hover:text-[#5e43f3]">Pricing</a></li>
                <li><a href="#" className="hover:text-[#5e43f3]">Slack Community</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-400 text-xs">
            <div>©2023 Rewind AI, Inc.</div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-gray-900">Privacy Policy</a>
              <a href="#" className="hover:text-gray-900">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
