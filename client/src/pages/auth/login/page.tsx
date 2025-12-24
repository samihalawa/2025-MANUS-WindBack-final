'use client'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="glass p-8 rounded-xl max-w-md w-full">
        <h1 className="text-2xl font-bold mb-2 text-center">Welcome Back</h1>
        <p className="text-gray-400 text-center mb-6">Sign in to your Rewind 2.0 account</p>
        
        <form className="space-y-4">
          <input type="email" placeholder="Email" className="w-full p-3 rounded bg-slate-800 border border-slate-700 focus:border-purple-500 outline-none" required />
          <input type="password" placeholder="Password" className="w-full p-3 rounded bg-slate-800 border border-slate-700 focus:border-purple-500 outline-none" required />
          <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 p-3 rounded font-semibold transition">Sign In</button>
        </form>
        
        <p className="text-center text-gray-500 text-sm mt-6">
          New here? <a href="/auth/signup" className="text-purple-400 hover:underline">Create account</a>
        </p>
      </div>
    </div>
  )
}
