export interface Moment {
  id: string;
  timestamp: string;
  app: string;
  title: string;
  url?: string;
  screenshotUrl: string;
  ocrText: string;
  type: 'web' | 'app' | 'meeting';
}

export const mockMoments: Moment[] = [
  {
    id: '1',
    timestamp: '2025-12-19T09:00:00Z',
    app: 'Slack',
    title: 'Project Alpha - General Channel',
    screenshotUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    ocrText: 'Hey team, let\'s finalize the design for the new dashboard by EOD.',
    type: 'app'
  },
  {
    id: '2',
    timestamp: '2025-12-19T09:15:00Z',
    app: 'Chrome',
    title: 'Rewind.ai - The Search Engine for Your Life',
    url: 'https://www.rewind.ai',
    screenshotUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    ocrText: 'Rewind is a personalized AI powered by everything you’ve seen, said, or heard.',
    type: 'web'
  },
  {
    id: '3',
    timestamp: '2025-12-19T10:00:00Z',
    app: 'Zoom',
    title: 'Weekly Sync Meeting',
    screenshotUrl: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&w=800&q=80',
    ocrText: 'Discussing the Q4 roadmap and resource allocation.',
    type: 'meeting'
  },
  {
    id: '4',
    timestamp: '2025-12-19T10:30:00Z',
    app: 'VS Code',
    title: 'rewind-clone-ui - index.css',
    screenshotUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80',
    ocrText: '@import "tailwindcss"; @theme inline { --background: oklch(0.12 0.01 285); }',
    type: 'app'
  },
  {
    id: '5',
    timestamp: '2025-12-19T11:00:00Z',
    app: 'Safari',
    title: 'Apple - MacBook Pro',
    url: 'https://www.apple.com/macbook-pro',
    screenshotUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    ocrText: 'The new MacBook Pro. Supercharged by M3 Pro and M3 Max.',
    type: 'web'
  }
];

export const appIcons: Record<string, string> = {
  Slack: 'https://cdn.simpleicons.org/slack/white',
  Chrome: 'https://cdn.simpleicons.org/googlechrome/white',
  Zoom: 'https://cdn.simpleicons.org/zoom/white',
  'VS Code': 'https://cdn.simpleicons.org/visualstudiocode/white',
  Safari: 'https://cdn.simpleicons.org/safari/white'
};
