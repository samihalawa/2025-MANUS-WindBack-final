/**
 * Limitless API Client
 *
 * Supports switching between:
 * - Real Limitless API: https://api.limitless.ai/v1
 * - Local WindBack API: /api/limitless/v1
 *
 * Usage:
 *   import { limitlessApi, setLimitlessApiUrl, API_URLS } from './limitless-api';
 *
 *   // Switch to local API
 *   setLimitlessApiUrl(API_URLS.LOCAL);
 *
 *   // Switch to real Limitless API
 *   setLimitlessApiUrl(API_URLS.LIMITLESS, 'your-api-key');
 *
 *   // Fetch lifelogs
 *   const lifelogs = await limitlessApi.getLifelogs();
 */

export const API_URLS = {
  LOCAL: '/api/limitless/v1',
  LIMITLESS: 'https://api.limitless.ai/v1',
} as const;

type ApiUrlType = typeof API_URLS[keyof typeof API_URLS];

// Storage keys
const STORAGE_KEYS = {
  API_URL: 'limitless_api_url',
  API_KEY: 'limitless_api_key',
} as const;

// Get stored config
function getStoredConfig(): { apiUrl: ApiUrlType; apiKey: string | null } {
  if (typeof window === 'undefined') {
    return { apiUrl: API_URLS.LOCAL, apiKey: null };
  }

  const storedUrl = localStorage.getItem(STORAGE_KEYS.API_URL);
  const storedKey = localStorage.getItem(STORAGE_KEYS.API_KEY);

  return {
    apiUrl: (storedUrl === API_URLS.LIMITLESS ? API_URLS.LIMITLESS : API_URLS.LOCAL) as ApiUrlType,
    apiKey: storedKey,
  };
}

let config = getStoredConfig();

/**
 * Set the Limitless API URL and optionally the API key
 * @param url - API URL (use API_URLS constants)
 * @param apiKey - API key (required for real Limitless API)
 */
export function setLimitlessApiUrl(url: ApiUrlType, apiKey?: string): void {
  config.apiUrl = url;
  config.apiKey = apiKey || null;

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.API_URL, url);
    if (apiKey) {
      localStorage.setItem(STORAGE_KEYS.API_KEY, apiKey);
    } else {
      localStorage.removeItem(STORAGE_KEYS.API_KEY);
    }
  }
}

/**
 * Get the current API configuration
 */
export function getLimitlessApiConfig(): { apiUrl: ApiUrlType; isLocal: boolean; hasApiKey: boolean } {
  return {
    apiUrl: config.apiUrl,
    isLocal: config.apiUrl === API_URLS.LOCAL,
    hasApiKey: !!config.apiKey,
  };
}

// Types matching Limitless API format
export interface Lifelog {
  id: string;
  title: string;
  markdown?: string;
  contents?: Array<{
    type: string;
    content: string;
    speakerName?: string;
    startTime?: string;
    endTime?: string;
    startOffsetMs?: number;
    endOffsetMs?: number;
  }>;
  startTime: string;
  endTime?: string;
  isStarred?: boolean;
  updatedAt?: string;
}

export interface Contact {
  name: string;
  externalContactId?: string;
  primaryEmail?: string;
  emails?: string[];
  photoUrl?: string | null;
}

export interface Person {
  name: string;
  email?: string;
  photoUrl?: string | null;
  contactDocId?: string;
}

export interface Meeting {
  title: string;
  description?: string | null;
  startTime: string;
  endTime?: string | null;
  participants?: Array<{
    name: string;
    email?: string;
  }>;
  url?: string | null;
  conferenceUrl?: string | null;
}

export interface UserProfile {
  displayName?: string;
  job?: string;
  traits?: string;
  customTraits?: string;
  additionalInfo?: string;
  languageCode?: string;
  verbosity?: string;
}

interface ApiResponse<T> {
  data: T;
  meta?: {
    [key: string]: {
      nextCursor?: string | null;
      count?: number;
    };
  };
}

// API request helper
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${config.apiUrl}${endpoint}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers as Record<string, string>) || {}),
  };

  // Add API key for Limitless API
  if (config.apiUrl === API_URLS.LIMITLESS && config.apiKey) {
    headers['X-API-Key'] = config.apiKey;
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: config.apiUrl === API_URLS.LOCAL ? 'include' : 'omit',
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: response.statusText }));
    throw new Error(error.message || error.error || `API Error: ${response.status}`);
  }

  return response.json();
}

