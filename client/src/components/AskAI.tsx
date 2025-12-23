import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '@/types/dashboard';
import { Bot, User, Lock, PlayCircle, PlusCircle, ArrowUp, Search, MoreHorizontal, Zap, Clock } from 'lucide-react';

export function AskAI() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      content: "Good morning! I've indexed your latest meetings, including the Q4 Strategy Review and Design Sync. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: "Based on your recent meetings, I can help you find that information. The Q4 Strategy Review covered iOS widget development and the timeline for shipping by mid-July. Would you like me to provide more details?",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-full w-full bg-white overflow-hidden flex-col">
      {/* Header */}
      <header className="h-16 shrink-0 flex items-center justify-between px-6 border-b border-gray-100 bg-white/80 backdrop-blur-md z-20 sticky top-0">
        <div className="flex items-center gap-3">
          <span className="text-[16px] font-bold text-text-primary tracking-tight">Ask AI</span>
          <span className="px-2 py-0.5 rounded-full bg-gray-100 text-[10px] font-medium text-text-tertiary border border-gray-200 flex items-center gap-1">
            <Lock className="w-3 h-3" /> Private
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-text-secondary transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-text-secondary transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-48 scroll-smooth bg-white">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          <div className="flex justify-center sticky top-0 z-10 py-2">
            <span className="text-[11px] font-medium text-text-secondary bg-white/90 backdrop-blur px-3 py-1 rounded-full border border-gray-200 shadow-sm">Today, 10:23 AM</span>
          </div>

          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-4 group ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              {msg.role === 'model' ? (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 via-primary to-pink-500 shrink-0 flex items-center justify-center shadow-md border border-white">
                  <Bot className="text-white w-4 h-4" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border border-gray-200 flex items-center justify-center shrink-0 shadow-sm"></div>
              )}

              <div className={`p-4 rounded-2xl shadow-sm max-w-[85%] text-[15px] leading-relaxed font-medium ${
                msg.role === 'model'
                  ? 'bg-white border border-gray-200 text-text-primary rounded-tl-sm'
                  : 'bg-primary text-white rounded-tr-sm shadow-md shadow-primary/20'
              }`}>
                {msg.role === 'model' && (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[13px] font-semibold text-text-primary">AI Assistant</span>
                  </div>
                )}
                <p className="whitespace-pre-wrap">{msg.content}</p>

                {/* Mock Source Card for AI */}
                {msg.role === 'model' && msg.content.length > 50 && (
                  <div className="bg-white border border-gray-200 rounded-xl p-3 flex gap-4 hover:border-primary/30 transition-all cursor-pointer mt-4 group/card hover:shadow-md">
                    <div className="bg-center bg-no-repeat bg-cover rounded-lg w-24 h-16 shrink-0 relative overflow-hidden ring-1 ring-black/5" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&w=300&q=80")' }}>
                      <div className="absolute inset-0 bg-black/10 flex items-center justify-center group-hover/card:bg-black/20 transition-colors">
                        <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm backdrop-blur-sm">
                          <PlayCircle className="text-black w-5 h-5 ml-0.5" />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center flex-1 min-w-0 gap-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-[13px] font-bold text-text-primary truncate group-hover/card:text-primary transition-colors">Q4 Strategy Meeting</h4>
                        <span className="text-[10px] font-medium text-text-secondary bg-gray-100 px-1.5 py-0.5 rounded">Tuesday</span>
                      </div>
                      <p className="text-[12px] text-text-secondary italic line-clamp-2 pl-2 border-l-2 border-primary/40">"Team aligned on shipping iOS widget by mid-July..."</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-4 group">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 via-primary to-pink-500 shrink-0 flex items-center justify-center shadow-md">
                <Bot className="text-white w-4 h-4" />
              </div>
              <div className="bg-white p-4 rounded-2xl rounded-tl-sm border border-gray-200 shadow-sm">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
      <div className="absolute bottom-0 left-0 w-full px-4 md:px-6 pb-6 pt-12 bg-gradient-to-t from-white via-white/80 to-transparent z-20 pointer-events-none">
        <div className="max-w-3xl mx-auto pointer-events-auto flex flex-col gap-3">
          {/* Quick Actions */}
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            <button className="whitespace-nowrap px-3 py-1.5 rounded-full bg-white/80 backdrop-blur border border-gray-200 text-[11px] font-medium text-text-secondary hover:text-primary hover:border-primary/30 hover:bg-white transition-all flex items-center gap-1.5 shadow-sm">
              <Zap className="w-3.5 h-3.5 text-primary" /> Summarize this week
            </button>
            <button className="whitespace-nowrap px-3 py-1.5 rounded-full bg-white/80 backdrop-blur border border-gray-200 text-[11px] font-medium text-text-secondary hover:text-primary hover:border-primary/30 hover:bg-white transition-all flex items-center gap-1.5 shadow-sm">
              <Clock className="w-3.5 h-3.5 text-primary" /> Yesterday's recap
            </button>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-2 border border-gray-200 shadow-2xl relative ring-4 ring-gray-50 focus-within:ring-primary/10 transition-all">
            <div className="flex flex-col">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent border-none text-text-primary placeholder-text-tertiary text-[15px] resize-none focus:ring-0 p-4 max-h-32 min-h-[52px] outline-none font-medium"
                placeholder="Ask anything about your meetings, screen, or mics..."
                rows={1}
              ></textarea>
              <div className="flex items-center justify-between px-2 pb-2">
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-xl text-text-tertiary hover:bg-gray-100 transition-colors">
                    <PlusCircle className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-text-tertiary font-semibold hidden sm:block tracking-wide">CMD + ENTER</span>
                  <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="w-10 h-10 rounded-xl bg-primary hover:bg-primary-hover text-white flex items-center justify-center disabled:opacity-50 transition-all shadow-md shadow-primary/20"
                  >
                    <ArrowUp className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center text-[10px] text-text-tertiary font-medium">AI can make mistakes. Verify important information.</p>
        </div>
      </div>
    </div>
  );
}
