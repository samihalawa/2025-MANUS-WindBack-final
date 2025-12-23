import React, { useState } from 'react';
import { Meeting } from '@/types/dashboard';
import { ArrowLeft, Video, Calendar, Clock, Timer, Sparkles, CheckCircle2, Gavel, Share2, MoreHorizontal } from 'lucide-react';

interface MeetingDetailProps {
  meeting: Meeting;
  onBack: () => void;
}

enum Tab {
  SUMMARY = 'Summary',
  TRANSCRIPT = 'Transcript',
  NOTES = 'Notes'
}

export function MeetingDetail({ meeting, onBack }: MeetingDetailProps) {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.SUMMARY);

  return (
    <div className="flex flex-col h-full bg-[#f5f5f7] relative">
      {/* Header */}
      <header className="flex-shrink-0 border-b border-gray-200 bg-white/80 backdrop-blur-xl sticky top-0 z-20">
        <div className="flex flex-col px-8 py-5 gap-6">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-2 text-sm font-medium group"
            >
              <div className="p-1 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </div>
              Back to Meetings
            </button>
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex items-end justify-between gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{meeting.title}</h2>
              <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-gray-400" /> {meeting.date.toLocaleDateString()}
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-gray-400" /> 10:00 AM
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                <span className="flex items-center gap-1.5 bg-gray-100 px-2 py-0.5 rounded-md text-gray-700">
                  <Timer className="w-3.5 h-3.5" /> {meeting.duration}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-8 border-b border-gray-100 w-full mt-2">
            {[Tab.SUMMARY, Tab.TRANSCRIPT, Tab.NOTES].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-bold transition-all border-b-2 px-1 ${
                  activeTab === tab ? 'text-primary border-primary' : 'text-gray-400 border-transparent hover:text-gray-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden relative bg-[#f5f5f7]">
        {activeTab === Tab.SUMMARY && (
          <div className="flex-1 overflow-y-auto p-8 h-full">
            <div className="max-w-4xl mx-auto flex flex-col gap-6 pb-20 animate-scale-in">
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-soft">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> AI Overview
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg font-medium">{meeting.summary}</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-soft">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2 text-lg">
                      <CheckCircle2 className="text-green-500 w-5 h-5" /> Action Items
                    </h3>
                  </div>
                  <div className="flex flex-col gap-3">
                    {meeting.notes.filter(n => n.includes('Action')).map((note, i) => (
                      <label
                        key={i}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer bg-gray-50/50 border border-transparent hover:border-gray-200"
                      >
                        <input className="mt-1 rounded border-gray-300 text-primary focus:ring-primary w-4 h-4" type="checkbox" />
                        <p className="text-sm text-gray-700 font-medium leading-relaxed">{note}</p>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-soft">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2 text-lg">
                      <Gavel className="text-amber-500 w-5 h-5" /> Key Decisions
                    </h3>
                  </div>
                  <ul className="flex flex-col gap-4">
                    {meeting.notes.filter(n => n.includes('Decision')).map((note, i) => (
                      <li key={i} className="flex gap-3">
                        <div className="mt-2 w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0"></div>
                        <div>
                          <p className="text-sm text-gray-700 font-medium leading-relaxed">{note}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === Tab.TRANSCRIPT && (
          <div className="flex-1 overflow-y-auto px-8 py-8 pb-20 scroll-smooth bg-white h-full">
            <div className="max-w-3xl mx-auto flex flex-col gap-8">
              {meeting.transcript.map((t, i) => (
                <div
                  key={i}
                  className={`flex gap-5 p-5 rounded-2xl transition-all ${
                    i === 1 ? 'bg-primary/5 border border-primary/10 shadow-sm' : 'hover:bg-gray-50 border border-transparent'
                  }`}
                >
                  <div className="shrink-0 mt-1">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                        i === 1 ? 'bg-primary text-white shadow-md' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {t.speaker[0]}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 w-full">
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-bold text-gray-900">{t.speaker}</span>
                      <span className={`text-xs font-mono font-medium ${i === 1 ? 'text-primary' : 'text-gray-400'}`}>{t.timestamp}</span>
                    </div>
                    <p className={`text-base leading-relaxed ${i === 1 ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>{t.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === Tab.NOTES && (
          <div className="flex-1 overflow-y-auto p-8 h-full">
            <div className="max-w-4xl mx-auto flex flex-col gap-6 animate-scale-in">
              <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-soft">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="text-primary w-5 h-5" />
                  <h3 className="text-lg font-bold text-gray-900">AI Summary</h3>
                </div>
                <p className="text-gray-600 leading-relaxed font-medium">{meeting.summary}</p>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <section className="bg-white rounded-2xl p-6 border border-gray-100 shadow-soft border-l-4 border-l-green-500">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="text-green-500 w-5 h-5" />
                    <h3 className="text-base font-bold text-gray-900">Action Items</h3>
                  </div>
                  <ul className="space-y-3">
                    {meeting.notes.filter(n => n.includes('Action')).map((note, i) => (
                      <li key={i} className="flex gap-3 text-sm text-gray-700 font-medium">
                        <span className="bg-green-100 text-green-600 w-2 h-2 rounded-full mt-2 flex-shrink-0"></span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="bg-white rounded-2xl p-6 border border-gray-100 shadow-soft border-l-4 border-l-amber-500">
                  <div className="flex items-center gap-2 mb-4">
                    <Gavel className="text-amber-500 w-5 h-5" />
                    <h3 className="text-base font-bold text-gray-900">Decisions</h3>
                  </div>
                  <ul className="space-y-3">
                    {meeting.notes.filter(n => n.includes('Decision')).map((note, i) => (
                      <li key={i} className="flex gap-3 text-sm text-gray-700 font-medium">
                        <span className="bg-amber-100 text-amber-600 w-2 h-2 rounded-full mt-2 flex-shrink-0"></span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
