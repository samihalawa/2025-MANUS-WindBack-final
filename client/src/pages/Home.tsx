import { useState, useEffect, useRef, useCallback } from "react";
import { Search, Clock, Filter, Bookmark, ExternalLink, Play, Pause, ChevronLeft, ChevronRight, MessageSquare, Mic, Monitor, Settings, X, Send, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { mockMoments, appIcons, Moment } from "@/lib/mockData";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMoment, setSelectedMoment] = useState<Moment>(mockMoments[0]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchType, setSearchType] = useState<'screens' | 'audio' | 'both'>('both');
  const [isAskPanelOpen, setIsAskPanelOpen] = useState(false);
  const [askQuery, setAskQuery] = useState("");
  const [filteredMoments, setFilteredMoments] = useState(mockMoments);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Handle Search Logic
  useEffect(() => {
    if (searchQuery) {
      setIsSearching(true);
      const filtered = mockMoments.filter(m => {
        const matchesText = m.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           m.ocrText.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           m.app.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesAudio = m.transcript?.toLowerCase().includes(searchQuery.toLowerCase());
        
        if (searchType === 'screens') return matchesText;
        if (searchType === 'audio') return matchesAudio;
        return matchesText || matchesAudio;
      });
      setFilteredMoments(filtered);
    } else {
      setIsSearching(false);
      setFilteredMoments(mockMoments);
    }
  }, [searchQuery, searchType]);

  // Handle Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.shiftKey) {
        if (e.key === ' ') { // Cmd+Shift+Space
          e.preventDefault();
          setIsSearching(true);
          toast.info("Opening last search...");
        } else if (e.key === '/') { // Cmd+Shift+/
          e.preventDefault();
          setIsAskPanelOpen(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle Timeline Scroll (Gesture-based)
  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (timelineRef.current) {
      timelineRef.current.scrollLeft += e.deltaY;
    }
  }, []);

  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-background text-foreground flex flex-col font-sans" onWheel={handleWheel}>
      {/* Top Search Header */}
      <header className="z-50 p-6 flex flex-col items-center justify-center space-y-4">
        <div className="relative w-full max-w-2xl group flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              type="text"
              placeholder="Search anything you've seen, said, or heard..."
              className="w-full h-14 pl-12 pr-4 bg-card/50 border-white/10 rounded-2xl text-lg focus:ring-2 focus:ring-primary/50 transition-all backdrop-blur-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Content Picker */}
          <div className="flex bg-card/50 border border-white/10 rounded-2xl p-1 backdrop-blur-md">
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
              </div>

              {/* OCR / Transcript Snippet Overlay */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-lg bg-black/60 backdrop-blur-xl p-4 rounded-xl border border-white/10 text-center opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                <p className="text-xs text-white/80 italic">
                  {selectedMoment.transcript ? `"${selectedMoment.transcript}"` : `"${selectedMoment.ocrText}"`}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ask Rewind Panel */}
        <AnimatePresence>
          {isAskPanelOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 bottom-0 w-96 bg-card/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl z-[60] flex flex-col"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  <h2 className="text-sm font-bold uppercase tracking-widest">Ask Rewind</h2>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsAskPanelOpen(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex-1 p-6 overflow-y-auto space-y-6 custom-scrollbar">
                <div className="bg-muted/30 p-4 rounded-xl border border-white/5">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Ask me anything about what you've seen, said, or heard. For example:
                  </p>
                  <ul className="mt-3 space-y-2">
                    {['"What did Sami say in the sync?"', '"Find the index.css code I wrote"', '"When did I visit apple.com?"'].map((q) => (
                      <li key={q} className="text-[10px] text-primary hover:underline cursor-pointer" onClick={() => setAskQuery(q)}>
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-6 border-t border-white/5">
                <div className="relative">
                  <Input
                    placeholder="Ask a question..."
                    className="bg-background/50 border-white/10 rounded-xl pr-12"
                    value={askQuery}
                    onChange={(e) => setAskQuery(e.target.value)}
                  />
                  <Button size="icon" variant="default" className="absolute right-1 top-1 w-8 h-8 rounded-lg">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Timeline Scrubber */}
      <footer className="h-32 bg-card/30 backdrop-blur-2xl border-t border-white/5 flex flex-col">
        <div className="flex-1 relative overflow-hidden">
          <div 
            ref={timelineRef} 
            className="flex items-end h-full px-[50vw] space-x-8 pb-6 overflow-x-auto no-scrollbar scroll-smooth"
          >
            {mockMoments.map((moment) => (
              <div
                key={moment.id}
                onClick={() => setSelectedMoment(moment)}
                className="flex flex-col items-center space-y-2 cursor-pointer group shrink-0"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${selectedMoment.id === moment.id ? 'bg-primary shadow-[0_0_20px_rgba(101,163,250,0.4)] scale-110' : 'bg-muted/50 hover:bg-muted'}`}>
                  <img src={appIcons[moment.app]} className="w-5 h-5" alt={moment.app} />
                </div>
                <div className={`timeline-marker ${selectedMoment.id === moment.id ? 'timeline-marker-active' : ''} ${moment.type === 'meeting' ? 'bg-purple-500' : ''}`} />
                <span className={`text-[10px] font-medium transition-colors ${selectedMoment.id === moment.id ? 'text-primary' : 'text-muted-foreground'}`}>
                  {formatTime(moment.timestamp)}
                </span>
              </div>
            ))}
            {/* Fillers for visual continuity */}
            {[...Array(20)].map((_, i) => (
              <div key={`filler-${i}`} className="flex flex-col items-center space-y-2 opacity-20 shrink-0">
                <div className="w-10 h-10" />
                <div className="timeline-marker" />
                <div className="h-4" />
              </div>
            ))}
          </div>
          
          {/* Center Indicator */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/50 -translate-x-1/2 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary" />
          </div>
        </div>
        
        {/* Playback Controls */}
        <div className="h-10 flex items-center justify-between px-6 bg-black/20">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="w-6 h-6 text-muted-foreground hover:text-foreground">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="w-8 h-8 text-foreground">
              <Play className="w-5 h-5 fill-current" />
            </Button>
            <Button variant="ghost" size="icon" className="w-6 h-6 text-muted-foreground hover:text-foreground">
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className={`w-8 h-8 ${isAskPanelOpen ? 'text-primary' : 'text-muted-foreground'}`}
              onClick={() => setIsAskPanelOpen(!isAskPanelOpen)}
            >
              <MessageSquare className="w-5 h-5" />
            </Button>
          </div>
          <div className="flex items-center space-x-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-primary/80">
                <Shield className="w-3 h-3" />
                <span>Privacy Vault Active</span>
              </div>
              <div className="flex items-center space-x-1 text-purple-400">
                <Mic className="w-3 h-3" />
                <span>Pendant Synced</span>
              </div>
              <div className="flex items-center space-x-2 group cursor-pointer">
                <Settings className="w-3 h-3 group-hover:rotate-90 transition-transform" />
                <span>Settings</span>
              </div>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <span>Recording Active</span>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="ml-4">1.2 TB Free</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
