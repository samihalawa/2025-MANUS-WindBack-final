import { useState } from 'react';
import { useAuth } from '@/_core/hooks/useAuth';
import { getLoginUrl } from '@/const';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar, Zap, Sparkles, Plus, History, Search, MessageSquare } from 'lucide-react';

interface Meeting {
  id: string;
  title: string;
  time: string;
  duration: string;
  platform: string;
  avatarUrls: string[];
}

const MOCK_MEETINGS: Meeting[] = [
  {
    id: '1',
    title: 'Q4 Product Roadmap',
    time: '10:00 AM',
    duration: '1h 30m',
    platform: 'Zoom',
    avatarUrls: ['https://api.dicebear.com/7.x/avataaars/svg?seed=1', 'https://api.dicebear.com/7.x/avataaars/svg?seed=2'],
  },
  {
    id: '2',
    title: 'Engineering Standup',
    time: '9:00 AM',
    duration: '30m',
    platform: 'Teams',
    avatarUrls: ['https://api.dicebear.com/7.x/avataaars/svg?seed=3'],
  },
  {
    id: '3',
    title: 'Client Presentation',
    time: 'Yesterday, 2:00 PM',
    duration: '1h',
    platform: 'Zoom',
    avatarUrls: ['https://api.dicebear.com/7.x/avataaars/svg?seed=4', 'https://api.dicebear.com/7.x/avataaars/svg?seed=5'],
  },
];

interface QuickActionProps {
  icon: React.ReactNode;
  label: string;
  sub: string;
  onClick: () => void;
  color: string;
  bg: string;
}

