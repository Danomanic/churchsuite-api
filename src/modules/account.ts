import type { BaseClient } from '../http/base-client.js';
import type { Module, Profile, WhoAmI } from '../types/account.js';

export class AccountModule {
  constructor(private readonly client: BaseClient) {}

  async getModule(moduleId: string): Promise<Module> {
    return this.client.get<Module>(`/v1/module/${moduleId}`);
  }

  async getProfile(): Promise<Profile> {
    return this.client.get<Profile>('/v1/profile');
  }

  async whoAmI(): Promise<WhoAmI> {
    return this.client.get<WhoAmI>('/v1/whoami');
  }
}
