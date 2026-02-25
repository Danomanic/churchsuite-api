import { BaseClient } from '../../../src/http/base-client.js';
import { ClustersResource } from '../../../src/modules/small-groups/clusters.js';
import { createMockFetch, createTestConfig } from '../../setup.js';

describe('ClustersResource', () => {
  it('list calls /v1/smallgroups/clusters', async () => {
    const body = { clusters: [{ id: 1, name: 'North' }] };
    const { fetch, calls } = createMockFetch({ body });
    const client = new BaseClient(createTestConfig(fetch));
    const resource = new ClustersResource(client);

    const result = await resource.list();

    expect(result).toEqual(body);
    expect(calls).toHaveLength(1);
    expect(calls[0].url).toBe(
      'https://api.churchsuite.com/v1/smallgroups/clusters',
    );
    expect(calls[0].method).toBe('GET');
  });

  it('get calls /v1/smallgroups/cluster/{id}', async () => {
    const cluster = { id: 4, name: 'South' };
    const { fetch, calls } = createMockFetch({ body: cluster });
    const client = new BaseClient(createTestConfig(fetch));
    const resource = new ClustersResource(client);

    const result = await resource.get(4);

    expect(result).toEqual(cluster);
    expect(calls[0].url).toBe(
      'https://api.churchsuite.com/v1/smallgroups/cluster/4',
    );
    expect(calls[0].method).toBe('GET');
  });
});
