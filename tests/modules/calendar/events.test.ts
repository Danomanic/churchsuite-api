import { BaseClient } from '../../../src/http/base-client.js';
import { EventsResource } from '../../../src/modules/calendar/events.js';
import { createMockFetch, createTestConfig } from '../../setup.js';

function createEvents(client: BaseClient) {
  return new EventsResource(client);
}

describe('EventsResource', () => {
  it('list calls /v1/calendar/events', async () => {
    const body = {
      events: [{ id: 1, title: 'Sunday Service' }],
      pagination: { page: 1, per_page: 50 },
    };
    const { fetch, calls } = createMockFetch({ body });
    const events = createEvents(new BaseClient(createTestConfig(fetch)));

    const result = await events.list();

    expect(result).toEqual(body);
    expect(calls).toHaveLength(1);
    expect(calls[0].url).toBe(
      'https://api.churchsuite.com/v1/calendar/events',
    );
    expect(calls[0].method).toBe('GET');
  });

  it('list passes query params', async () => {
    const body = { events: [], pagination: { page: 1, per_page: 10 } };
    const { fetch, calls } = createMockFetch({ body });
    const events = createEvents(new BaseClient(createTestConfig(fetch)));

    await events.list({ page: 2, per_page: 10 } as any);

    expect(calls[0].url).toContain('page=2');
    expect(calls[0].url).toContain('per_page=10');
  });

  it('get with number id calls /v1/calendar/event/{id}', async () => {
    const event = { id: 42, title: 'Midweek Meeting' };
    const { fetch, calls } = createMockFetch({ body: event });
    const events = createEvents(new BaseClient(createTestConfig(fetch)));

    const result = await events.get(42);

    expect(result).toEqual(event);
    expect(calls[0].url).toBe(
      'https://api.churchsuite.com/v1/calendar/event/42',
    );
    expect(calls[0].method).toBe('GET');
  });

  it('get with string identifier calls /v1/calendar/event/{identifier}', async () => {
    const event = { id: 42, identifier: 'sunday-service', title: 'Sunday Service' };
    const { fetch, calls } = createMockFetch({ body: event });
    const events = createEvents(new BaseClient(createTestConfig(fetch)));

    const result = await events.get('sunday-service');

    expect(result).toEqual(event);
    expect(calls[0].url).toBe(
      'https://api.churchsuite.com/v1/calendar/event/sunday-service',
    );
    expect(calls[0].method).toBe('GET');
  });

  it('listAll iterates through pages and stops when results < per_page', async () => {
    let callCount = 0;
    const mockFetch = async (
      input: string | URL | Request,
      init?: RequestInit,
    ): Promise<Response> => {
      callCount++;
      const body =
        callCount === 1
          ? {
              events: [
                { id: 1, title: 'Event A' },
                { id: 2, title: 'Event B' },
              ],
              pagination: { page: 1, per_page: 2 },
            }
          : {
              events: [{ id: 3, title: 'Event C' }],
              pagination: { page: 2, per_page: 2 },
            };

      return new Response(JSON.stringify(body), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    };

    const client = new BaseClient(createTestConfig(mockFetch as typeof fetch));
    const events = createEvents(client);

    const collected: unknown[] = [];
    for await (const event of events.listAll()) {
      collected.push(event);
    }

    expect(collected).toHaveLength(3);
    expect(collected[0]).toEqual({ id: 1, title: 'Event A' });
    expect(collected[1]).toEqual({ id: 2, title: 'Event B' });
    expect(collected[2]).toEqual({ id: 3, title: 'Event C' });
    expect(callCount).toBe(2);
  });
});
