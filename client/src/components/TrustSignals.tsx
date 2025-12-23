import { Shield, Lock, Server, Eye, FileCheck, Key } from "lucide-react";

export function TrustSignals() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Built with Security & Privacy First
          </h2>
          <p className="text-xl text-gray-600">
            Your data is protected by industry-leading security standards
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              AES-256 Encryption
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Military-grade encryption protects your data both in transit and at rest. The same standard used by governments and banks.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Key className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Zero-Knowledge Architecture
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Only you hold the encryption keys. We can't access your data even if we wanted to. True privacy by design.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Server className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Local-First Storage
            </h3>
            <p className="text-gray-600 leading-relaxed">
              All recordings are stored locally first. Cloud sync is optional and always encrypted end-to-end.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Eye className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Full Transparency
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Complete visibility into what's recorded. Pause, delete, or export your data anytime with one click.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              GDPR & SOC 2 Compliant
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We meet international privacy standards including GDPR, CCPA, and are SOC 2 Type II certified.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm text-center">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileCheck className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Regular Security Audits
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Third-party security audits and penetration testing ensure your data remains protected against threats.
            </p>
          </div>
        </div>

        {/* Security Badges */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="flex flex-wrap items-center justify-center gap-12">
            <div className="text-center">
              <div className="text-4xl mb-2">🔒</div>
              <p className="text-sm font-bold text-gray-700">SSL/TLS</p>
              <p className="text-xs text-gray-500">Encrypted</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">✅</div>
              <p className="text-sm font-bold text-gray-700">SOC 2</p>
              <p className="text-xs text-gray-500">Type II</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🇪🇺</div>
              <p className="text-sm font-bold text-gray-700">GDPR</p>
              <p className="text-xs text-gray-500">Compliant</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🛡️</div>
              <p className="text-sm font-bold text-gray-700">ISO 27001</p>
              <p className="text-xs text-gray-500">Certified</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🔐</div>
              <p className="text-sm font-bold text-gray-700">AES-256</p>
              <p className="text-xs text-gray-500">Encryption</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
