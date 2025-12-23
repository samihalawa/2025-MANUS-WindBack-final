export interface Meeting {
  id: string;
  title: string;
  date: Date;
  duration: string;
  platform: 'Zoom' | 'Teams' | 'Meet' | 'In-Person';
  summary: string;
  participants: string[];
  notes: string[];
  transcript: TranscriptEntry[];
  prep: string;
}

export interface TranscriptEntry {
  speaker: string;
  text: string;
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

export interface TimelineEvent {
  id: string;
  time: string;
  appName: string;
  windowTitle: string;
  screenshotUrl: string;
  duration?: number;
}

export interface DashboardStats {
  recordingTime: string;
  actionItems: number;
  actionItemsHigh: number;
  meetings: number;
  nextMeeting?: string;
}

export enum View {
  DASHBOARD = 'DASHBOARD',
  MEETINGS = 'MEETINGS',
  REWIND = 'REWIND',
  ASK_AI = 'ASK_AI',
  SETTINGS = 'SETTINGS',
  PENDANT = 'PENDANT',
  MEETING_DETAIL = 'MEETING_DETAIL'
}
