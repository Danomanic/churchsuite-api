import { BaseClient } from '../../../src/http/base-client.js';
import { GroupsResource } from '../../../src/modules/small-groups/groups.js';
import { createMockFetch, createTestConfig } from '../../setup.js';

describe('GroupsResource', () => {
  it('list calls /v1/smallgroups/groups', async () => {
    const body = { groups: [{ id: 1 }], pagination: {} };
    const { fetch, calls } = createMockFetch({ body });
    const client = new BaseClient(createTestConfig(fetch));
    const resource = new GroupsResource(client);

    const result = await resource.list();

    expect(result).toEqual(body);
    expect(calls).toHaveLength(1);
    expect(calls[0].url).toBe(
      'https://api.churchsuite.com/v1/smallgroups/groups',
    );
    expect(calls[0].method).toBe('GET');
  });

  it('list passes query params', async () => {
    const body = { groups: [], pagination: {} };
    const { fetch, calls } = createMockFetch({ body });
    const client = new BaseClient(createTestConfig(fetch));
    const resource = new GroupsResource(client);

    await resource.list({ page: 3, per_page: 25 });

    const url = new URL(calls[0].url);
    expect(url.searchParams.get('page')).toBe('3');
    expect(url.searchParams.get('per_page')).toBe('25');
  });

  it('get calls /v1/smallgroups/group/{id}', async () => {
    const group = { id: 10, name: 'Youth Group' };
    const { fetch, calls } = createMockFetch({ body: group });
    const client = new BaseClient(createTestConfig(fetch));
    const resource = new GroupsResource(client);

    const result = await resource.get(10);

    expect(result).toEqual(group);
    expect(calls[0].url).toBe(
      'https://api.churchsuite.com/v1/smallgroups/group/10',
    );
    expect(calls[0].method).toBe('GET');
  });

  it('getMembers calls /v1/smallgroups/group/{id}/members', async () => {
    const members = { members: [{ id: 1, name: 'John' }] };
    const { fetch, calls } = createMockFetch({ body: members });
    const client = new BaseClient(createTestConfig(fetch));
    const resource = new GroupsResource(client);

    const result = await resource.getMembers(5);

    expect(result).toEqual(members);
    expect(calls[0].url).toBe(
      'https://api.churchsuite.com/v1/smallgroups/group/5/members',
    );
    expect(calls[0].method).toBe('GET');
  });

  it('setMembers sends POST with body', async () => {
    const data = { members: [{ contact_id: 1 }, { contact_id: 2 }] };
    const responseBody = { members: [{ id: 1 }, { id: 2 }] };
    const { fetch, calls } = createMockFetch({ body: responseBody });
    const client = new BaseClient(createTestConfig(fetch));
    const resource = new GroupsResource(client);

    const result = await resource.setMembers(5, data as any);

    expect(result).toEqual(responseBody);
    expect(calls[0].url).toBe(
      'https://api.churchsuite.com/v1/smallgroups/group/5/members',
    );
    expect(calls[0].method).toBe('POST');
    expect(calls[0].body).toEqual(data);
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
          ? { groups: [{ id: 1 }, { id: 2 }], pagination: { per_page: 2 } }
          : { groups: [], pagination: { per_page: 2 } };
      return new Response(JSON.stringify(body), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    };

    const client = new BaseClient(createTestConfig(mockFetch as typeof fetch));
    const resource = new GroupsResource(client);

    const results: unknown[] = [];
    for await (const group of resource.listAll()) {
      results.push(group);
    }

    expect(results).toEqual([{ id: 1 }, { id: 2 }]);
    expect(callCount).toBe(2);
  });
});
