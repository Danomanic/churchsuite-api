import { BaseClient } from '../../src/http/base-client.js';
import { createMockFetch, createTestConfig } from '../setup.js';

describe('BaseClient', () => {
  describe('get', () => {
    it('sends GET with correct URL, method, and headers', async () => {
      const { fetch, calls } = createMockFetch({ body: { id: 1 } });
      const client = new BaseClient(createTestConfig(fetch));

      await client.get('/contacts/1');

      expect(calls).toHaveLength(1);
      expect(calls[0].url).toBe('https://api.churchsuite.com/contacts/1');
      expect(calls[0].method).toBe('GET');
      expect(calls[0].headers).toMatchObject({
        'X-Account': 'test-account',
        'X-Application': 'test-app',
        'X-Auth': 'test-api-key',
        'Content-Type': 'application/json',
      });
    });

    it('builds query string from params', async () => {
      const { fetch, calls } = createMockFetch({ body: [] });
      const client = new BaseClient(createTestConfig(fetch));

      await client.get('/contacts', { page: 1, per_page: 25 });

      const url = new URL(calls[0].url);
      expect(url.searchParams.get('page')).toBe('1');
      expect(url.searchParams.get('per_page')).toBe('25');
    });

    it('strips undefined and null params', async () => {
      const { fetch, calls } = createMockFetch({ body: [] });
      const client = new BaseClient(createTestConfig(fetch));

      await client.get('/contacts', { page: 1, status: undefined, tag: null });

      const url = new URL(calls[0].url);
      expect(url.searchParams.get('page')).toBe('1');
      expect(url.searchParams.has('status')).toBe(false);
      expect(url.searchParams.has('tag')).toBe(false);
    });
  });

  describe('post', () => {
    it('sends POST with JSON body', async () => {
      const { fetch, calls } = createMockFetch({ body: { id: 2 } });
      const client = new BaseClient(createTestConfig(fetch));
      const payload = { first_name: 'Alice', last_name: 'Smith' };

      await client.post('/contacts', payload);

      expect(calls[0].method).toBe('POST');
      expect(calls[0].body).toEqual(payload);
    });
  });

  describe('put', () => {
    it('sends PUT with JSON body', async () => {
      const { fetch, calls } = createMockFetch({ body: { id: 1 } });
      const client = new BaseClient(createTestConfig(fetch));
      const payload = { first_name: 'Bob' };

      await client.put('/contacts/1', payload);

      expect(calls[0].method).toBe('PUT');
      expect(calls[0].body).toEqual(payload);
    });
  });

  describe('delete', () => {
    it('sends DELETE and returns void', async () => {
      const { fetch, calls } = createMockFetch({ status: 204 });
      const client = new BaseClient(createTestConfig(fetch));

      const result = await client.delete('/contacts/1');

      expect(calls[0].method).toBe('DELETE');
      expect(result).toBeUndefined();
    });
  });

  describe('custom baseUrl', () => {
    it('uses the configured baseUrl', async () => {
      const { fetch, calls } = createMockFetch({ body: {} });
      const config = {
        ...createTestConfig(fetch),
        baseUrl: 'https://custom.example.com/api',
      };
      const client = new BaseClient(config);

      await client.get('/contacts');

      expect(calls[0].url).toBe('https://custom.example.com/contacts');
    });
  });
});
