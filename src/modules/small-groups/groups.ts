import type { BaseClient } from '../../http/base-client.js';
import type {
  Group,
  GroupListParams,
  GroupListResponse,
  GroupMembersResponse,
  SetMembersData,
} from '../../types/small-groups.js';

export class GroupsResource {
  constructor(private readonly client: BaseClient) {}

  async list(params?: GroupListParams): Promise<GroupListResponse> {
    return this.client.get<GroupListResponse>(
      '/v1/smallgroups/groups',
      params as Record<string, unknown>,
    );
  }

  async *listAll(
    params?: Omit<GroupListParams, 'page'>,
  ): AsyncGenerator<Group> {
    let page = 1;
    while (true) {
      const response = await this.list({ ...params, page });
      for (const group of response.groups) {
        yield group;
      }
      if (
        response.groups.length === 0 ||
        response.groups.length < (response.pagination.per_page ?? 50)
      ) {
        break;
      }
      page++;
    }
  }

  async get(id: number): Promise<Group> {
    return this.client.get<Group>(`/v1/smallgroups/group/${id}`);
  }

  async getMembers(id: number): Promise<GroupMembersResponse> {
    return this.client.get<GroupMembersResponse>(
      `/v1/smallgroups/group/${id}/members`,
    );
  }

  async setMembers(
    id: number,
    data: SetMembersData,
  ): Promise<GroupMembersResponse> {
    return this.client.post<GroupMembersResponse>(
      `/v1/smallgroups/group/${id}/members`,
      data,
    );
  }
}
