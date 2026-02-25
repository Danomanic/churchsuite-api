import { BaseClient } from '../../../src/http/base-client.js';
import { FlowsResource } from '../../../src/modules/address-book/flows.js';
import { createMockFetch, createTestConfig } from '../../setup.js';

function createFlows(client: BaseClient) {
  return new FlowsResource(client);
}

describe('FlowsResource', () => {
  it('list calls /v1/addressbook/flows', async () => {
    const body = { flows: [{ id: 1, name: 'New Members' }] };
    const { fetch, calls } = createMockFetch({ body });
    const flows = createFlows(new BaseClient(createTestConfig(fetch)));

    const result = await flows.list();

    expect(result).toEqual(body);
    expect(calls).toHaveLength(1);
    expect(calls[0].url).toBe(
      'https://api.churchsuite.com/v1/addressbook/flows',
    );
    expect(calls[0].method).toBe('GET');
  });

  it('get calls /v1/addressbook/flow/{id}', async () => {
    const flow = { id: 3, name: 'Onboarding' };
    const { fetch, calls } = createMockFetch({ body: flow });
    const flows = createFlows(new BaseClient(createTestConfig(fetch)));

    const result = await flows.get(3);

    expect(result).toEqual(flow);
    expect(calls[0].url).toBe(
      'https://api.churchsuite.com/v1/addressbook/flow/3',
    );
    expect(calls[0].method).toBe('GET');
  });

  it('getStages calls /v1/addressbook/flow/{id}/stages', async () => {
    const body = { stages: [{ id: 1, name: 'Step 1' }] };
    const { fetch, calls } = createMockFetch({ body });
    const flows = createFlows(new BaseClient(createTestConfig(fetch)));

    const result = await flows.getStages(3);

    expect(result).toEqual(body);
    expect(calls[0].url).toBe(
      'https://api.churchsuite.com/v1/addressbook/flow/3/stages',
    );
    expect(calls[0].method).toBe('GET');
  });

  it('getTracking calls /v1/addressbook/flow/{id}/tracking', async () => {
    const body = { tracking: [{ id: 1, contact_id: 10 }] };
    const { fetch, calls } = createMockFetch({ body });
    const flows = createFlows(new BaseClient(createTestConfig(fetch)));

    const result = await flows.getTracking(3);

    expect(result).toEqual(body);
    expect(calls[0].url).toBe(
      'https://api.churchsuite.com/v1/addressbook/flow/3/tracking',
    );
    expect(calls[0].method).toBe('GET');
  });

  it('addTracking POSTs to /v1/addressbook/flow/{id}/tracking', async () => {
    const data = { contact_id: 10 };
    const created = { id: 99, contact_id: 10 };
    const { fetch, calls } = createMockFetch({ body: created });
    const flows = createFlows(new BaseClient(createTestConfig(fetch)));

    const result = await flows.addTracking(3, data as any);

    expect(result).toEqual(created);
    expect(calls[0].url).toBe(
      'https://api.churchsuite.com/v1/addressbook/flow/3/tracking',
    );
    expect(calls[0].method).toBe('POST');
    expect(calls[0].body).toEqual(data);
  });
});
