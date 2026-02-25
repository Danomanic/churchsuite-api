import type { BaseClient } from '../../http/base-client.js';
import type {
  Child,
  ChildListParams,
  ChildListResponse,
  CreateChildData,
  UpdateChildData,
  ChildTagsResponse,
  ChildKeyDatesResponse,
  ChildGroupsResponse,
} from '../../types/children.js';

export class ChildrenResource {
  constructor(private readonly client: BaseClient) {}

  async list(params?: ChildListParams): Promise<ChildListResponse> {
    return this.client.get<ChildListResponse>(
      '/v1/children/children',
      params as Record<string, unknown>,
    );
  }

  async *listAll(
    params?: Omit<ChildListParams, 'page'>,
  ): AsyncGenerator<Child> {
    let page = 1;
    while (true) {
      const response = await this.list({ ...params, page });
      for (const child of response.children) {
        yield child;
      }
      if (
        response.children.length === 0 ||
        response.children.length < (response.pagination.per_page ?? 50)
      ) {
        break;
      }
      page++;
    }
  }

  async get(id: number): Promise<Child> {
    return this.client.get<Child>(`/v1/children/child/${id}`);
  }

  async create(data: CreateChildData): Promise<Child> {
    return this.client.post<Child>('/v1/children/children', data);
  }

  async update(id: number, data: UpdateChildData): Promise<Child> {
    return this.client.put<Child>(`/v1/children/child/${id}`, data);
  }

  async delete(id: number): Promise<void> {
    return this.client.delete(`/v1/children/child/${id}`);
  }

  async getTags(id: number): Promise<ChildTagsResponse> {
    return this.client.get<ChildTagsResponse>(
      `/v1/children/child/${id}/tags`,
    );
  }

  async getKeyDates(id: number): Promise<ChildKeyDatesResponse> {
    return this.client.get<ChildKeyDatesResponse>(
      `/v1/children/child/${id}/keydates`,
    );
  }

  async getGroups(id: number): Promise<ChildGroupsResponse> {
    return this.client.get<ChildGroupsResponse>(
      `/v1/children/child/${id}/groups`,
    );
  }
}
