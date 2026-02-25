import { BaseClient } from '../../../src/http/base-client.js';
import { CategoriesResource } from '../../../src/modules/calendar/categories.js';
import { createMockFetch, createTestConfig } from '../../setup.js';

describe('CategoriesResource', () => {
  it('list calls /v1/calendar/categories', async () => {
    const body = {
      categories: [{ id: 1, name: 'Worship' }, { id: 2, name: 'Youth' }],
    };
    const { fetch, calls } = createMockFetch({ body });
    const client = new BaseClient(createTestConfig(fetch));
    const categories = new CategoriesResource(client);

    const result = await categories.list();

    expect(result).toEqual(body);
    expect(calls).toHaveLength(1);
    expect(calls[0].url).toBe(
      'https://api.churchsuite.com/v1/calendar/categories',
    );
    expect(calls[0].method).toBe('GET');
    expect(calls[0].headers['X-Account']).toBe('test-account');
    expect(calls[0].headers['X-Application']).toBe('test-app');
    expect(calls[0].headers['X-Auth']).toBe('test-api-key');
  });
});
