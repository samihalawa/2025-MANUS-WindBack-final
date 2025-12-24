'use client'

export default function ImportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-4">Import Your Data</h1>
        <p className="text-gray-400 text-center mb-12">Bring your Rewind/Limitless recordings to their new home</p>

        <div className="glass p-8 rounded-xl mb-8">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl">⚠️</span>
            <div>
              <h2 className="text-xl font-semibold text-yellow-400">Time-Sensitive: Export Before It's Gone</h2>
              <p className="text-gray-400">Rewind shut down Dec 19. Limitless cloud shuts down Dec 2026. Export now.</p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Step 1 */}
          <div className="glass p-8 rounded-xl">
            <div className="flex items-start gap-4">
              <span className="bg-purple-600 w-8 h-8 rounded-full flex items-center justify-center font-bold">1</span>
              <div>
                <h3 className="text-xl font-semibold mb-2">Export from Limitless</h3>
                <ol className="text-gray-400 space-y-2">
                  <li>1. Open the Limitless app on your device</li>
                  <li>2. Go to Settings → Account → Export Data</li>
                  <li>3. Click "Download All Data" (creates a ZIP file)</li>
                  <li>4. Wait for download (may take 10-30 min depending on size)</li>
                </ol>
                <div className="mt-4 p-4 bg-slate-800 rounded">
                  <p className="text-sm text-gray-500">💡 Tip: Your export includes recordings, transcripts, and metadata</p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="glass p-8 rounded-xl">
            <div className="flex items-start gap-4">
              <span className="bg-purple-600 w-8 h-8 rounded-full flex items-center justify-center font-bold">2</span>
              <div>
                <h3 className="text-xl font-semibold mb-2">Upload to Rewind 2.0</h3>
                <div className="border-2 border-dashed border-slate-600 rounded-lg p-12 text-center hover:border-purple-500 transition cursor-pointer">
                  <div className="text-4xl mb-4">📁</div>
                  <p className="text-lg mb-2">Drop your Limitless export here</p>
                  <p className="text-sm text-gray-500">or click to browse • ZIP files up to 50GB</p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="glass p-8 rounded-xl">
            <div className="flex items-start gap-4">
              <span className="bg-purple-600 w-8 h-8 rounded-full flex items-center justify-center font-bold">3</span>
              <div>
                <h3 className="text-xl font-semibold mb-2">That's It!</h3>
                <p className="text-gray-400 mb-4">We'll process your import and notify you when ready. Usually takes 5-30 minutes.</p>
                <div className="flex gap-4">
                  <div className="flex-1 p-4 bg-slate-800 rounded text-center">
                    <p className="text-2xl font-bold gradient-text">0</p>
                    <p className="text-sm text-gray-500">Recordings imported</p>
                  </div>
                  <div className="flex-1 p-4 bg-slate-800 rounded text-center">
                    <p className="text-2xl font-bold gradient-text">0 GB</p>
                    <p className="text-sm text-gray-500">Data transferred</p>
                  </div>
                  <div className="flex-1 p-4 bg-slate-800 rounded text-center">
                    <p className="text-2xl font-bold gradient-text">—</p>
                    <p className="text-sm text-gray-500">Time to complete</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bonus */}
        <div className="mt-8 glass p-8 rounded-xl text-center">
          <h3 className="text-xl font-semibold mb-2">🎁 Import Bonus</h3>
          <p className="text-gray-400 mb-4">Complete your import and get 3 months of Pro free. That's $27 saved.</p>
          <a href="/auth/signup" className="inline-block bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded font-semibold transition">
            Create Account to Start Import
          </a>
        </div>

        {/* FAQ */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Common Questions</h2>
          <div className="space-y-4">
            <div className="glass p-6 rounded-xl">
              <h3 className="font-semibold mb-2">What formats are supported?</h3>
              <p className="text-gray-400">We support Limitless ZIP exports, Rewind .rwnd files, and standard video/audio formats (MP4, MOV, M4A).</p>
            </div>
            <div className="glass p-6 rounded-xl">
              <h3 className="font-semibold mb-2">Is my data secure during import?</h3>
              <p className="text-gray-400">Yes. Imports are encrypted in transit and at rest. Data is processed locally when possible. We never share your data.</p>
            </div>
            <div className="glass p-6 rounded-xl">
              <h3 className="font-semibold mb-2">Can I import if I'm on the free plan?</h3>
              <p className="text-gray-400">Yes! Free users can import up to 10 hours. Pro users can import unlimited data.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
