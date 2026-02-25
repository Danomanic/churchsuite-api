import type { BaseClient } from '../../http/base-client.js';
import type {
  Contact,
  ContactListParams,
  ContactListResponse,
  CreateContactData,
  UpdateContactData,
  ContactTagsResponse,
  ContactKeyDatesResponse,
} from '../../types/address-book.js';

export class ContactsResource {
  constructor(private readonly client: BaseClient) {}

  async list(params?: ContactListParams): Promise<ContactListResponse> {
    return this.client.get<ContactListResponse>(
      '/v1/addressbook/contacts',
      params as Record<string, unknown>,
    );
  }

  async *listAll(
    params?: Omit<ContactListParams, 'page'>,
  ): AsyncGenerator<Contact> {
    let page = 1;
    while (true) {
      const response = await this.list({ ...params, page });
      for (const contact of response.contacts) {
        yield contact;
      }
      if (
        response.contacts.length === 0 ||
        response.contacts.length < (response.pagination.per_page ?? 50)
      ) {
        break;
      }
      page++;
    }
  }

  async get(id: number): Promise<Contact> {
    return this.client.get<Contact>(`/v1/addressbook/contact/${id}`);
  }

  async create(data: CreateContactData): Promise<Contact> {
    return this.client.post<Contact>('/v1/addressbook/contacts', data);
  }

  async update(id: number, data: UpdateContactData): Promise<Contact> {
    return this.client.put<Contact>(`/v1/addressbook/contact/${id}`, data);
  }

  async delete(id: number): Promise<void> {
    return this.client.delete(`/v1/addressbook/contact/${id}`);
  }

  async getTags(id: number): Promise<ContactTagsResponse> {
    return this.client.get<ContactTagsResponse>(
      `/v1/addressbook/contact/${id}/tags`,
    );
  }

  async getKeyDates(id: number): Promise<ContactKeyDatesResponse> {
    return this.client.get<ContactKeyDatesResponse>(
      `/v1/addressbook/contact/${id}/keydates`,
    );
  }
}
