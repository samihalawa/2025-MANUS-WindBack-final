'use client'

import { useAuth } from '@/_core/hooks/useAuth';
import { getLoginUrl } from '@/const';

export default function Home() {
  const { user, isAuthenticated } = useAuth();

  // 不要自动重定向已登录用户，让他们看到营销主页
  // 他们可以通过导航菜单访问应用

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
            W
          </div>
          <span>WindBack</span>
        </div>
        <div className="flex gap-4">
          <a href="/pricing" className="hover:text-gray-300 transition">
            Pricing
          </a>
          <a href="#" onClick={() => (window.location.href = getLoginUrl())} className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg transition">
            Sign In
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto py-20 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Your <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">Screen Memory</span>,<br />Rebuilt From Day One
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          The original Rewind experience. Local-first, privacy-focused screen recording with instant search. Built by someone who loved Rewind.
        </p>
        <div className="flex gap-4 justify-center">
          <a href="#" onClick={() => (window.location.href = getLoginUrl())} className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-lg text-lg font-semibold transition">
            Start Free — 10 hrs/month
          </a>
          <a href="/import" className="border border-gray-600 hover:border-gray-400 px-8 py-4 rounded-lg text-lg transition">
            Import from Rewind →
          </a>
        </div>
        <p className="text-sm text-gray-500 mt-4">No credit card required. Export your data anytime.</p>
      </section>

      {/* Why Switch */}
      <section className="max-w-6xl mx-auto py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose WindBack</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
            <div className="text-3xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold mb-2">Local-First Privacy</h3>
            <p className="text-gray-400">Your data stays on your device. No cloud. No surveillance. Complete privacy.</p>
          </div>
          <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Instant Search</h3>
            <p className="text-gray-400">Find anything you've seen. OCR-based text search across all your screen recordings.</p>
          </div>
          <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
            <div className="text-3xl mb-4">📦</div>
            <h3 className="text-xl font-semibold mb-2">Easy Import</h3>
            <p className="text-gray-400">Import your existing recordings in minutes. All your data, preserved.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto py-20 px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to reclaim your screen memory?</h2>
        <p className="text-xl text-gray-400 mb-8">Join thousands of users who refuse to lose their digital memories.</p>
        <a href="#" onClick={() => (window.location.href = getLoginUrl())} className="inline-block bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-lg text-lg font-semibold transition">
          Get Started Free →
        </a>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 text-center text-gray-500 text-sm">
        <p>WindBack - Screen memory, reclaimed.</p>
        <p className="mt-2">© 2025 WindBack • Privacy-first, always.</p>
      </footer>
    </div>
  );
}
