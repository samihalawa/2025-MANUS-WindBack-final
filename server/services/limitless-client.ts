import axios, { AxiosInstance } from "axios";

// Types based on Limitless OpenAPI spec
export interface ContentNode {
  type: string;
  content: string;
  startTime?: string;
  endTime?: string;
  startOffsetMs?: number;
  endOffsetMs?: number;
  children?: ContentNode[];
  speakerName?: string | null;
  speakerIdentifier?: "user" | null;
}

export interface LimitlessLifelog {
  id: string;
  title: string;
  markdown?: string | null;
  contents: ContentNode[];
  startTime: string;
  endTime: string;
  isStarred: boolean;
  updatedAt: string;
}

export interface LifelogsResponse {
  data: {
    lifelogs: LimitlessLifelog[];
  };
  meta: {
    lifelogs: {
      nextCursor?: string | null;
      count: number;
    };
  };
}

export interface LimitlessContact {
  name: string;
  externalContactId?: string;
  primaryEmail?: string;
  emails?: string[];
  photoUrl?: string | null;
}

export interface LimitlessPerson {
  name: string;
  email?: string;
  photoUrl?: string | null;
  contactDocId?: string;
}

export interface LimitlessMeeting {
  title: string;
  description?: string | null;
  startTime: string;
  endTime: string;
  participants: {
    email: string;
    name: string;
    isSelf: boolean;
    isOrganizer: boolean;
    responseStatus: string;
  }[];
  url?: string | null;
  conferenceUrl?: string | null;
}

export interface LimitlessMeetingSummary {
  content: string;
}

export interface LimitlessMeetingNotes {
  liveNotes: any[];
}

export interface LimitlessUserProfile {
  displayName: string;
  job?: string;
  traits?: string;
  customTraits?: string;
  additionalInfo?: string | null;
  selectedPersonality?: string;
  languageCode?: string;
  summarizationLanguageCode?: string;
  utcOffsetMinutes?: number;
  customDictionaryWords?: string;
  customPrompts?: any[];
  verbosity?: string;
  openAskInVoiceMode?: boolean;
}

export interface GetLifelogsParams {
  timezone?: string;
  date?: string;
  start?: string;
  end?: string;
  cursor?: string;
  direction?: "asc" | "desc";
  includeMarkdown?: boolean;
  includeHeadings?: boolean;
  limit?: number;
  isStarred?: boolean;
}

export class LimitlessClient {
  private client: AxiosInstance;
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, baseUrl: string = "https://api.limitless.ai") {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.client = axios.create({
      baseURL: baseUrl,
      headers: {
        "X-API-Key": apiKey,
        "Content-Type": "application/json",
      },
      timeout: 120000, // 2 minute timeout
    });
  }

  /**
   * Get lifelogs with pagination support
   */
  async getLifelogs(params: GetLifelogsParams = {}): Promise<LifelogsResponse> {
    const queryParams: Record<string, string> = {};

    if (params.timezone) queryParams.timezone = params.timezone;
    if (params.date) queryParams.date = params.date;
    if (params.start) queryParams.start = params.start;
    if (params.end) queryParams.end = params.end;
    if (params.cursor) queryParams.cursor = params.cursor;
    if (params.direction) queryParams.direction = params.direction;
    if (params.includeMarkdown !== undefined) queryParams.includeMarkdown = String(params.includeMarkdown);
    if (params.includeHeadings !== undefined) queryParams.includeHeadings = String(params.includeHeadings);
    if (params.limit) queryParams.limit = String(params.limit);
    if (params.isStarred !== undefined) queryParams.isStarred = String(params.isStarred);

    const response = await this.client.get<LifelogsResponse>("/v1/lifelogs", {
      params: queryParams,
    });

    return response.data;
  }

  /**
   * Get all lifelogs with automatic pagination
   */
  async getAllLifelogs(params: Omit<GetLifelogsParams, "cursor"> & { maxResults?: number } = {}): Promise<LimitlessLifelog[]> {
    const allLifelogs: LimitlessLifelog[] = [];
    let cursor: string | undefined;
    const batchSize = params.limit || 50;
    const maxResults = params.maxResults;

    while (true) {
      const response = await this.getLifelogs({
        ...params,
        limit: batchSize,
        cursor,
      });

      allLifelogs.push(...response.data.lifelogs);

      // Check if we've reached max results
      if (maxResults && allLifelogs.length >= maxResults) {
        return allLifelogs.slice(0, maxResults);
      }

      // Check if there's more data
      const nextCursor = response.meta.lifelogs.nextCursor;
      if (!nextCursor || response.data.lifelogs.length < batchSize) {
        break;
      }

      cursor = nextCursor;
    }

    return allLifelogs;
  }

  /**
   * Get lifelogs by date
   */
  async getLifelogsByDate(date: string, timezone?: string): Promise<LimitlessLifelog[]> {
    return this.getAllLifelogs({
      date,
      timezone,
      includeMarkdown: true,
      includeHeadings: true,
    });
  }

  /**
   * Get lifelogs by date range
   */
  async getLifelogsByRange(start: string, end: string, timezone?: string): Promise<LimitlessLifelog[]> {
    return this.getAllLifelogs({
      start,
      end,
      timezone,
      includeMarkdown: true,
      includeHeadings: true,
    });
  }

  /**
   * Get recent lifelogs
   */
  async getRecentLifelogs(limit: number = 50): Promise<LimitlessLifelog[]> {
    return this.getAllLifelogs({
      limit,
      direction: "desc",
      includeMarkdown: true,
      includeHeadings: true,
      maxResults: limit,
    });
  }

  /**
   * Get starred lifelogs
   */
  async getStarredLifelogs(): Promise<LimitlessLifelog[]> {
    return this.getAllLifelogs({
      isStarred: true,
      includeMarkdown: true,
      includeHeadings: true,
    });
  }

  /**
   * Search lifelogs with transcript content
   * Note: This is a client-side search since the API doesn't support full-text search
   */
  async searchLifelogs(
    query: string,
    params: GetLifelogsParams = {}
  ): Promise<LimitlessLifelog[]> {
    const lifelogs = await this.getAllLifelogs({
      ...params,
      includeMarkdown: true,
      includeHeadings: true,
    });

    const queryLower = query.toLowerCase();

    return lifelogs.filter((lifelog) => {
      // Search in title
      if (lifelog.title?.toLowerCase().includes(queryLower)) {
        return true;
      }

      // Search in markdown
      if (lifelog.markdown?.toLowerCase().includes(queryLower)) {
        return true;
      }

      // Search in content nodes
      const searchInNodes = (nodes: ContentNode[]): boolean => {
        for (const node of nodes) {
          if (node.content?.toLowerCase().includes(queryLower)) {
            return true;
          }
          if (node.speakerName?.toLowerCase().includes(queryLower)) {
            return true;
          }
          if (node.children && searchInNodes(node.children)) {
            return true;
          }
        }
        return false;
      };

      return searchInNodes(lifelog.contents || []);
    });
  }

  /**
   * Validate API key by making a test request
   */
  async validateApiKey(): Promise<boolean> {
    try {
      await this.getLifelogs({ limit: 1 });
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get API key
   */
  getApiKey(): string {
    return this.apiKey;
  }
}

/**
 * Create a Limitless client instance
 */
export function createLimitlessClient(apiKey: string): LimitlessClient {
  return new LimitlessClient(apiKey);
}
