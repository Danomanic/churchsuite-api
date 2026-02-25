import type { BaseClient } from '../../http/base-client.js';
import { EventsResource } from './events.js';
import { CategoriesResource } from './categories.js';

export class CalendarModule {
  readonly events: EventsResource;
  readonly categories: CategoriesResource;

  constructor(client: BaseClient) {
    this.events = new EventsResource(client);
    this.categories = new CategoriesResource(client);
  }
}
