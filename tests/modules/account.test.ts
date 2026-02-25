import { BaseClient } from '../../src/http/base-client.js';
import { AccountModule } from '../../src/modules/account.js';
import { createMockFetch, createTestConfig } from '../setup.js';

describe('AccountModule', () => {
  it('getModule calls /v1/module/{id}', async () => {
    const moduleData = { id: 'addressbook', name: 'Address Book' };
    const { fetch, calls } = createMockFetch({ body: moduleData });
    const client = new BaseClient(createTestConfig(fetch));
    const account = new AccountModule(client);

    const result = await account.getModule('addressbook');

    expect(result).toEqual(moduleData);
    expect(calls).toHaveLength(1);
    expect(calls[0].url).toBe(
      'https://api.churchsuite.com/v1/module/addressbook',
    );
    expect(calls[0].method).toBe('GET');
    expect(calls[0].headers['X-Account']).toBe('test-account');
    expect(calls[0].headers['X-Application']).toBe('test-app');
    expect(calls[0].headers['X-Auth']).toBe('test-api-key');
  });

  it('getProfile calls /v1/profile', async () => {
    const profileData = { id: 1, name: 'Test User' };
    const { fetch, calls } = createMockFetch({ body: profileData });
    const client = new BaseClient(createTestConfig(fetch));
    const account = new AccountModule(client);

    const result = await account.getProfile();

    expect(result).toEqual(profileData);
    expect(calls).toHaveLength(1);
    expect(calls[0].url).toBe('https://api.churchsuite.com/v1/profile');
    expect(calls[0].method).toBe('GET');
  });

  it('whoAmI calls /v1/whoami', async () => {
    const whoAmIData = { type: 'api_key', account: 'test-account' };
    const { fetch, calls } = createMockFetch({ body: whoAmIData });
    const client = new BaseClient(createTestConfig(fetch));
    const account = new AccountModule(client);

    const result = await account.whoAmI();

    expect(result).toEqual(whoAmIData);
    expect(calls).toHaveLength(1);
    expect(calls[0].url).toBe('https://api.churchsuite.com/v1/whoami');
    expect(calls[0].method).toBe('GET');
  });
});
