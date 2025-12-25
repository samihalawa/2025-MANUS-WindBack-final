/**
 * React hooks for Limitless API
 */

import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  limitlessApi,
  getLimitlessApiConfig,
  setLimitlessApiUrl,
  API_URLS,
  type Lifelog,
  type Contact,
  type Person,
  type Meeting,
  type UserProfile,
} from './limitless-api';

// Query keys
export const LIMITLESS_QUERY_KEYS = {
  lifelogs: ['limitless', 'lifelogs'] as const,
  lifelog: (id: string) => ['limitless', 'lifelogs', id] as const,
  contacts: ['limitless', 'contacts'] as const,
  persons: ['limitless', 'persons'] as const,
  meetings: ['limitless', 'meetings'] as const,
  profile: ['limitless', 'profile'] as const,
  search: (query: string) => ['limitless', 'search', query] as const,
  config: ['limitless', 'config'] as const,
};

/**
 * Hook to manage Limitless API configuration
 */
export function useLimitlessConfig() {
  const [config, setConfig] = useState(getLimitlessApiConfig);
  const queryClient = useQueryClient();

  const switchToLocal = useCallback(() => {
    setLimitlessApiUrl(API_URLS.LOCAL);
    setConfig(getLimitlessApiConfig());
    // Invalidate all queries to refetch with new API
    queryClient.invalidateQueries({ queryKey: ['limitless'] });
  }, [queryClient]);

  const switchToLimitless = useCallback((apiKey: string) => {
    setLimitlessApiUrl(API_URLS.LIMITLESS, apiKey);
    setConfig(getLimitlessApiConfig());
    // Invalidate all queries to refetch with new API
    queryClient.invalidateQueries({ queryKey: ['limitless'] });
  }, [queryClient]);

  return {
    ...config,
    switchToLocal,
    switchToLimitless,
  };
}

/**
 * Hook to fetch lifelogs
 */
export function useLifelogs(params?: {
  date?: string;
  start?: string;
  end?: string;
  cursor?: string;
  direction?: 'asc' | 'desc';
  includeMarkdown?: boolean;
  limit?: number;
  isStarred?: boolean;
}) {
  return useQuery({
    queryKey: [...LIMITLESS_QUERY_KEYS.lifelogs, params],
    queryFn: () => limitlessApi.getLifelogs(params),
    select: (data) => data.data.lifelogs,
    staleTime: 1000 * 60, // 1 minute
  });
}

/**
 * Hook to fetch a single lifelog
 */
export function useLifelog(id: string | undefined) {
  return useQuery({
    queryKey: LIMITLESS_QUERY_KEYS.lifelog(id || ''),
    queryFn: () => limitlessApi.getLifelog(id!),
    select: (data) => data.data.lifelog,
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Hook to fetch contacts
 */
export function useContacts() {
  return useQuery({
    queryKey: LIMITLESS_QUERY_KEYS.contacts,
    queryFn: () => limitlessApi.getContacts(),
    select: (data) => data.data.contacts,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Hook to fetch persons
 */
export function usePersons() {
  return useQuery({
    queryKey: LIMITLESS_QUERY_KEYS.persons,
    queryFn: () => limitlessApi.getPersons(),
    select: (data) => data.data.persons,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Hook to fetch meetings
 */
export function useMeetings(params?: { limit?: number; cursor?: string }) {
  return useQuery({
    queryKey: [...LIMITLESS_QUERY_KEYS.meetings, params],
    queryFn: () => limitlessApi.getMeetings(params),
    select: (data) => data.data.meetings,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Hook to fetch user profile
 */
export function useProfile() {
  return useQuery({
    queryKey: LIMITLESS_QUERY_KEYS.profile,
    queryFn: () => limitlessApi.getProfile(),
    select: (data) => data.data.profile,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

/**
 * Hook to search lifelogs
 */
export function useSearch(query: string, params?: { limit?: number; startDate?: string; endDate?: string }) {
  return useQuery({
    queryKey: [...LIMITLESS_QUERY_KEYS.search(query), params],
    queryFn: () => limitlessApi.search({ query, ...params }),
    select: (data) => data.data.lifelogs,
    enabled: query.length > 0,
    staleTime: 1000 * 30, // 30 seconds
  });
}

/**
 * Hook to import lifelogs
 */
export function useImportLifelogs() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (lifelogs: Partial<Lifelog>[]) => limitlessApi.importLifelogs(lifelogs),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LIMITLESS_QUERY_KEYS.lifelogs });
    },
  });
}

/**
 * Hook to import contacts
 */
export function useImportContacts() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (contacts: Contact[]) => limitlessApi.importContacts(contacts),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LIMITLESS_QUERY_KEYS.contacts });
    },
  });
}

/**
 * Hook to import persons
 */
export function useImportPersons() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (persons: Person[]) => limitlessApi.importPersons(persons),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LIMITLESS_QUERY_KEYS.persons });
    },
  });
}

/**
 * Hook to import meetings
 */
export function useImportMeetings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (meetings: Meeting[]) => limitlessApi.importMeetings(meetings),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LIMITLESS_QUERY_KEYS.meetings });
    },
  });
}

/**
 * Hook to import profile
 */
export function useImportProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profile: UserProfile) => limitlessApi.importProfile(profile),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LIMITLESS_QUERY_KEYS.profile });
    },
  });
}

/**
 * Hook to bulk import all data
 */
export function useImportBulk() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      contacts?: Contact[];
      persons?: Person[];
      meetings?: Meeting[];
      lifelogs?: Partial<Lifelog>[];
      profile?: UserProfile;
    }) => limitlessApi.importBulk(data),
    onSuccess: () => {
      // Invalidate all limitless queries
      queryClient.invalidateQueries({ queryKey: ['limitless'] });
    },
  });
}
