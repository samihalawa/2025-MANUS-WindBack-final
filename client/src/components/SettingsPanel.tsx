import React from 'react';
import { Shield, Database, ChevronRight, Globe, CreditCard } from 'lucide-react';

export function SettingsPanel() {
  return (
    <div className="flex h-full w-full bg-[#f5f5f7] overflow-hidden relative">
      <div className="flex-1 overflow-y-auto p-8 lg:px-16 lg:py-12 scroll-smooth">
        <div className="max-w-2xl mx-auto space-y-8 pb-20">
          <header className="flex flex-col gap-1 mb-6 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-text-primary">Settings</h1>
            <p className="text-text-secondary text-sm">Manage your account and preferences</p>
          </header>

          <div className="space-y-6">
            {/* Section 1: Account */}
            <div className="space-y-2">
              <h3 className="text-xs font-medium text-text-secondary uppercase tracking-wider ml-4">Account</h3>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden divide-y divide-gray-100">
                <div className="flex items-center p-4 hover:bg-gray-50 transition-colors cursor-pointer group">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white mr-4 shadow-sm">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-text-primary">Language & Region</p>
                    <p className="text-xs text-text-secondary">English (US)</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                </div>
                <div className="flex items-center p-4 hover:bg-gray-50 transition-colors cursor-pointer group">
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white mr-4 shadow-sm">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-text-primary">Billing</p>
                    <p className="text-xs text-text-secondary">Pro Plan active</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                </div>
              </div>
            </div>

            {/* Section 2: Privacy */}
            <div className="space-y-2">
              <h3 className="text-xs font-medium text-text-secondary uppercase tracking-wider ml-4">Privacy & Security</h3>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden divide-y divide-gray-100">
                <div className="flex items-center p-4">
                  <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white mr-4 shadow-sm">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div className="flex-1 pr-4">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm font-medium text-text-primary">Lockdown Mode</p>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                      </label>
                    </div>
                    <p className="text-xs text-text-secondary leading-normal">
                      Instantly stop all recording and disconnect from cloud services.
                    </p>
                  </div>
                </div>
                <div className="flex items-center p-4">
                  <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white mr-4 shadow-sm">
                    <Database className="w-4 h-4" />
                  </div>
                  <div className="flex-1 pr-4">
                    <p className="text-sm font-medium text-text-primary mb-2">Cloud Storage</p>
                    <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                    <p className="text-xs text-text-secondary flex justify-between">
                      <span>12.5 GB Used</span>
                      <span>50 GB Total</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Data */}
            <div className="space-y-2">
              <h3 className="text-xs font-medium text-text-secondary uppercase tracking-wider ml-4">Data Management</h3>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden divide-y divide-gray-100">
                <div className="p-4 flex items-center justify-between group cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-text-primary">Export All Data</span>
                    <span className="text-xs text-text-secondary">Download a copy of your personal archive</span>
                  </div>
                  <button className="px-3 py-1.5 bg-white border border-gray-300 hover:bg-gray-50 text-xs font-medium rounded-md shadow-sm text-text-primary transition-all">
                    Export
                  </button>
                </div>
                <div className="p-4 flex items-center justify-between group cursor-pointer hover:bg-red-50/50 transition-colors">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-red-600">Delete Account</span>
                    <span className="text-xs text-red-400">Permanently remove all data</span>
                  </div>
                  <button className="px-3 py-1.5 bg-white border border-red-200 text-red-600 hover:bg-red-50 text-xs font-medium rounded-md shadow-sm transition-all">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
