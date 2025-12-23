import { Meeting, DashboardStats, TimelineEvent } from '@/types/dashboard';

export const MOCK_MEETINGS: Meeting[] = [
  {
    id: '1',
    title: 'Q4 Strategy Review',
    date: new Date('2025-12-19T10:00:00'),
    duration: '45m',
    platform: 'Zoom',
    summary: 'The team aligned on shipping the new iOS widget by mid-July. Marketing requested a 2-week lead time for assets. Engineering will prioritize the mobile experience.',
    participants: ['Sarah Chen', 'Alex Martinez', 'Jordan Kim'],
    notes: [
      'Action: Update project timeline in Asana',
      'Action: Schedule follow-up with design team',
      'Decision: Postpone dark mode to Q1',
      'Decision: Focus on mobile-first approach'
    ],
    transcript: [
      {
        speaker: 'Sarah',
        text: 'Good morning everyone! Thanks for joining. Let\'s dive into the Q4 priorities.',
        timestamp: '00:00'
      },
      {
        speaker: 'Alex',
        text: 'I think we should focus on the iOS widget first. It\'s been requested by many users.',
        timestamp: '00:45'
      },
      {
        speaker: 'Jordan',
        text: 'Agreed. We can ship that by mid-July if we start next week.',
        timestamp: '01:15'
      }
    ],
    prep: 'Last discussion was about mobile redesign. Engineering estimates 3 sprints for iOS widget implementation.'
  },
  {
    id: '2',
    title: 'Design System Sync',
    date: new Date('2025-12-19T11:00:00'),
    duration: '1h 20m',
    platform: 'Zoom',
    summary: 'Reviewed typography scale updates and component library. Need to audit existing components for compatibility with new design tokens.',
    participants: ['Chris Lee', 'Morgan Taylor', 'Sam Rivera'],
    notes: [
      'Action: @Alex to update Figma library',
      'Action: Audit components for new typography',
      'Decision: Use 8px spacing scale',
      'Decision: Deprecate old button variants'
    ],
    transcript: [
      {
        speaker: 'Chris',
        text: 'Let\'s review the new typography scale. I\'ve updated the Figma file.',
        timestamp: '00:00'
      },
      {
        speaker: 'Morgan',
        text: 'Looks great! We should audit all components to ensure consistency.',
        timestamp: '02:30'
      }
    ],
    prep: 'Previous meeting established need for design system overhaul. Typography is the first phase.'
  },
  {
    id: '3',
    title: 'Product Roadmap Planning',
    date: new Date('2025-12-19T14:00:00'),
    duration: '30m',
    platform: 'Meet',
    summary: 'Prioritized features for next quarter. Focus on user engagement and retention metrics.',
    participants: ['Taylor Brown', 'Jamie White'],
    notes: [
      'Action: Draft PRD for analytics dashboard',
      'Action: Schedule user interviews',
      'Decision: Ship analytics by end of Q1'
    ],
    transcript: [
      {
        speaker: 'Taylor',
        text: 'We need better analytics to understand user behavior.',
        timestamp: '00:00'
      },
      {
        speaker: 'Jamie',
        text: 'I can draft a PRD by next week.',
        timestamp: '01:00'
      }
    ],
    prep: 'Analytics have been a recurring request in customer feedback.'
  }
];

export const DASHBOARD_STATS: DashboardStats = {
  recordingTime: '2h 45m',
  actionItems: 5,
  actionItemsHigh: 2,
  meetings: 3,
  nextMeeting: 'Product Sync in 20m'
};

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: '1',
    time: '10:00 AM',
    appName: 'Zoom',
    windowTitle: 'Design System Sync',
    screenshotUrl: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '2',
    time: '11:15 AM',
    appName: 'VS Code',
    windowTitle: 'Deep Work',
    screenshotUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    time: '12:45 PM',
    appName: 'Gmail',
    windowTitle: 'Replied to 3 emails',
    screenshotUrl: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=800&q=80'
  }
];

export function generateTimeline(): TimelineEvent[] {
  const apps = ['Chrome', 'VS Code', 'Figma', 'Slack', 'Zoom', 'Safari', 'Arc'];
  const screenshots = [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=800&q=80'
  ];

  return Array.from({ length: 100 }, (_, i) => {
    const hour = 9 + Math.floor(i / 4);
    const minute = (i % 4) * 15;
    return {
      id: `event-${i}`,
      time: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
      appName: apps[Math.floor(Math.random() * apps.length)],
      windowTitle: `Activity ${i + 1}`,
      screenshotUrl: screenshots[Math.floor(Math.random() * screenshots.length)]
    };
  });
}
