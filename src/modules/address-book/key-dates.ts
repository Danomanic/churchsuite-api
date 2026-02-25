import type { BaseClient } from '../../http/base-client.js';
import type {
  KeyDate,
  KeyDateListResponse,
  KeyDateContactsParams,
  KeyDateContactsResponse,
} from '../../types/address-book.js';

export class KeyDatesResource {
  constructor(private readonly client: BaseClient) {}

  async list(): Promise<KeyDateListResponse> {
    return this.client.get<KeyDateListResponse>('/v1/addressbook/keydates');
  }

  async get(id: number): Promise<KeyDate> {
    return this.client.get<KeyDate>(`/v1/addressbook/keydate/${id}`);
  }

  async getContacts(
    id: number,
    params?: KeyDateContactsParams,
  ): Promise<KeyDateContactsResponse> {
    return this.client.get<KeyDateContactsResponse>(
      `/v1/addressbook/keydate/${id}/contacts`,
      params as Record<string, unknown>,
    );
  }
}
