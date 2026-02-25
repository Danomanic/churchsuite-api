import type { BaseClient } from '../../http/base-client.js';
import type {
  Tag,
  TagListResponse,
  TagContactsParams,
  TagContactsResponse,
} from '../../types/address-book.js';

export class TagsResource {
  constructor(private readonly client: BaseClient) {}

  async list(): Promise<TagListResponse> {
    return this.client.get<TagListResponse>('/v1/addressbook/tags');
  }

  async get(id: number): Promise<Tag> {
    return this.client.get<Tag>(`/v1/addressbook/tag/${id}`);
  }

  async getContacts(
    id: number,
    params?: TagContactsParams,
  ): Promise<TagContactsResponse> {
    return this.client.get<TagContactsResponse>(
      `/v1/addressbook/tag/${id}/contacts`,
      params as Record<string, unknown>,
    );
  }
}
