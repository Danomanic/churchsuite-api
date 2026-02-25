import type { BaseClient } from '../../http/base-client.js';
import { ChildrenResource } from './children-resource.js';

export class ChildrenModule {
  readonly children: ChildrenResource;

  constructor(client: BaseClient) {
    this.children = new ChildrenResource(client);
  }
}

export { ChildrenResource };
