import type { ChurchSuiteConfig } from '../types/config.js';
import type {
  EmbedEvent,
  EmbedCalendarParams,
  EmbedGroup,
  EmbedSmallGroupsParams,
} from '../types/embed.js';
import { buildUrl } from '../utils/query-params.js';
import { handleResponse } from '../http/response.js';

export class EmbedModule {
  private readonly baseUrl: string;
  private readonly fetchFn: typeof fetch;

  constructor(config: ChurchSuiteConfig) {
    this.baseUrl = `https://${config.account}.churchsuite.com/embed`;
    this.fetchFn = config.fetch ?? fetch;
  }

  async calendarEvents(params?: EmbedCalendarParams): Promise<EmbedEvent[]> {
    const url = buildUrl(this.baseUrl, '/embed/calendar/json', params as Record<string, unknown>);
    const response = await this.fetchFn(url, { method: 'GET' });
    return handleResponse<EmbedEvent[]>(response);
  }

  async smallGroups(params?: EmbedSmallGroupsParams): Promise<EmbedGroup[]> {
    const url = buildUrl(this.baseUrl, '/embed/smallgroups/json', params as Record<string, unknown>);
    const response = await this.fetchFn(url, { method: 'GET' });
    return handleResponse<EmbedGroup[]>(response);
  }
}
