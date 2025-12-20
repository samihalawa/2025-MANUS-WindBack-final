import { Link } from "wouter";
import { History, ArrowLeft } from "lucide-react";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function Privacy() {
  usePageMeta({
    title: "Privacy Policy - WindBack",
    description: "Learn how WindBack protects your privacy and handles your personal data with military-grade encryption and local-first storage.",
    keywords: ["privacy policy", "data protection", "encryption", "security"]
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-gray-100/50">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2.5 cursor-pointer">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                <History className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">WindBack</span>
            </div>
          </Link>
          <Link href="/">
            <button className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          <p className="text-gray-600 mb-12">Last updated: December 20, 2025</p>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Our Commitment to Privacy</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              At WindBack, privacy is not just a feature—it's our foundation. We believe your memories, conversations, 
              and personal data are yours alone. This privacy policy explains how we collect, use, protect, and respect 
              your information.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Data We Collect</h2>
            
            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-3">Information You Provide</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
              <li>Account information (email address, name)</li>
              <li>Payment information (processed securely through Stripe)</li>
              <li>Settings and preferences you configure</li>
              <li>Communications with our support team</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-3">Information We Collect Automatically</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
              <li>Screen recordings and screenshots (stored locally first)</li>
              <li>Audio recordings and transcriptions</li>
              <li>Application usage metadata (window titles, timestamps)</li>
              <li>Device information and operating system details</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">How We Use Your Data</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use your data exclusively to provide and improve WindBack services:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
              <li><strong>Personal Memory Search:</strong> Indexing and searching your recordings and transcripts</li>
              <li><strong>AI Features:</strong> Powering Ask AI and intelligent summarization</li>
              <li><strong>Sync:</strong> Securely syncing your data across your devices</li>
              <li><strong>Product Improvement:</strong> Analyzing aggregated, anonymized usage patterns</li>
              <li><strong>Customer Support:</strong> Responding to your inquiries and troubleshooting issues</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">How We Protect Your Data</h2>
            
            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-3">End-to-End Encryption</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              All your recordings, transcripts, and personal data are encrypted locally on your device using AES-256 
              encryption before being synced to our cloud servers. Even WindBack employees cannot access your data 
              without your explicit permission.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-3">Local-First Architecture</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Your data is always stored locally first. Cloud sync is optional and only occurs when you enable it. 
              You have full control over what gets synced and what stays local.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-3">Zero-Knowledge Architecture</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              We employ a zero-knowledge architecture where your encryption keys are derived from credentials only 
              you know. This means we cannot decrypt your data even if compelled to do so.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Data Sharing and Third Parties</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We do not sell, rent, or share your personal data with third parties for marketing purposes. We only 
              share data in these limited circumstances:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
              <li><strong>Service Providers:</strong> Cloud hosting (AWS), payment processing (Stripe), and analytics (anonymized only)</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect rights and safety</li>
              <li><strong>Business Transfers:</strong> In the event of a merger or acquisition (with continued privacy protections)</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Your Rights and Controls</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You have complete control over your data:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
              <li><strong>Access:</strong> View and export all your data at any time</li>
              <li><strong>Delete:</strong> Permanently delete specific recordings or your entire account</li>
              <li><strong>Pause:</strong> Stop recording at any time with a single click</li>
              <li><strong>Selective Recording:</strong> Exclude specific apps, websites, or time periods</li>
              <li><strong>Data Portability:</strong> Export your data in standard formats</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Data Retention</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We retain your data for as long as your account is active or as needed to provide services. When you 
              delete recordings or your account, we permanently delete the data within 90 days. Backups are also 
              purged within this timeframe.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              WindBack is not intended for users under 13 years of age. We do not knowingly collect personal 
              information from children under 13.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">International Users</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              WindBack is operated from the United States. If you are located outside the US, your data may be 
              transferred to and stored in the US or other countries. We ensure appropriate safeguards are in place 
              for international data transfers.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Changes to This Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We may update this privacy policy from time to time. We will notify you of significant changes via 
              email or through the app. Your continued use of WindBack after changes constitutes acceptance of the 
              updated policy.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              If you have questions about this privacy policy or how we handle your data, please contact us:
            </p>
            <ul className="list-none text-gray-700 space-y-2 mb-6">
              <li><strong>Email:</strong> privacy@windback.ai</li>
              <li><strong>Support:</strong> support@windback.ai</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100 bg-gray-50">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <History className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight">WindBack</span>
            </div>
            <p className="text-gray-400 text-sm font-medium">© 2025 WindBack. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
