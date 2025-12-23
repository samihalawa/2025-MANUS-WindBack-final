import React from 'react';
import { LayoutGrid, Clock, Video, Bot, Settings, Infinity, AudioWaveform } from 'lucide-react';
import { View } from '@/types/dashboard';

interface DashboardNavProps {
  currentView: View;
  setView: (view: View) => void;
}

export function DashboardNav({ currentView, setView }: DashboardNavProps) {
  const navItems = [
    { view: View.DASHBOARD, icon: LayoutGrid, label: 'Dashboard' },
    { view: View.MEETINGS, icon: Video, label: 'Meetings' },
    { view: View.REWIND, icon: Clock, label: 'Rewind' },
    { view: View.ASK_AI, icon: Bot, label: 'Ask AI' },
    { view: View.SETTINGS, icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className="w-20 lg:w-64 flex flex-col justify-between sidebar-panel transition-all duration-300 z-20 shrink-0 h-full">
      <div className="flex flex-col gap-5 p-4">
        {/* Logo Area */}
        <div className="flex items-center gap-3 px-2 pt-2 cursor-pointer mb-2" onClick={() => setView(View.DASHBOARD)}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-[#8b5cf6] flex items-center justify-center text-white shadow-lg shadow-primary/20 shrink-0">
            <span className="text-xl font-bold">✦</span>
          </div>
          <h1 className="hidden lg:block text-text-primary text-lg font-bold tracking-tight">WindBack</h1>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = currentView === item.view;
            return (
              <button
                key={item.label}
                onClick={() => setView(item.view)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group w-full ${
                  isActive
                    ? 'bg-white shadow-sm text-primary font-semibold'
                    : 'text-text-secondary hover:bg-black/5 hover:text-text-primary'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'fill-current opacity-100' : 'opacity-80'}`} />
                <p className="hidden lg:block text-sm">{item.label}</p>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="flex flex-col gap-4 p-4">
        <button
          onClick={() => setView(View.PENDANT)}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-text-secondary hover:bg-black/5 hover:text-text-primary transition-colors group"
        >
          <AudioWaveform className="w-5 h-5" />
          <p className="hidden lg:block text-[14px] font-medium">Connect Pendant</p>
        </button>

        <div className="hidden lg:flex flex-col gap-2 p-3.5 rounded-xl bg-white/50 border border-black/5 shadow-sm backdrop-blur-sm">
          <div className="flex justify-between items-center text-xs font-medium">
            <span className="text-text-secondary">Cloud Storage</span>
            <span className="text-text-primary">68%</span>
          </div>
          <div className="h-1.5 w-full bg-gray-200/80 rounded-full overflow-hidden">
            <div className="h-full bg-primary w-[68%] rounded-full shadow-sm"></div>
          </div>
          <p className="text-[10px] text-text-secondary">3.4 GB of 5 GB used</p>
        </div>

        <div className="flex items-center gap-3 px-2 py-1 rounded-lg hover:bg-black/5 transition-colors cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-sm ring-2 ring-white"></div>
          <div className="hidden lg:flex flex-col text-left">
            <p className="text-text-primary text-sm font-semibold leading-none">User</p>
            <p className="text-text-secondary text-xs mt-1">Pro Member</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