const QuickAction: React.FC<QuickActionProps> = ({ icon, label, sub, onClick, color, bg }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-4 rounded-[1.75rem] bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group active:scale-95`}
  >
    <div className={`size-12 rounded-2xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110 ${bg} ${color}`}>
      {icon}
    </div>
    <span className="text-[13px] font-bold text-gray-900 dark:text-white">{label}</span>
    <span className="text-[10px] font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mt-0.5">{sub}</span>
  </button>
);

export default function MarketingHomeView() {
  const { user, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const [isRecording, setIsRecording] = useState(false);

  // 如果已登录，重定向到应用
  if (isAuthenticated && user) {
    navigate("/app/dashboard");
    return null;
  }

  const handleStartRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d0b12] transition-colors">
      {/* Header */}
      <header className="h-20 flex items-center justify-between px-6 md:px-10 border-b border-gray-200 dark:border-white/5 bg-white/80 dark:bg-[#0d0b12]/80 backdrop-blur-2xl sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">W</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">WindBack</h1>
            <p className="text-[10px] text-gray-600 dark:text-gray-400 font-semibold uppercase tracking-widest">AI Memory</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{user?.name}</span>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">Dashboard</Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Button
              variant="outline"
              className="border-gray-300 dark:border-white/20"
              onClick={() => (window.location.href = getLoginUrl())}
            >
              Sign In
            </Button>
              <Button
                onClick={() => (window.location.href = getLoginUrl())}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Get Started
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-6 md:px-10 pb-32">
        <div className="max-w-6xl mx-auto flex flex-col gap-8 py-8">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              className="block w-full pl-12 pr-4 py-4 bg-white dark:bg-[#1c1c1e] border border-gray-300 dark:border-white/10 rounded-2xl text-sm font-medium text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all shadow-sm"
              placeholder="Ask WindBack to recall something or search meetings..."
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <div className="absolute inset-y-0 right-2 flex items-center gap-2">
              <div className="hidden md:flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-100 dark:bg-white/10 text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                <span className="text-xs">⌘</span> K
              </div>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <QuickAction
              icon={<History className="w-6 h-6" />}
              label="Rewind 1h"
              sub="Quick Look"
              onClick={() => {}}
              color="text-blue-500"
              bg="bg-blue-500/10"
            />
            <QuickAction
              icon={<Sparkles className="w-6 h-6" />}
              label="Ask AI"
              sub="Deep Context"
              onClick={() => {}}
              color="text-purple-600"
              bg="bg-purple-600/10"
            />
            <QuickAction
              icon={<Zap className="w-6 h-6" />}
              label="Summarize"
              sub="Last Meeting"
              onClick={() => {}}
              color="text-orange-500"
              bg="bg-orange-500/10"
            />
            <QuickAction
              icon={<Plus className="w-6 h-6" />}
              label="New Note"
              sub="Capture Thought"
              onClick={() => {}}
              color="text-green-500"
              bg="bg-green-500/10"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              {/* Featured Memory */}
              <section className="relative group cursor-pointer">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-[2.5rem] blur-xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative h-[320px] rounded-[2rem] overflow-hidden border border-white/40 dark:border-white/10 shadow-lg bg-slate-950">
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-[2s] ease-out"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop')",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-8 w-full flex flex-col justify-end">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-purple-600/20 backdrop-blur-xl text-purple-400 text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border border-purple-600/30 shadow-lg">
                        Highlight
                      </span>
                      <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" /> Today, 10:00 AM
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight group-hover:text-purple-400 transition-colors">
                      {MOCK_MEETINGS[0].title}
                    </h3>
                    <p className="text-slate-300 text-sm font-medium leading-relaxed line-clamp-2 max-w-xl opacity-90">
                      WindBack identified key priorities for Q4. Action items generated for Sarah regarding auth refactor.
                    </p>
                  </div>
                </div>
              </section>

              {/* Recent Activity List */}
              <section className="flex flex-col gap-5">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-[11px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest">Recent Activity</h3>
                  <button className="text-purple-600 text-[11px] font-bold uppercase tracking-widest hover:underline flex items-center gap-1">
                    View All <span>→</span>
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  {MOCK_MEETINGS.slice(1).map((meeting) => (
                    <div
                      key={meeting.id}
                      className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-[1.5rem] p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-white/10 hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="size-12 rounded-2xl bg-gray-100 dark:bg-white/10 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                          {meeting.platform === 'Zoom' ? (
                            <MessageSquare className="w-6 h-6" />
                          ) : (
                            <Search className="w-6 h-6" />
                          )}
                        </div>
                        <div className="text-left">
                          <h4 className="font-bold text-[15px] text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors">
                            {meeting.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1 text-gray-600 dark:text-gray-400 text-[11px] font-semibold">
                            <span>{meeting.time}</span>
                            <span className="w-0.5 h-0.5 bg-gray-400 rounded-full"></span>
                            <span>{meeting.duration}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex -space-x-2 pr-2 opacity-60 group-hover:opacity-100 transition-opacity">
                        {meeting.avatarUrls.map((url, i) => (
                          <div
                            key={i}
                            className="size-8 rounded-full border-2 border-white dark:border-[#0d0b12] bg-cover bg-center"
                            style={{ backgroundImage: `url('${url}')` }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar Widgets */}
            <div className="flex flex-col gap-6">
              <Card className="bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 p-6 rounded-[2rem]">
                <h3 className="text-[11px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-6">
                  Daily Memory
                </h3>
                <div className="flex flex-col gap-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Listening Time</span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">2h 45m</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-600" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Meetings Processed</span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">3 Sessions</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Context Stored</span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">128 MB</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-white/5">
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400 text-xs font-medium">
                    <span>✓</span>
                    <span>Local-first vault active</span>
                  </div>
                </div>
              </Card>

              <div className="bg-gradient-to-br from-purple-600/5 to-blue-600/5 border border-purple-600/10 p-6 rounded-[2rem] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                  <Sparkles className="w-20 h-20 text-purple-600" />
                </div>
                <h3 className="text-[11px] font-bold text-purple-600 uppercase tracking-widest mb-2">AI Suggestion</h3>
                <p className="text-sm font-semibold text-gray-900 dark:text-white leading-relaxed mb-4 relative z-10">
                  "You seemed to have a blocker regarding the <span className="text-purple-600 underline decoration-purple-600/30">Backend Migration</span>. Should I draft a follow-up email to Mike?"
                </p>
                <button className="text-[11px] font-bold bg-white dark:bg-white/10 text-gray-900 dark:text-white px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95">
                  Draft Email
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button - Recording Toggle */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
        <button
          onClick={() => setIsRecording(!isRecording)}
          className={`h-14 px-8 rounded-full text-white font-bold text-[13px] uppercase tracking-widest shadow-2xl flex items-center gap-3 transition-all hover:scale-105 active:scale-95 ${
            isRecording
              ? 'bg-red-500 shadow-red-500/30 hover:shadow-red-500/50'
              : 'bg-gray-900 dark:bg-white dark:text-black shadow-black/20 dark:shadow-white/20 hover:shadow-black/40'
          }`}
        >
          <div className="relative flex size-2.5">
            {isRecording && (
              <>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full size-2.5 bg-white"></span>
              </>
            )}
          </div>
          {isRecording ? 'Stop Capture' : 'Start Capture'}
        </button>
      </div>
    </div>
  );
}
