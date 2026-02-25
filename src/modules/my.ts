import type { BaseClient } from '../http/base-client.js';
import type {
  MyDetailsResponse,
  MyContactsResponse,
  MyChildrenResponse,
} from '../types/my.js';
import type { Child } from '../types/children.js';

export class MyModule {
  constructor(private readonly client: BaseClient) {}

  async getDetails(): Promise<MyDetailsResponse> {
    return this.client.get<MyDetailsResponse>('/v1/my/details');
  }

  async getContacts(): Promise<MyContactsResponse> {
    return this.client.get<MyContactsResponse>('/v1/my/contacts');
  }

  async getChildren(): Promise<MyChildrenResponse> {
    return this.client.get<MyChildrenResponse>('/v1/my/children');
  }

  async getChild(id: number): Promise<Child> {
    return this.client.get<Child>(`/v1/my/child/${id}`);
  }
}
