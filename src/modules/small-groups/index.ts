import type { BaseClient } from '../../http/base-client.js';
import { GroupsResource } from './groups.js';
import { ClustersResource } from './clusters.js';

export class SmallGroupsModule {
  readonly groups: GroupsResource;
  readonly clusters: ClustersResource;

  constructor(client: BaseClient) {
    this.groups = new GroupsResource(client);
    this.clusters = new ClustersResource(client);
  }
}
