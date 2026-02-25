import { BaseClient } from '../../src/http/base-client.js';
import { ChildrenResource } from '../../src/modules/children/children-resource.js';
import { createMockFetch, createTestConfig } from '../setup.js';

describe('ChildrenResource', () => {
  it('list calls /v1/children/children', async () => {
    const body = { children: [{ id: 1 }], pagination: {} };
    const { fetch, calls } = createMockFetch({ body });
    const client = new BaseClient(createTestConfig(fetch));
    const resource = new ChildrenResource(client);

    const result = await resource.list();

    expect(result).toEqual(body);
    expect(calls).toHaveLength(1);
    expect(calls[0].url).toBe(
      'https://api.churchsuite.com/v1/children/children',
    );
    expect(calls[0].method).toBe('GET');
  });

  it('list passes query params', async () => {
    const body = { children: [], pagination: {} };
    const { fetch, calls } = createMockFetch({ body });
    const client = new BaseClient(createTestConfig(fetch));
    const resource = new ChildrenResource(client);

    await resource.list({ page: 2, per_page: 10 });

    const url = new URL(calls[0].url);
    expect(url.searchParams.get('page')).toBe('2');
    expect(url.searchParams.get('per_page')).toBe('10');
  });

  it('get calls /v1/children/child/{id}', async () => {
    const child = { id: 42, first_name: 'Sam' };
    const { fetch, calls } = createMockFetch({ body: child });
    const client = new BaseClient(createTestConfig(fetch));
    const resource = new ChildrenResource(client);

    const result = await resource.get(42);

    expect(result).toEqual(child);
    expect(calls[0].url).toBe(
      'https://api.churchsuite.com/v1/children/child/42',
    );
    expect(calls[0].method).toBe('GET');
  });

  it('create sends POST with body', async () => {
    const newChild = { first_name: 'Amy', last_name: 'Jones' };
    const created = { id: 10, ...newChild };
    const { fetch, calls } = createMockFetch({ body: created });
    const client = new BaseClient(createTestConfig(fetch));
    const resource = new ChildrenResource(client);

    const result = await resource.create(newChild as any);

    expect(result).toEqual(created);
    expect(calls[0].url).toBe(
      'https://api.churchsuite.com/v1/children/children',
    );
    expect(calls[0].method).toBe('POST');
    expect(calls[0].body).toEqual(newChild);
  });

  it('update sends PUT with body', async () => {
    const updates = { first_name: 'Updated' };
    const updated = { id: 5, first_name: 'Updated' };
    const { fetch, calls } = createMockFetch({ body: updated });
    const client = new BaseClient(createTestConfig(fetch));
    const resource = new ChildrenResource(client);

    const result = await resource.update(5, updates as any);

    expect(result).toEqual(updated);
    expect(calls[0].url).toBe(
      'https://api.churchsuite.com/v1/children/child/5',
    );
    expect(calls[0].method).toBe('PUT');
    expect(calls[0].body).toEqual(updates);
  });

  it('delete sends DELETE and returns void', async () => {
    const { fetch, calls } = createMockFetch({ status: 204 });
    const client = new BaseClient(createTestConfig(fetch));
    const resource = new ChildrenResource(client);

    const result = await resource.delete(7);

    expect(result).toBeUndefined();
    expect(calls[0].url).toBe(
      'https://api.churchsuite.com/v1/children/child/7',
    );
    expect(calls[0].method).toBe('DELETE');
  });

  it('getTags calls /v1/children/child/{id}/tags', async () => {
    const tags = { tags: [{ id: 1, name: 'VBS' }] };
    const { fetch, calls } = createMockFetch({ body: tags });
    const client = new BaseClient(createTestConfig(fetch));
    const resource = new ChildrenResource(client);

    const result = await resource.getTags(3);

    expect(result).toEqual(tags);
    expect(calls[0].url).toBe(
      'https://api.churchsuite.com/v1/children/child/3/tags',
    );
  });

  it('getKeyDates calls /v1/children/child/{id}/keydates', async () => {
    const keyDates = { keydates: [{ id: 1 }] };
    const { fetch, calls } = createMockFetch({ body: keyDates });
    const client = new BaseClient(createTestConfig(fetch));
    const resource = new ChildrenResource(client);

    const result = await resource.getKeyDates(3);

    expect(result).toEqual(keyDates);
    expect(calls[0].url).toBe(
      'https://api.churchsuite.com/v1/children/child/3/keydates',
    );
  });

  it('getGroups calls /v1/children/child/{id}/groups', async () => {
    const groups = { groups: [{ id: 1 }] };
    const { fetch, calls } = createMockFetch({ body: groups });
    const client = new BaseClient(createTestConfig(fetch));
    const resource = new ChildrenResource(client);

    const result = await resource.getGroups(3);

    expect(result).toEqual(groups);
    expect(calls[0].url).toBe(
      'https://api.churchsuite.com/v1/children/child/3/groups',
    );
  });

  it('listAll iterates through paginated results', async () => {
    let callCount = 0;
    const mockFetch = async (
      input: string | URL | Request,
      init?: RequestInit,
    ): Promise<Response> => {
      callCount++;
      const body =
        callCount === 1
          ? { children: [{ id: 1 }, { id: 2 }], pagination: { per_page: 2 } }
          : { children: [], pagination: { per_page: 2 } };
      return new Response(JSON.stringify(body), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    };

    const client = new BaseClient(createTestConfig(mockFetch as typeof fetch));
    const resource = new ChildrenResource(client);

    const results: unknown[] = [];
    for await (const child of resource.listAll()) {
      results.push(child);
    }

    expect(results).toEqual([{ id: 1 }, { id: 2 }]);
    expect(callCount).toBe(2);
  });
});
