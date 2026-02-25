import type { BaseClient } from '../../http/base-client.js';
import type { Cluster, ClusterListResponse } from '../../types/small-groups.js';

export class ClustersResource {
  constructor(private readonly client: BaseClient) {}

  async list(): Promise<ClusterListResponse> {
    return this.client.get<ClusterListResponse>('/v1/smallgroups/clusters');
  }

  async get(id: number): Promise<Cluster> {
    return this.client.get<Cluster>(`/v1/smallgroups/cluster/${id}`);
  }
}
