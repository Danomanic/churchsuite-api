import { BaseClient } from '../../../src/http/base-client.js';
import { ContactsResource } from '../../../src/modules/address-book/contacts.js';
import { createMockFetch, createTestConfig } from '../../setup.js';

function createContacts(client: BaseClient) {
  return new ContactsResource(client);
}

describe('ContactsResource', () => {
  it('list calls /v1/addressbook/contacts', async () => {
    const body = {
      contacts: [{ id: 1, first_name: 'Alice' }],
      pagination: { page: 1, per_page: 50 },
    };
    const { fetch, calls } = createMockFetch({ body });
    const contacts = createContacts(new BaseClient(createTestConfig(fetch)));

    const result = await contacts.list();

    expect(result).toEqual(body);
    expect(calls).toHaveLength(1);
    expect(calls[0].url).toBe(
      'https://api.churchsuite.com/v1/addressbook/contacts',
    );
    expect(calls[0].method).toBe('GET');
  });

  it('list passes query params', async () => {
    const body = { contacts: [], pagination: { page: 2, per_page: 10 } };
    const { fetch, calls } = createMockFetch({ body });
    const contacts = createContacts(new BaseClient(createTestConfig(fetch)));

    await contacts.list({ page: 2, per_page: 10 });

    expect(calls[0].url).toContain('page=2');
    expect(calls[0].url).toContain('per_page=10');
  });

  it('get calls /v1/addressbook/contact/{id}', async () => {
    const contact = { id: 42, first_name: 'Bob' };
    const { fetch, calls } = createMockFetch({ body: contact });
    const contacts = createContacts(new BaseClient(createTestConfig(fetch)));

    const result = await contacts.get(42);

    expect(result).toEqual(contact);
    expect(calls[0].url).toBe(
      'https://api.churchsuite.com/v1/addressbook/contact/42',
    );
    expect(calls[0].method).toBe('GET');
  });

  it('create POSTs to /v1/addressbook/contacts', async () => {
    const newContact = { first_name: 'Carol', last_name: 'Smith' };
    const created = { id: 99, ...newContact };
    const { fetch, calls } = createMockFetch({ body: created });
    const contacts = createContacts(new BaseClient(createTestConfig(fetch)));

    const result = await contacts.create(newContact as any);

    expect(result).toEqual(created);
    expect(calls[0].url).toBe(
      'https://api.churchsuite.com/v1/addressbook/contacts',
    );
    expect(calls[0].method).toBe('POST');
    expect(calls[0].body).toEqual(newContact);
  });

  it('update PUTs to /v1/addressbook/contact/{id}', async () => {
    const changes = { first_name: 'Updated' };
    const updated = { id: 42, first_name: 'Updated' };
    const { fetch, calls } = createMockFetch({ body: updated });
    const contacts = createContacts(new BaseClient(createTestConfig(fetch)));

    const result = await contacts.update(42, changes as any);

    expect(result).toEqual(updated);
    expect(calls[0].url).toBe(
      'https://api.churchsuite.com/v1/addressbook/contact/42',
    );
    expect(calls[0].method).toBe('PUT');
    expect(calls[0].body).toEqual(changes);
  });

  it('delete DELETEs /v1/addressbook/contact/{id}', async () => {
    const { fetch, calls } = createMockFetch({ status: 204 });
    const contacts = createContacts(new BaseClient(createTestConfig(fetch)));

    const result = await contacts.delete(42);

    expect(result).toBeUndefined();
    expect(calls[0].url).toBe(
      'https://api.churchsuite.com/v1/addressbook/contact/42',
    );
    expect(calls[0].method).toBe('DELETE');
  });

  it('getTags calls /v1/addressbook/contact/{id}/tags', async () => {
    const body = { tags: [{ id: 1, name: 'Volunteer' }] };
    const { fetch, calls } = createMockFetch({ body });
    const contacts = createContacts(new BaseClient(createTestConfig(fetch)));

    const result = await contacts.getTags(42);

    expect(result).toEqual(body);
    expect(calls[0].url).toBe(
      'https://api.churchsuite.com/v1/addressbook/contact/42/tags',
    );
  });

  it('getKeyDates calls /v1/addressbook/contact/{id}/keydates', async () => {
    const body = { keydates: [{ id: 1, name: 'Birthday' }] };
    const { fetch, calls } = createMockFetch({ body });
    const contacts = createContacts(new BaseClient(createTestConfig(fetch)));

    const result = await contacts.getKeyDates(42);

    expect(result).toEqual(body);
    expect(calls[0].url).toBe(
      'https://api.churchsuite.com/v1/addressbook/contact/42/keydates',
    );
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
              contacts: [
                { id: 1, first_name: 'Alice' },
                { id: 2, first_name: 'Bob' },
              ],
              pagination: { page: 1, per_page: 2 },
            }
          : {
              contacts: [{ id: 3, first_name: 'Carol' }],
              pagination: { page: 2, per_page: 2 },
            };

      return new Response(JSON.stringify(body), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    };

    const client = new BaseClient(createTestConfig(mockFetch as typeof fetch));
    const contacts = createContacts(client);

    const collected: unknown[] = [];
    for await (const contact of contacts.listAll()) {
      collected.push(contact);
    }

    expect(collected).toHaveLength(3);
    expect(collected[0]).toEqual({ id: 1, first_name: 'Alice' });
    expect(collected[1]).toEqual({ id: 2, first_name: 'Bob' });
    expect(collected[2]).toEqual({ id: 3, first_name: 'Carol' });
    expect(callCount).toBe(2);
  });
});
