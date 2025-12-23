import React from 'react';
import { Activity, Zap, CheckCircle2, Sparkles, Search, Bell, Users, Laptop, Mail, Calendar, ArrowRight } from 'lucide-react';
import { DASHBOARD_STATS } from '@/lib/dashboardMockData';

export function AppDashboard() {
  return (
    <div className="flex flex-col h-full bg-white overflow-hidden">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-3.5 glass-panel">
        <div className="flex items-center gap-6 flex-1">
          <h2 className="text-text-primary text-xl font-bold tracking-tight">Today</h2>
          <div className="hidden md:flex items-center bg-gray-100/50 hover:bg-gray-100 border border-transparent focus-within:border-primary/30 focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/10 rounded-lg px-3 py-1.5 w-full max-w-sm transition-all duration-200">
            <Search className="text-text-secondary w-5 h-5" />
            <input
              className="bg-transparent border-none text-text-primary placeholder-text-secondary text-sm w-full focus:ring-0 ml-2 outline-none font-medium"
              placeholder="Search transcripts..."
              type="text"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm">
            <div className="relative flex w-2.5 h-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full w-2.5 h-2.5 bg-primary"></span>
            </div>
            <span className="text-xs font-semibold text-text-primary">Listening</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm">
            <span className="text-green-500 font-bold text-xs">82%</span>
            <span className="text-xs font-medium text-text-primary">Pendant</span>
          </div>
          <button className="text-text-secondary hover:text-text-primary p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pt-20 pb-20 px-4 md:px-10 no-scrollbar scroll-smooth">
        <div className="max-w-5xl mx-auto flex flex-col gap-8 mt-6 animate-scale-in">

          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between pl-1">
              <h3 className="text-text-secondary text-xs font-bold uppercase tracking-wider">Overview</h3>
              <button className="text-primary text-xs font-medium hover:underline">View Analytics</button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border border-macos-border p-5 rounded-2xl shadow-soft flex flex-col gap-1 hover:shadow-md transition-shadow duration-300">
                <div className="flex justify-between items-start">
                  <span className="text-text-secondary text-sm font-medium">Recording Time</span>
                  <div className="p-1.5 bg-purple-50 rounded-md text-primary">
                    <Activity className="w-5 h-5" />
                  </div>
                </div>
                <span className="text-2xl font-bold text-text-primary mt-2">{DASHBOARD_STATS.recordingTime}</span>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-1.5 py-0.5 rounded">+12%</span>
                  <span className="text-xs text-text-secondary">vs yesterday</span>
                </div>
              </div>

              <div className="bg-white border border-macos-border p-5 rounded-2xl shadow-soft flex flex-col gap-1 hover:shadow-md transition-shadow duration-300">
                <div className="flex justify-between items-start">
                  <span className="text-text-secondary text-sm font-medium">Action Items</span>
                  <div className="p-1.5 bg-blue-50 rounded-md text-blue-600">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                </div>
                <span className="text-2xl font-bold text-text-primary mt-2">{DASHBOARD_STATS.actionItems} Pending</span>
                <div className="flex items-center gap-1 mt-1">
                  <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                  <span className="text-xs text-text-secondary">{DASHBOARD_STATS.actionItemsHigh} high priority</span>
                </div>
              </div>

              <div className="bg-white border border-macos-border p-5 rounded-2xl shadow-soft flex flex-col gap-1 hover:shadow-md transition-shadow duration-300">
                <div className="flex justify-between items-start">
                  <span className="text-text-secondary text-sm font-medium">Meetings</span>
                  <div className="p-1.5 bg-orange-50 rounded-md text-orange-600">
                    <Zap className="w-5 h-5" />
                  </div>
                </div>
                <span className="text-2xl font-bold text-text-primary mt-2">{DASHBOARD_STATS.meetings} Total</span>
                {DASHBOARD_STATS.nextMeeting && (
                  <span className="text-xs text-text-secondary mt-1">Next: {DASHBOARD_STATS.nextMeeting}</span>
                )}
              </div>
            </div>

            {/* Hero Card - AI Insight */}
            <div className="relative overflow-hidden rounded-2xl border border-macos-border shadow-soft group min-h-[220px] flex items-end mt-2">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&w=1200&q=80")' }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>
              <div className="relative z-10 p-6 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 w-full">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-white/20 backdrop-blur-sm p-1 rounded text-white">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <span className="text-white/90 text-xs font-bold uppercase tracking-wider">AI Insight</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2 leading-tight">Q3 Roadmap Review</h2>
                  <p className="text-gray-200 text-sm leading-relaxed max-w-lg font-medium">
                    The team aligned on shipping the new iOS widget by mid-July. Marketing requested a 2-week lead time for assets.
                  </p>
                </div>
                <button className="shrink-0 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                  Read Summary
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between pl-1">
              <h3 className="text-text-secondary text-xs font-bold uppercase tracking-wider">Timeline</h3>
            </div>
            <div className="relative pl-4 md:pl-6 border-l border-gray-200 space-y-8 pb-10">

              {/* Event 1 - Meeting */}
              <div className="relative pl-6 md:pl-8">
                <div className="absolute -left-[5px] md:-left-[7px] top-2 w-3 h-3 rounded-full bg-primary shadow-lg ring-4 ring-white"></div>
                <div className="flex flex-col gap-3 group cursor-pointer">
                  <span className="text-text-secondary text-xs font-medium">10:00 AM • 45m</span>
                  <div className="bg-white border border-macos-border rounded-2xl p-5 shadow-soft hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="bg-indigo-50 p-2.5 rounded-xl text-indigo-600">
                          <Users className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-text-primary font-bold text-base group-hover:text-primary transition-colors">Design System Sync</h4>
                          <p className="text-text-secondary text-xs">Zoom • Recorded</p>
                        </div>
                      </div>
                      <div className="flex -space-x-2">
                        <div className="w-7 h-7 rounded-full border-2 border-white bg-gradient-to-br from-blue-400 to-blue-600"></div>
                        <div className="w-7 h-7 rounded-full border-2 border-white bg-gradient-to-br from-purple-400 to-purple-600"></div>
                        <div className="w-7 h-7 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-medium text-gray-500">+2</div>
                      </div>
                    </div>
                    <div className="pl-[58px]">
                      <p className="text-text-primary text-sm leading-relaxed line-clamp-2">
                        Discussed the typography scale updates. Need to audit existing components for compatibility. Action item for @Alex to update the Figma library.
                      </p>
                      <div className="flex gap-2 mt-3">
                        <span className="px-2 py-1 rounded-md bg-gray-100 text-[10px] font-medium text-text-secondary border border-gray-200">#design-system</span>
                        <span className="px-2 py-1 rounded-md bg-gray-100 text-[10px] font-medium text-text-secondary border border-gray-200">#ui-kit</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Event 2 - Deep Work */}
              <div className="relative pl-6 md:pl-8">
                <div className="absolute -left-[5px] md:-left-[7px] top-2 w-3 h-3 rounded-full bg-gray-300 ring-4 ring-white"></div>
                <div className="flex flex-col gap-3 group cursor-pointer">
                  <span className="text-text-secondary text-xs font-medium">11:15 AM • 1h 20m</span>
                  <div className="bg-white border border-macos-border rounded-2xl p-5 shadow-soft hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        <div className="bg-gray-100 p-2.5 rounded-xl text-gray-600">
                          <Laptop className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-text-primary font-bold text-base group-hover:text-primary transition-colors">Deep Work</h4>
                          <p className="text-text-secondary text-xs">VS Code • Arc Browser</p>
                        </div>
                      </div>
                    </div>
                    <div className="pl-[58px] mt-1">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="bg-gray-50 p-3 rounded-xl flex items-center gap-3 border border-gray-100">
                          <div className="w-9 h-9 rounded-lg bg-black flex items-center justify-center shrink-0">
                            <span className="text-white font-bold text-xs">Fg</span>
                          </div>
                          <div className="min-w-0">
                            <p className="text-text-primary text-xs font-semibold truncate">Mobile App V2</p>
                            <p className="text-text-secondary text-[10px]">Figma • Edited 45m</p>
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-xl flex items-center gap-3 border border-gray-100">
                          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
                            <span className="text-white font-bold text-xs">Vs</span>
                          </div>
                          <div className="min-w-0">
                            <p className="text-text-primary text-xs font-semibold truncate">Frontend Refactor</p>
                            <p className="text-text-secondary text-[10px]">VS Code • Active 35m</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Event 3 - Email */}
              <div className="relative pl-6 md:pl-8">
                <div className="absolute -left-[5px] md:-left-[7px] top-2 w-3 h-3 rounded-full bg-gray-200 ring-4 ring-white"></div>
                <div className="flex flex-col gap-2">
                  <span className="text-text-secondary text-xs font-medium">12:45 PM</span>
                  <div className="flex items-center gap-3 py-1 group cursor-pointer">
                    <div className="p-2 bg-white border border-gray-200 shadow-sm rounded-lg text-text-secondary group-hover:text-primary group-hover:border-primary/30 transition-colors">
                      <Mail className="w-4 h-4" />
                    </div>
                    <p className="text-sm text-text-primary font-medium">Replied to 3 emails from <span className="font-semibold">Marketing Team</span></p>
                  </div>
                </div>
              </div>

            </div>
          </section>
        </div>
      </div>

      {/* Floating FAB */}
      <div className="absolute bottom-8 right-8 z-30 group">
        <button className="w-14 h-14 rounded-full bg-primary text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-105 transition-all duration-300 flex items-center justify-center">
          <Sparkles className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
