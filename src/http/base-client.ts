import type { ChurchSuiteConfig } from '../types/config.js';
import { handleResponse } from './response.js';
import { buildUrl } from '../utils/query-params.js';

const BASE_URL = 'https://api.churchsuite.com/v1';

export class BaseClient {
  private readonly baseUrl: string;
  private readonly headers: Record<string, string>;
  private readonly fetchFn: typeof fetch;

  constructor(config: ChurchSuiteConfig) {
    this.baseUrl = config.baseUrl ?? BASE_URL;
    this.fetchFn = config.fetch ?? fetch;
    this.headers = {
      'X-Account': config.account,
      'X-Application': config.application,
      'Content-Type': 'application/json',
    };
    if (config.auth) {
      this.headers['X-Auth'] = config.auth;
    }
  }

  async get<T>(path: string, params?: Record<string, unknown>): Promise<T> {
    const url = buildUrl(this.baseUrl, path, params);
    const response = await this.fetchFn(url, {
      method: 'GET',
      headers: this.headers,
    });
    return handleResponse<T>(response);
  }

  async post<T>(path: string, body?: unknown): Promise<T> {
    const url = buildUrl(this.baseUrl, path);
    const response = await this.fetchFn(url, {
      method: 'POST',
      headers: this.headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
    return handleResponse<T>(response);
  }

  async put<T>(path: string, body?: unknown): Promise<T> {
    const url = buildUrl(this.baseUrl, path);
    const response = await this.fetchFn(url, {
      method: 'PUT',
      headers: this.headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
    return handleResponse<T>(response);
  }

  async delete(path: string): Promise<void> {
    const url = buildUrl(this.baseUrl, path);
    const response = await this.fetchFn(url, {
      method: 'DELETE',
      headers: this.headers,
    });
    return handleResponse<void>(response);
  }
}
