'use client'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Nav */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold gradient-text">Rewind 2.0</h1>
        <div className="flex gap-4">
          <a href="/pricing" className="text-gray-400 hover:text-white transition">Pricing</a>
          <a href="/import" className="text-gray-400 hover:text-white transition">Import Data</a>
          <a href="/auth/login" className="text-gray-400 hover:text-white transition">Login</a>
          <a href="/auth/signup" className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition">Get Started Free</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto text-center py-24 px-6">
        <div className="inline-block px-4 py-2 mb-6 rounded-full glass text-sm text-purple-300">
          🚀 Rewind shut down yesterday. We're back. Better.
        </div>
        <h1 className="text-6xl font-bold mb-6 leading-tight">
          Your <span className="gradient-text">Screen Memory</span>,<br />Rebuilt From Day One
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          The original Rewind experience that Meta killed. Local-first, privacy-focused screen recording with instant search. Built by someone who loved Rewind.
        </p>
        <div className="flex gap-4 justify-center">
          <a href="/auth/signup" className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-lg text-lg font-semibold transition">
            Start Free — 10 hrs/month
          </a>
          <a href="/import" className="glass px-8 py-4 rounded-lg text-lg transition hover:bg-white/10">
            Import from Rewind →
          </a>
        </div>
        <p className="text-sm text-gray-500 mt-4">No credit card required. Export your Limitless data before it's gone.</p>
      </section>

      {/* Why Switch */}
      <section className="max-w-6xl mx-auto py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Why 50,000+ Rewind Users Are Switching</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass p-8 rounded-xl">
            <div className="text-3xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold mb-2">Local-First Privacy</h3>
            <p className="text-gray-400">Your data stays on your device. No Meta. No cloud. No surveillance. Like the original Rewind, before the pivot.</p>
          </div>
          <div className="glass p-8 rounded-xl">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Instant Search</h3>
            <p className="text-gray-400">Find anything you've seen. OCR-based text search across all your screen recordings. Works offline.</p>
          </div>
          <div className="glass p-8 rounded-xl">
            <div className="text-3xl mb-4">📦</div>
            <h3 className="text-xl font-semibold mb-2">One-Click Import</h3>
            <p className="text-gray-400">Export from Limitless before Dec 19, import here in 2 minutes. All your recordings, preserved.</p>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="max-w-4xl mx-auto py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Original Rewind vs Meta's Pivot</h2>
        <div className="glass rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-purple-900/30">
              <tr>
                <th className="p-4 text-left">Feature</th>
                <th className="p-4 text-center">Original Rewind ✅</th>
                <th className="p-4 text-center">Limitless (Dead)</th>
                <th className="p-4 text-center">Rewind 2.0 ✅</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              <tr><td className="p-4">Full screen memory</td><td className="p-4 text-center text-green-400">✓</td><td className="p-4 text-center text-red-400">✗ Meetings only</td><td className="p-4 text-center text-green-400">✓</td></tr>
              <tr><td className="p-4">Local-first storage</td><td className="p-4 text-center text-green-400">✓</td><td className="p-4 text-center text-red-400">✗ Cloud</td><td className="p-4 text-center text-green-400">✓</td></tr>
              <tr><td className="p-4">Privacy-focused</td><td className="p-4 text-center text-green-400">✓</td><td className="p-4 text-center text-red-400">✗ Meta owns data</td><td className="p-4 text-center text-green-400">✓</td></tr>
              <tr><td className="p-4">Available now</td><td className="p-4 text-center text-red-400">✗ Dead Dec 19</td><td className="p-4 text-center text-red-400">✗ Dead Dec 19</td><td className="p-4 text-center text-green-400">✓</td></tr>
              <tr><td className="p-4">Price</td><td className="p-4 text-center">$20/mo</td><td className="p-4 text-center">$99 hardware + $10/mo</td><td className="p-4 text-center text-green-400">Free tier + $9/mo</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto py-20 px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">Rewind is dead. Long live Rewind.</h2>
        <p className="text-xl text-gray-400 mb-8">Join thousands of users who refuse to let Meta kill their screen memory.</p>
        <a href="/auth/signup" className="inline-block bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-lg text-lg font-semibold transition">
          Get Started Free →
        </a>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 text-center text-gray-500 text-sm">
        <p>Built by someone who loved Rewind. Not affiliated with original Rewind or Limitless or Meta.</p>
        <p className="mt-2">© 2025 Rewind 2.0 • Privacy-first, always.</p>
      </footer>
    </div>
  )
}
