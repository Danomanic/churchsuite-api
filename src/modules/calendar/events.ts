import type { BaseClient } from '../../http/base-client.js';
import type {
  Event,
  EventListParams,
  EventListResponse,
} from '../../types/calendar.js';

export class EventsResource {
  constructor(private readonly client: BaseClient) {}

  async list(params?: EventListParams): Promise<EventListResponse> {
    return this.client.get<EventListResponse>(
      '/v1/calendar/events',
      params as Record<string, unknown>,
    );
  }

  async *listAll(
    params?: Omit<EventListParams, 'page'>,
  ): AsyncGenerator<Event> {
    let page = 1;
    while (true) {
      const response = await this.list({ ...params, page });
      for (const event of response.events) {
        yield event;
      }
      if (
        response.events.length === 0 ||
        response.events.length < (response.pagination.per_page ?? 50)
      ) {
        break;
      }
      page++;
    }
  }

  async get(idOrIdentifier: number | string): Promise<Event> {
    return this.client.get<Event>(`/v1/calendar/event/${idOrIdentifier}`);
  }
}
