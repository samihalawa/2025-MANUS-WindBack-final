'use client'
import { useState } from 'react'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="glass p-8 rounded-xl max-w-md w-full">
        <h1 className="text-2xl font-bold mb-2 text-center">Create Your Account</h1>
        <p className="text-gray-400 text-center mb-6">Start with 10 free hours/month</p>
        
        {submitted ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🎉</div>
            <h2 className="text-xl font-semibold mb-2">You're on the list!</h2>
            <p className="text-gray-400">Check your email for access. Welcome to Rewind 2.0.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded bg-slate-800 border border-slate-700 focus:border-purple-500 outline-none"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded bg-slate-800 border border-slate-700 focus:border-purple-500 outline-none"
              required
            />
            <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 p-3 rounded font-semibold transition">
              Create Account
            </button>
          </form>
        )}
        
        <p className="text-center text-gray-500 text-sm mt-6">
          Already have an account? <a href="/auth/login" className="text-purple-400 hover:underline">Login</a>
        </p>
        <p className="text-center text-gray-600 text-xs mt-4">
          Coming from Rewind/Limitless? <a href="/import" className="text-purple-400 hover:underline">Import your data first</a>
        </p>
      </div>
    </div>
  )
}
