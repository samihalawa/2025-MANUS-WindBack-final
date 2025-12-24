'use client'

export default function PricingPage() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: '/forever',
      desc: 'For casual users',
      features: ['10 hours/month recording', '7-day search history', 'Local storage only', 'Basic OCR search'],
      cta: 'Get Started',
      highlight: false,
    },
    {
      name: 'Pro',
      price: '$9',
      period: '/month',
      desc: 'For power users',
      features: ['Unlimited recording', 'Full history forever', 'Cloud backup option', 'AI summaries', 'Priority transcription', 'Export to PDF'],
      cta: 'Start Free Trial',
      highlight: true,
    },
    {
      name: 'Team',
      price: '$29',
      period: '/user/month',
      desc: 'For teams',
      features: ['Everything in Pro', 'Share recordings', 'Admin dashboard', 'SSO integration', 'Priority support', 'Custom retention'],
      cta: 'Contact Sales',
      highlight: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-4">Simple, Honest Pricing</h1>
        <p className="text-gray-400 text-center mb-4">Half the price of original Rewind. Same quality.</p>
        <p className="text-purple-400 text-center mb-12">🎉 Early adopter discount: 50% off first year</p>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div key={plan.name} className={`glass p-8 rounded-xl ${plan.highlight ? 'border-purple-500 border-2 scale-105' : ''}`}>
              {plan.highlight && <div className="text-purple-400 text-sm font-semibold mb-2">MOST POPULAR</div>}
              <h2 className="text-2xl font-bold">{plan.name}</h2>
              <div className="flex items-baseline gap-1 my-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-gray-400">{plan.period}</span>
              </div>
              <p className="text-gray-400 mb-6">{plan.desc}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <span className="text-green-400">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-lg font-semibold transition ${plan.highlight ? 'bg-purple-600 hover:bg-purple-700' : 'bg-slate-800 hover:bg-slate-700'}`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold mb-4">Coming from Rewind/Limitless?</h3>
          <p className="text-gray-400 mb-4">Get 3 months Pro free when you import your data.</p>
          <a href="/import" className="text-purple-400 hover:underline">Import your data now →</a>
        </div>
      </div>
    </div>
  )
}
