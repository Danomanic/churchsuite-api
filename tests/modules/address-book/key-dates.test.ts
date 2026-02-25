import { BaseClient } from '../../../src/http/base-client.js';
import { KeyDatesResource } from '../../../src/modules/address-book/key-dates.js';
import { createMockFetch, createTestConfig } from '../../setup.js';

function createKeyDates(client: BaseClient) {
  return new KeyDatesResource(client);
}

describe('KeyDatesResource', () => {
  it('list calls /v1/addressbook/keydates', async () => {
    const body = { keydates: [{ id: 1, name: 'Birthday' }] };
    const { fetch, calls } = createMockFetch({ body });
    const keyDates = createKeyDates(new BaseClient(createTestConfig(fetch)));

    const result = await keyDates.list();

    expect(result).toEqual(body);
    expect(calls).toHaveLength(1);
    expect(calls[0].url).toBe(
      'https://api.churchsuite.com/v1/addressbook/keydates',
    );
    expect(calls[0].method).toBe('GET');
  });

  it('get calls /v1/addressbook/keydate/{id}', async () => {
    const keyDate = { id: 7, name: 'Anniversary' };
    const { fetch, calls } = createMockFetch({ body: keyDate });
    const keyDates = createKeyDates(new BaseClient(createTestConfig(fetch)));

    const result = await keyDates.get(7);

    expect(result).toEqual(keyDate);
    expect(calls[0].url).toBe(
      'https://api.churchsuite.com/v1/addressbook/keydate/7',
    );
    expect(calls[0].method).toBe('GET');
  });

  it('getContacts calls /v1/addressbook/keydate/{id}/contacts', async () => {
    const body = {
      contacts: [{ id: 1, first_name: 'Alice' }],
      pagination: { page: 1, per_page: 50 },
    };
    const { fetch, calls } = createMockFetch({ body });
    const keyDates = createKeyDates(new BaseClient(createTestConfig(fetch)));

    const result = await keyDates.getContacts(7, { page: 1 } as any);

    expect(result).toEqual(body);
    expect(calls[0].url).toContain(
      'https://api.churchsuite.com/v1/addressbook/keydate/7/contacts',
    );
    expect(calls[0].url).toContain('page=1');
    expect(calls[0].method).toBe('GET');
  });

  it('getContacts works without params', async () => {
    const body = { contacts: [], pagination: {} };
    const { fetch, calls } = createMockFetch({ body });
    const keyDates = createKeyDates(new BaseClient(createTestConfig(fetch)));

    await keyDates.getContacts(7);

    expect(calls[0].url).toBe(
      'https://api.churchsuite.com/v1/addressbook/keydate/7/contacts',
    );
  });
});
