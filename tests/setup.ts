import type { ChurchSuiteConfig } from '../src/types/config.js';

export interface MockCall {
  url: string;
  method: string;
  headers: Record<string, string>;
  body: unknown;
}

export interface MockFetchOptions {
  status?: number;
  body?: unknown;
  headers?: Record<string, string>;
}

export function createMockFetch(options: MockFetchOptions = {}) {
  const calls: MockCall[] = [];
  const { status = 200, body = {}, headers = {} } = options;

  const mockFetch = async (
    input: string | URL | Request,
    init?: RequestInit,
  ): Promise<Response> => {
    const url = typeof input === 'string' ? input : input.toString();
    calls.push({
      url,
      method: init?.method ?? 'GET',
      headers: (init?.headers as Record<string, string>) ?? {},
      body: init?.body ? JSON.parse(init.body as string) : undefined,
    });

    return new Response(status === 204 ? null : JSON.stringify(body), {
      status,
      headers: { 'Content-Type': 'application/json', ...headers },
    });
  };

  return { fetch: mockFetch as typeof fetch, calls };
}

export function createTestConfig(
  fetchOverride: typeof fetch,
): ChurchSuiteConfig {
  return {
    account: 'test-account',
    application: 'test-app',
    auth: 'test-api-key',
    fetch: fetchOverride,
  };
}
