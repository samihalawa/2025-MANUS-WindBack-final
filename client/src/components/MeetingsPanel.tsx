import React, { useState } from 'react';
import { MOCK_MEETINGS } from '@/lib/dashboardMockData';
import { Meeting } from '@/types/dashboard';
import { Search, Radio, Video, User, Calendar, MoreHorizontal } from 'lucide-react';
import { MeetingDetail } from './MeetingDetail';

export function MeetingsPanel() {
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);

  if (selectedMeeting) {
    return <MeetingDetail meeting={selectedMeeting} onBack={() => setSelectedMeeting(null)} />;
  }

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden">
      {/* Header */}
      <header className="flex-none px-8 py-6 z-10 sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto w-full flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col gap-0.5">
              <h2 className="text-text-primary text-2xl font-bold tracking-tight">Meetings</h2>
              <p className="text-text-secondary text-sm">{MOCK_MEETINGS.length} Recordings</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative group w-64">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  className="h-9 w-full bg-gray-100 hover:bg-gray-200/70 focus:bg-white border border-transparent focus:border-primary/40 focus:ring-4 focus:ring-primary/10 text-text-primary text-sm rounded-lg pl-9 pr-4 outline-none transition-all placeholder:text-gray-500"
                  placeholder="Search..."
                  type="text"
                />
              </div>
              <button className="flex items-center justify-center gap-2 rounded-lg h-9 px-4 bg-primary hover:bg-primary-hover transition-all text-white text-sm font-medium shadow-sm active:scale-95">
                <Radio className="w-4 h-4" />
                <span>Record</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-8 pb-20 bg-gray-50/50">
        <div className="max-w-[1200px] mx-auto flex flex-col pt-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200">
                  <th className="px-6 py-3 text-gray-500 text-xs font-semibold uppercase tracking-wider w-[40%]">Context</th>
                  <th className="px-6 py-3 text-gray-500 text-xs font-semibold uppercase tracking-wider w-[15%]">Platform</th>
                  <th className="px-6 py-3 text-gray-500 text-xs font-semibold uppercase tracking-wider w-[15%]">Date</th>
                  <th className="px-6 py-3 text-gray-500 text-xs font-semibold uppercase tracking-wider w-[10%]">Duration</th>
                  <th className="px-6 py-3 w-[5%]"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {MOCK_MEETINGS.map((meeting) => (
                  <tr
                    key={meeting.id}
                    onClick={() => setSelectedMeeting(meeting)}
                    className="group hover:bg-blue-50/50 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <p className="text-text-primary text-sm font-semibold group-hover:text-blue-600 transition-colors">{meeting.title}</p>
                        <p className="text-text-secondary text-xs truncate max-w-[320px]">{meeting.summary}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-text-primary bg-white border border-gray-200 w-fit px-2 py-1 rounded-md text-xs font-medium shadow-sm">
                        {meeting.platform === 'Zoom' ? <Video className="w-3 h-3 text-blue-500" /> : <User className="w-3 h-3 text-orange-500" />}
                        {meeting.platform}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-text-secondary text-sm">
                        {meeting.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-text-secondary text-xs font-medium bg-gray-100 px-2 py-1 rounded-full">{meeting.duration}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1 rounded hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
