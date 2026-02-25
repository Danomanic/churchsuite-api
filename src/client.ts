import type { ChurchSuiteConfig } from './types/config.js';
import { BaseClient } from './http/base-client.js';
import { AccountModule } from './modules/account.js';
import { AddressBookModule } from './modules/address-book/index.js';
import { CalendarModule } from './modules/calendar/index.js';
import { ChildrenModule } from './modules/children/index.js';
import { SmallGroupsModule } from './modules/small-groups/index.js';
import { MyModule } from './modules/my.js';
import { EmbedModule } from './modules/embed.js';

export class ChurchSuite {
  readonly account: AccountModule;
  readonly addressBook: AddressBookModule;
  readonly calendar: CalendarModule;
  readonly children: ChildrenModule;
  readonly smallGroups: SmallGroupsModule;
  readonly my: MyModule;
  readonly embed: EmbedModule;

  constructor(config: ChurchSuiteConfig) {
    const client = new BaseClient(config);
    this.account = new AccountModule(client);
    this.addressBook = new AddressBookModule(client);
    this.calendar = new CalendarModule(client);
    this.children = new ChildrenModule(client);
    this.smallGroups = new SmallGroupsModule(client);
    this.my = new MyModule(client);
    this.embed = new EmbedModule(config);
  }
}
