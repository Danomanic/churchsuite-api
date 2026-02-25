import type { BaseClient } from '../../http/base-client.js';
import { ContactsResource } from './contacts.js';
import { TagsResource } from './tags.js';
import { FlowsResource } from './flows.js';
import { KeyDatesResource } from './key-dates.js';

export class AddressBookModule {
  readonly contacts: ContactsResource;
  readonly tags: TagsResource;
  readonly flows: FlowsResource;
  readonly keyDates: KeyDatesResource;

  constructor(client: BaseClient) {
    this.contacts = new ContactsResource(client);
    this.tags = new TagsResource(client);
    this.flows = new FlowsResource(client);
    this.keyDates = new KeyDatesResource(client);
  }
}
