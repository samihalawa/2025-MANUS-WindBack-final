import { Link } from "wouter";
import { History, ArrowLeft } from "lucide-react";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function Terms() {
  usePageMeta({
    title: "Terms of Service - WindBack",
    description: "Read WindBack's terms of service and understand your rights and responsibilities when using our AI-powered memory app.",
    keywords: "terms of service, terms and conditions, user agreement"
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
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Terms of Service</h1>
          <p className="text-gray-600 mb-12">Last updated: December 20, 2025</p>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Agreement to Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              By accessing or using WindBack ("the Service"), you agree to be bound by these Terms of Service 
              ("Terms"). If you do not agree to these Terms, do not use the Service.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Description of Service</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              WindBack is a personal AI-powered memory and lifelog application that records, transcribes, and 
              indexes your digital activities, including screen content, audio conversations, and application usage. 
              The Service uses artificial intelligence to enable searching and querying your personal data.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Eligibility</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              To use WindBack, you must:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
              <li>Be at least 13 years of age</li>
              <li>Have the legal capacity to enter into these Terms</li>
              <li>Not be prohibited from using the Service under applicable laws</li>
              <li>Comply with all local laws regarding online conduct and acceptable content</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Account Registration</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              To use certain features, you must create an account. You agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Be responsible for all activities under your account</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Subscription Plans and Payment</h2>
            
            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-3">Free Plan</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              The Free plan provides limited features including 10 hours of AI processing per month and unlimited 
              local storage. We reserve the right to modify Free plan features at any time.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-3">Premium Plan</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Premium plan is billed annually at $99/year and includes:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
              <li>Unlimited AI processing</li>
              <li>Advanced GPT-5 Ask AI features</li>
              <li>Pendant hardware sync</li>
              <li>Priority support</li>
              <li>Cross-device cloud sync</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-3">Billing and Refunds</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
              <li>Premium subscriptions auto-renew annually unless canceled</li>
              <li>You can cancel anytime from your account settings</li>
              <li>Refunds are provided within 30 days of purchase for annual subscriptions</li>
              <li>After 30 days, refunds are at our discretion</li>
              <li>All payments are processed securely through Stripe</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Acceptable Use</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You agree not to use WindBack to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
              <li>Violate any laws or regulations</li>
              <li>Infringe on others' intellectual property or privacy rights</li>
              <li>Record others without proper consent where required by law</li>
              <li>Transmit malicious code or interfere with the Service</li>
              <li>Attempt to access other users' accounts or data</li>
              <li>Reverse engineer or decompile the Service</li>
              <li>Use the Service for any illegal or unauthorized purpose</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Recording Consent and Legal Compliance</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              <strong className="text-red-600">IMPORTANT:</strong> You are solely responsible for complying with all 
              applicable laws regarding recording, including consent requirements. Many jurisdictions require 
              consent from all parties before recording conversations. Failure to obtain proper consent may result 
              in civil and criminal liability. WindBack provides tools for recording but cannot provide legal 
              advice on consent requirements in your jurisdiction.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Intellectual Property</h2>
            
            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-3">Your Content</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              You retain all rights to your recordings, transcripts, and data ("Your Content"). By using WindBack, 
              you grant us a limited license to process and store Your Content solely to provide the Service.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-3">Our IP</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              WindBack and its original content, features, and functionality are owned by WindBack and protected 
              by international copyright, trademark, and other intellectual property laws.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Data and Privacy</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Your use of WindBack is subject to our Privacy Policy. We employ industry-standard security measures, 
              including end-to-end encryption, but cannot guarantee absolute security. You are responsible for 
              maintaining the confidentiality of your encryption keys.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Service Availability</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We strive to maintain high availability but do not guarantee uninterrupted access. The Service may be 
              unavailable due to maintenance, updates, or circumstances beyond our control. We are not liable for 
              any losses resulting from Service unavailability.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Termination</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may suspend or terminate your account if you:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
              <li>Violate these Terms</li>
              <li>Engage in fraudulent or illegal activities</li>
              <li>Fail to pay subscription fees</li>
              <li>Abuse the Service or harm other users</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-6">
              Upon termination, your right to use the Service ceases. Your local data remains accessible, but 
              cloud-synced data may be deleted after 90 days.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Disclaimers</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. WE DISCLAIM ALL WARRANTIES, 
              EXPRESS OR IMPLIED, INCLUDING:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
              <li>Merchantability and fitness for a particular purpose</li>
              <li>Accuracy or reliability of transcriptions and AI features</li>
              <li>Uninterrupted or error-free operation</li>
              <li>Security of data transmission or storage</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, WINDBACK SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, 
              SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFITS, DATA LOSS, OR BUSINESS 
              INTERRUPTION. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT PAID BY YOU IN THE LAST 12 MONTHS.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Indemnification</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              You agree to indemnify and hold WindBack harmless from any claims, losses, or damages arising from 
              your use of the Service, violation of these Terms, or infringement of any rights of others.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Governing Law</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              These Terms are governed by the laws of the State of California, United States, without regard to 
              conflict of law provisions. Any disputes shall be resolved in the courts of California.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We may modify these Terms at any time. Significant changes will be notified via email or through the 
              app. Continued use after changes constitutes acceptance of the modified Terms.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              For questions about these Terms, contact us:
            </p>
            <ul className="list-none text-gray-700 space-y-2 mb-6">
              <li><strong>Email:</strong> legal@windback.ai</li>
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
