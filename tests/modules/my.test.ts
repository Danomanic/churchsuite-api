import { BaseClient } from '../../src/http/base-client.js';
import { MyModule } from '../../src/modules/my.js';
import { createMockFetch, createTestConfig } from '../setup.js';

describe('MyModule', () => {
  it('getDetails calls /v1/my/details', async () => {
    const details = { id: 1, first_name: 'Dan' };
    const { fetch, calls } = createMockFetch({ body: details });
    const client = new BaseClient(createTestConfig(fetch));
    const my = new MyModule(client);

    const result = await my.getDetails();

    expect(result).toEqual(details);
    expect(calls).toHaveLength(1);
    expect(calls[0].url).toBe('https://api.churchsuite.com/v1/my/details');
    expect(calls[0].method).toBe('GET');
  });

  it('getContacts calls /v1/my/contacts', async () => {
    const contacts = { contacts: [{ id: 1 }] };
    const { fetch, calls } = createMockFetch({ body: contacts });
    const client = new BaseClient(createTestConfig(fetch));
    const my = new MyModule(client);

    const result = await my.getContacts();

    expect(result).toEqual(contacts);
    expect(calls[0].url).toBe('https://api.churchsuite.com/v1/my/contacts');
    expect(calls[0].method).toBe('GET');
  });

  it('getChildren calls /v1/my/children', async () => {
    const children = { children: [{ id: 1 }] };
    const { fetch, calls } = createMockFetch({ body: children });
    const client = new BaseClient(createTestConfig(fetch));
    const my = new MyModule(client);

    const result = await my.getChildren();

    expect(result).toEqual(children);
    expect(calls[0].url).toBe('https://api.churchsuite.com/v1/my/children');
    expect(calls[0].method).toBe('GET');
  });

  it('getChild calls /v1/my/child/{id}', async () => {
    const child = { id: 7, first_name: 'Lily' };
    const { fetch, calls } = createMockFetch({ body: child });
    const client = new BaseClient(createTestConfig(fetch));
    const my = new MyModule(client);

    const result = await my.getChild(7);

    expect(result).toEqual(child);
    expect(calls[0].url).toBe('https://api.churchsuite.com/v1/my/child/7');
    expect(calls[0].method).toBe('GET');
  });
});
