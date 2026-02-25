import { ChurchSuite } from '../../src/client.js';
import { AccountModule } from '../../src/modules/account.js';
import { AddressBookModule } from '../../src/modules/address-book/index.js';
import { CalendarModule } from '../../src/modules/calendar/index.js';
import { ChildrenModule } from '../../src/modules/children/index.js';
import { SmallGroupsModule } from '../../src/modules/small-groups/index.js';
import { MyModule } from '../../src/modules/my.js';
import { EmbedModule } from '../../src/modules/embed.js';
import { createMockFetch, createTestConfig } from '../setup.js';

describe('ChurchSuite', () => {
  function createClient() {
    const { fetch } = createMockFetch();
    return new ChurchSuite(createTestConfig(fetch));
  }

  it('exposes all top-level modules', () => {
    const cs = createClient();

    expect(cs.account).toBeInstanceOf(AccountModule);
    expect(cs.addressBook).toBeInstanceOf(AddressBookModule);
    expect(cs.calendar).toBeInstanceOf(CalendarModule);
    expect(cs.children).toBeInstanceOf(ChildrenModule);
    expect(cs.smallGroups).toBeInstanceOf(SmallGroupsModule);
    expect(cs.my).toBeInstanceOf(MyModule);
    expect(cs.embed).toBeInstanceOf(EmbedModule);
  });

  it('addressBook has sub-resources', () => {
    const cs = createClient();

    expect(cs.addressBook.contacts).toBeDefined();
    expect(cs.addressBook.tags).toBeDefined();
    expect(cs.addressBook.flows).toBeDefined();
    expect(cs.addressBook.keyDates).toBeDefined();
  });

  it('calendar has sub-resources', () => {
    const cs = createClient();

    expect(cs.calendar.events).toBeDefined();
    expect(cs.calendar.categories).toBeDefined();
  });

  it('smallGroups has sub-resources', () => {
    const cs = createClient();

    expect(cs.smallGroups.groups).toBeDefined();
    expect(cs.smallGroups.clusters).toBeDefined();
  });
});
