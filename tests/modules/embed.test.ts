import { EmbedModule } from '../../src/modules/embed.js';
import { createMockFetch, createTestConfig } from '../setup.js';

describe('EmbedModule', () => {
  it('calendarEvents calls the correct embed URL', async () => {
    const events = [{ id: 1, title: 'Sunday Service' }];
    const { fetch, calls } = createMockFetch({ body: events });
    const config = createTestConfig(fetch);
    const embed = new EmbedModule(config);

    const result = await embed.calendarEvents();

    expect(result).toEqual(events);
    expect(calls).toHaveLength(1);
    expect(calls[0].url).toBe(
      'https://test-account.churchsuite.com/embed/calendar/json',
    );
    expect(calls[0].method).toBe('GET');
  });

  it('calendarEvents appends query params', async () => {
    const { fetch, calls } = createMockFetch({ body: [] });
    const config = createTestConfig(fetch);
    const embed = new EmbedModule(config);

    await embed.calendarEvents({ category: 5 } as any);

    const url = new URL(calls[0].url);
    expect(url.searchParams.get('category')).toBe('5');
  });

  it('smallGroups calls the correct embed URL', async () => {
    const groups = [{ id: 1, name: 'Bible Study' }];
    const { fetch, calls } = createMockFetch({ body: groups });
    const config = createTestConfig(fetch);
    const embed = new EmbedModule(config);

    const result = await embed.smallGroups();

    expect(result).toEqual(groups);
    expect(calls).toHaveLength(1);
    expect(calls[0].url).toBe(
      'https://test-account.churchsuite.com/embed/smallgroups/json',
    );
    expect(calls[0].method).toBe('GET');
  });

  it('does not send auth headers', async () => {
    const { fetch, calls } = createMockFetch({ body: [] });
    const config = createTestConfig(fetch);
    const embed = new EmbedModule(config);

    await embed.calendarEvents();

    expect(calls[0].headers).not.toHaveProperty('X-Auth');
    expect(calls[0].headers).not.toHaveProperty('X-Account');
    expect(calls[0].headers).not.toHaveProperty('X-Application');
  });
});