// Limitless API Client
export const limitlessApi = {
  // Lifelogs
  async getLifelogs(params?: {
    date?: string;
    start?: string;
    end?: string;
    cursor?: string;
    direction?: 'asc' | 'desc';
    includeMarkdown?: boolean;
    limit?: number;
    isStarred?: boolean;
  }): Promise<ApiResponse<{ lifelogs: Lifelog[] }>> {
    const queryParams = new URLSearchParams();
    if (params?.date) queryParams.set('date', params.date);
    if (params?.start) queryParams.set('start', params.start);
    if (params?.end) queryParams.set('end', params.end);
    if (params?.cursor) queryParams.set('cursor', params.cursor);
    if (params?.direction) queryParams.set('direction', params.direction);
    if (params?.includeMarkdown !== undefined) queryParams.set('includeMarkdown', String(params.includeMarkdown));
    if (params?.limit) queryParams.set('limit', String(params.limit));
    if (params?.isStarred) queryParams.set('isStarred', 'true');

    const query = queryParams.toString();
    return apiRequest(`/lifelogs${query ? `?${query}` : ''}`);
  },

  async getLifelog(id: string): Promise<ApiResponse<{ lifelog: Lifelog }>> {
    return apiRequest(`/lifelogs/${id}`);
  },

  // Contacts
  async getContacts(): Promise<ApiResponse<{ contacts: Contact[] }>> {
    return apiRequest('/contacts');
  },

  // Persons
  async getPersons(): Promise<ApiResponse<{ persons: Person[] }>> {
    return apiRequest('/persons');
  },

  // Meetings
  async getMeetings(params?: {
    limit?: number;
    cursor?: string;
  }): Promise<ApiResponse<{ meetings: Meeting[] }>> {
    const queryParams = new URLSearchParams();
    if (params?.limit) queryParams.set('limit', String(params.limit));
    if (params?.cursor) queryParams.set('cursor', params.cursor);

    const query = queryParams.toString();
    return apiRequest(`/meetings${query ? `?${query}` : ''}`);
  },

  // User Profile
  async getProfile(): Promise<ApiResponse<{ profile: UserProfile | null }>> {
    return apiRequest('/user/profile');
  },

  // Search
  async search(params: {
    query: string;
    limit?: number;
    startDate?: string;
    endDate?: string;
  }): Promise<ApiResponse<{ lifelogs: Lifelog[] }>> {
    return apiRequest('/search', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  },

  // Import endpoints (only available on local API)
  async importLifelogs(lifelogs: Partial<Lifelog>[]): Promise<{ success: boolean; imported: number; ids: string[] }> {
    if (config.apiUrl !== API_URLS.LOCAL) {
      throw new Error('Import is only available on local API');
    }
    return apiRequest('/import/lifelogs', {
      method: 'POST',
      body: JSON.stringify({ lifelogs }),
    });
  },

  async importContacts(contacts: Contact[]): Promise<{ success: boolean; imported: number; ids: string[] }> {
    if (config.apiUrl !== API_URLS.LOCAL) {
      throw new Error('Import is only available on local API');
    }
    return apiRequest('/import/contacts', {
      method: 'POST',
      body: JSON.stringify({ contacts }),
    });
  },

  async importPersons(persons: Person[]): Promise<{ success: boolean; imported: number; ids: string[] }> {
    if (config.apiUrl !== API_URLS.LOCAL) {
      throw new Error('Import is only available on local API');
    }
    return apiRequest('/import/persons', {
      method: 'POST',
      body: JSON.stringify({ persons }),
    });
  },

  async importMeetings(meetings: Meeting[]): Promise<{ success: boolean; imported: number; ids: string[] }> {
    if (config.apiUrl !== API_URLS.LOCAL) {
      throw new Error('Import is only available on local API');
    }
    return apiRequest('/import/meetings', {
      method: 'POST',
      body: JSON.stringify({ meetings }),
    });
  },

  async importProfile(profile: UserProfile): Promise<{ success: boolean; message: string }> {
    if (config.apiUrl !== API_URLS.LOCAL) {
      throw new Error('Import is only available on local API');
    }
    return apiRequest('/import/profile', {
      method: 'POST',
      body: JSON.stringify({ profile }),
    });
  },

  async importBulk(data: {
    contacts?: Contact[];
    persons?: Person[];
    meetings?: Meeting[];
    lifelogs?: Partial<Lifelog>[];
    profile?: UserProfile;
  }): Promise<{ success: boolean; imported: { contacts: number; persons: number; meetings: number; lifelogs: number; profile: boolean } }> {
    if (config.apiUrl !== API_URLS.LOCAL) {
      throw new Error('Import is only available on local API');
    }
    return apiRequest('/import/bulk', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
