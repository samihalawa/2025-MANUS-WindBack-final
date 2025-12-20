import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/_core/hooks/useAuth";
import { PremiumPaywall } from "@/components/PremiumPaywall";
import { usePageMeta } from "@/hooks/usePageMeta";
import { seoPages } from "@/lib/seoMeta";
import { 
  Search, 
  Monitor, 
  Mic, 
  MessageSquare, 
  ChevronRight, 
  Download, 
  ShieldCheck, 
  Bookmark, 
  ExternalLink,
  Play,
  Pause,
  Clock,
  Settings,
  X,
  Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockMoments, appIcons, type Moment } from "@/lib/mockData";
import { Link } from "wouter";

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();
  usePageMeta(seoPages.app);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMoment, setSelectedMoment] = useState<Moment>(mockMoments[0]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchType, setSearchType] = useState<'screens' | 'audio' | 'both'>('both');
  const [isAskOpen, setIsAskOpen] = useState(false);
  const [askQuery, setAskQuery] = useState("");
  const [showPaywall, setShowPaywall] = useState(true);
  const timelineRef = useRef<HTMLDivElement>(null);

  const toggleAsk = () => setIsAskOpen(!isAskOpen);

  // Handle Search Logic
  const filteredMoments = useMemo(() => {
    if (!searchQuery) return mockMoments;
    return mockMoments.filter(m => 
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.ocrText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.app.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }, [searchQuery]);

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <PremiumPaywall
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
        onUpgrade={() => setShowPaywall(false)}
      />
      <div className="h-screen flex flex-col bg-[#0a0a0b] text-white overflow-hidden font-sans">
      {/* Top Navigation / Search Bar */}
      <header className="z-40 px-6 py-4 flex flex-col space-y-4 bg-gradient-to-b from-black/60 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
                <span className="text-white font-bold text-xl">✦</span>
              </div>
            </Link>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-primary transition-colors" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search anything you've seen, said, or heard..."
                className="w-[400px] lg:w-[600px] bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 focus:bg-white/10 focus:border-primary/50 outline-none transition-all text-sm font-medium"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant={searchType === 'screens' ? 'default' : 'ghost'}
              size="icon"
              className="w-10 h-10 rounded-xl"
              onClick={() => setSearchType('screens')}
            >
              <Monitor className="w-4 h-4" />
            </Button>
            <Button
              variant={searchType === 'audio' ? 'default' : 'ghost'}
              size="icon"
              className="w-10 h-10 rounded-xl"
              onClick={() => setSearchType('audio')}
            >
              <Mic className="w-4 h-4" />
            </Button>
            <Button
              variant={searchType === 'both' ? 'default' : 'ghost'}
              size="icon"
              className="w-10 h-10 rounded-xl"
              onClick={() => setSearchType('both')}
            >
              <div className="flex -space-x-1">
                <Monitor className="w-3 h-3" />
                <Mic className="w-3 h-3" />
              </div>
            </Button>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar">
          {['All', 'Chrome', 'Slack', 'VS Code', 'Zoom', 'Safari'].map((app) => (
            <Button
              key={app}
              variant="secondary"
              size="sm"
              className="rounded-full px-4 py-1 h-8 bg-muted/50 hover:bg-muted border-white/5 text-xs font-medium transition-all"
            >
              {app}
            </Button>
          ))}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative flex items-center justify-center p-8 overflow-hidden">
        <AnimatePresence mode="wait">
          {isSearching ? (
            <motion.div
              key="search-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-6xl h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pr-4 custom-scrollbar"
            >
              {filteredMoments.map((moment) => (
                <div
                  key={moment.id}
                  onClick={() => {
                    setSelectedMoment(moment);
                    setIsSearching(false);
                    setSearchQuery("");
                  }}
                  className="group relative aspect-video bg-card rounded-xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all cursor-pointer shadow-lg"
                >
                  <img src={moment.screenshotUrl} alt={moment.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex flex-col justify-end">
                    <div className="flex items-center space-x-2 mb-1">
                      <img src={appIcons[moment.app]} className="w-4 h-4" alt={moment.app} />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/60">{moment.app}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-white truncate">{moment.title}</h3>
                    <p className="text-[10px] text-white/40 mt-1">{formatTime(moment.timestamp)}</p>
                    {moment.transcript && (
                      <div className="mt-2 flex items-center space-x-1 text-[10px] text-primary">
                        <Mic className="w-3 h-3" />
                        <span className="truncate">Audio Transcript Available</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="live-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="relative w-full max-w-5xl aspect-video glass-panel rounded-2xl overflow-hidden group"
            >
              <img
                src={selectedMoment.screenshotUrl}
                alt={selectedMoment.title}
                className="w-full h-full object-cover"
              />
              
              {/* Overlay Metadata */}
              <div className="absolute top-4 left-4 flex items-center space-x-3 bg-black/40 backdrop-blur-md px-3 py-2 rounded-lg border border-white/10">
                <img src={appIcons[selectedMoment.app]} className="w-5 h-5" alt={selectedMoment.app} />
                <div>
                  <h2 className="text-xs font-bold text-white">{selectedMoment.title}</h2>
                  <p className="text-[10px] text-white/60">{formatTime(selectedMoment.timestamp)}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="icon" variant="secondary" className="w-8 h-8 rounded-lg bg-black/40 backdrop-blur-md border-white/10">
                  <Bookmark className="w-4 h-4" />
                </Button>
                {selectedMoment.url && (
                  <Button size="icon" variant="secondary" className="w-8 h-8 rounded-lg bg-black/40 backdrop-blur-md border-white/10" onClick={() => window.open(selectedMoment.url, '_blank')}>
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                )}
                <Button 
                  size="icon" 
                  variant={isAskOpen ? "default" : "secondary"} 
                  className={`w-8 h-8 rounded-lg backdrop-blur-md border-white/10 ${isAskOpen ? 'bg-primary' : 'bg-black/40'}`}
                  onClick={toggleAsk}
                >
                  <MessageSquare className="w-4 h-4" />
                </Button>
              </div>

              {/* OCR / Transcript Snippet Overlay */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-lg bg-black/60 backdrop-blur-xl p-4 rounded-xl border border-white/10 text-center opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                <p className="text-xs text-white/80 italic">
                  "{selectedMoment.ocrText.substring(0, 120)}..."
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ask Rewind Side Panel */}
        <AnimatePresence>
          {isAskOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-96 bg-[#161618] border-l border-white/10 z-50 flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                    <span className="text-white text-xs">✦</span>
                  </div>
                  <h2 className="font-bold text-sm">Ask Rewind</h2>
                </div>
                <Button variant="ghost" size="icon" onClick={toggleAsk} className="w-8 h-8">
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Suggested</p>
                  <div className="space-y-2">
                    {[
                      "What did I discuss in the Project Alpha meeting?",
                      "Find the link Sami sent me on Slack",
                      "Summarize my morning activity",
                      "When did I last visit the Rewind website?"
                    ].map((q, i) => (
                      <button 
                        key={i}
                        onClick={() => setAskQuery(q)}
                        className="w-full text-left p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all text-xs text-white/80"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
                  <p className="text-xs text-primary-foreground/80 leading-relaxed">
                    I can help you find anything you've seen, said, or heard. Just ask me a question about your past activity.
                  </p>
                </div>
              </div>

              <div className="p-6 border-t border-white/10">
                <div className="relative">
                  <input 
                    type="text"
                    value={askQuery}
                    onChange={(e) => setAskQuery(e.target.value)}
                    placeholder="Ask anything..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 outline-none focus:border-primary/50 transition-all text-sm"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-lg flex items-center justify-center hover:opacity-90 transition-opacity">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Timeline Scrubber */}
      <footer className="h-32 bg-black/40 backdrop-blur-xl border-t border-white/5 px-8 flex flex-col justify-center">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <Play className="w-4 h-4" />
            </Button>
            <div className="flex items-center space-x-2 text-[10px] font-bold text-white/40">
              <Clock className="w-3 h-3" />
              <span>LIVE</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold text-white/60">PENDANT SYNCED</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-3 h-3 text-primary" />
              <span className="text-[10px] font-bold text-white/60">PRIVACY VAULT ACTIVE</span>
            </div>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div 
          ref={timelineRef}
          className="relative h-12 bg-white/5 rounded-xl border border-white/5 overflow-hidden cursor-pointer group"
        >
          {/* Timeline Markers */}
          <div className="absolute inset-0 flex items-center px-4 space-x-8">
            {mockMoments.map((m, i) => (
              <div 
                key={m.id}
                onClick={() => setSelectedMoment(m)}
                className={`relative flex flex-col items-center group/marker transition-all ${selectedMoment.id === m.id ? 'scale-110' : 'opacity-40 hover:opacity-100'}`}
              >
                <img src={appIcons[m.app]} className="w-4 h-4 mb-1" alt={m.app} />
                <div className={`w-0.5 h-3 rounded-full ${m.transcript ? 'bg-primary' : 'bg-white/20'}`} />
                <span className="absolute -bottom-5 text-[8px] font-bold whitespace-nowrap">{formatTime(m.timestamp)}</span>
              </div>
            ))}
          </div>

          {/* Scrubber Handle */}
          <div className="absolute top-0 bottom-0 w-0.5 bg-primary shadow-[0_0_15px_rgba(59,130,246,0.5)] z-10 transition-all duration-300" style={{ left: '10%' }} />
        </div>
      </footer>
      </div>
    </>
  );
}
