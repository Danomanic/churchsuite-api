import { BaseClient } from '../../../src/http/base-client.js';
import { TagsResource } from '../../../src/modules/address-book/tags.js';
import { createMockFetch, createTestConfig } from '../../setup.js';

function createTags(client: BaseClient) {
  return new TagsResource(client);
}

describe('TagsResource', () => {
  it('list calls /v1/addressbook/tags', async () => {
    const body = { tags: [{ id: 1, name: 'Volunteer' }] };
    const { fetch, calls } = createMockFetch({ body });
    const tags = createTags(new BaseClient(createTestConfig(fetch)));

    const result = await tags.list();

    expect(result).toEqual(body);
    expect(calls).toHaveLength(1);
    expect(calls[0].url).toBe(
      'https://api.churchsuite.com/v1/addressbook/tags',
    );
    expect(calls[0].method).toBe('GET');
  });

  it('get calls /v1/addressbook/tag/{id}', async () => {
    const tag = { id: 5, name: 'Leader' };
    const { fetch, calls } = createMockFetch({ body: tag });
    const tags = createTags(new BaseClient(createTestConfig(fetch)));

    const result = await tags.get(5);

    expect(result).toEqual(tag);
    expect(calls[0].url).toBe(
      'https://api.churchsuite.com/v1/addressbook/tag/5',
    );
    expect(calls[0].method).toBe('GET');
  });

  it('getContacts calls /v1/addressbook/tag/{id}/contacts with params', async () => {
    const body = {
      contacts: [{ id: 1, first_name: 'Alice' }],
      pagination: { page: 1, per_page: 50 },
    };
    const { fetch, calls } = createMockFetch({ body });
    const tags = createTags(new BaseClient(createTestConfig(fetch)));

    const result = await tags.getContacts(5, { page: 1 } as any);

    expect(result).toEqual(body);
    expect(calls[0].url).toContain(
      'https://api.churchsuite.com/v1/addressbook/tag/5/contacts',
    );
    expect(calls[0].url).toContain('page=1');
    expect(calls[0].method).toBe('GET');
  });

  it('getContacts works without params', async () => {
    const body = { contacts: [], pagination: {} };
    const { fetch, calls } = createMockFetch({ body });
    const tags = createTags(new BaseClient(createTestConfig(fetch)));

    await tags.getContacts(5);

    expect(calls[0].url).toBe(
      'https://api.churchsuite.com/v1/addressbook/tag/5/contacts',
    );
  });
});
