'use client'
import { useState } from 'react'

export default function Dashboard() {
  const [isRecording, setIsRecording] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar */}
      <div className="w-64 border-r border-slate-800 p-4">
        <h1 className="text-xl font-bold gradient-text mb-6">Rewind 2.0</h1>
        <nav className="space-y-2">
          <a href="#" className="block p-2 rounded bg-purple-600/20 text-purple-300">Timeline</a>
          <a href="#" className="block p-2 rounded hover:bg-slate-800 text-gray-400">Search</a>
          <a href="#" className="block p-2 rounded hover:bg-slate-800 text-gray-400">Imports</a>
          <a href="#" className="block p-2 rounded hover:bg-slate-800 text-gray-400">Settings</a>
        </nav>
        <div className="mt-8 p-3 glass rounded-lg text-sm">
          <p className="text-gray-400">Free Plan</p>
          <p className="text-white font-semibold">8.5 hrs remaining</p>
          <a href="/pricing" className="text-purple-400 text-xs hover:underline">Upgrade to Pro →</a>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <input
            type="text"
            placeholder="Search your memory..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-96 p-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-purple-500 outline-none"
          />
          <button
            onClick={() => setIsRecording(!isRecording)}
            className={`px-6 py-3 rounded-lg font-semibold transition ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-purple-600 hover:bg-purple-700'}`}
          >
            {isRecording ? '⏹ Stop Recording' : '⏺ Start Recording'}
          </button>
        </div>

        {/* Status */}
        {isRecording && (
          <div className="mb-6 p-4 glass rounded-lg flex items-center gap-3">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span>Recording in progress... Capturing screen activity</span>
          </div>
        )}

        {/* Timeline */}
        <div className="mb-8">
          <h2 className="text-sm text-gray-500 uppercase mb-4">Today's Timeline</h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {[
              { time: '9:00 AM', app: 'Chrome', icon: '🌐' },
              { time: '10:30 AM', app: 'VS Code', icon: '💻' },
              { time: '11:45 AM', app: 'Slack', icon: '💬' },
              { time: '1:00 PM', app: 'Figma', icon: '🎨' },
              { time: '2:30 PM', app: 'Zoom', icon: '📹' },
              { time: '3:45 PM', app: 'Notion', icon: '📝' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-80 transition">
                <div className="w-16 h-16 bg-slate-800 rounded border border-slate-700 flex items-center justify-center hover:border-purple-500 transition">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <p className="text-xs text-gray-500">{item.time}</p>
                <p className="text-xs text-gray-400">{item.app}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-sm text-gray-500 uppercase mb-4">Recent Captures</h2>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="glass p-4 rounded-lg hover:border-purple-500 transition cursor-pointer">
                <div className="bg-slate-800 h-24 rounded mb-3 flex items-center justify-center text-gray-600">
                  Screenshot {i}
                </div>
                <p className="text-sm text-gray-400">2 hours ago</p>
                <p className="text-xs text-gray-500 truncate">Working on project documentation...</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
