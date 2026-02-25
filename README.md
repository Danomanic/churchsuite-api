# churchsuite-api

[![CI](https://github.com/Danomanic/churchsuite-api/actions/workflows/ci.yml/badge.svg)](https://github.com/Danomanic/churchsuite-api/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/churchsuite-api)](https://www.npmjs.com/package/churchsuite-api)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Unofficial TypeScript SDK for the [ChurchSuite API](https://github.com/ChurchSuite/churchsuite-api). Zero runtime dependencies -- uses native `fetch`.

> **Note:** This package is not affiliated with or endorsed by ChurchSuite. It is a community-maintained wrapper around their public API.

## Install

```bash
npm install churchsuite-api
```

Requires Node.js 18 or later.

## Quick Start

```ts
import { ChurchSuite } from 'churchsuite-api';

const cs = new ChurchSuite({
  account: 'your-account',     // X-Account header
  application: 'my-app',       // X-Application header
  auth: 'your-api-key',        // X-Auth header
});

// List contacts
const { contacts } = await cs.addressBook.contacts.list({ q: 'John' });

// Get a single contact
const contact = await cs.addressBook.contacts.get(42);

// Create a contact
const newContact = await cs.addressBook.contacts.create({
  first_name: 'Joe',
  last_name: 'Bloggs',
});

// Auto-paginate through all results
for await (const contact of cs.addressBook.contacts.listAll()) {
  console.log(contact.first_name);
}
```

## Configuration

```ts
interface ChurchSuiteConfig {
  account: string;          // Your ChurchSuite account identifier
  application: string;      // Your application name
  auth?: string;            // API key or login token
  baseUrl?: string;         // Override API base URL (default: https://api.churchsuite.com/v1)
  fetch?: typeof fetch;     // Override fetch implementation (useful for testing)
}
```

## API Reference

### Account

```ts
cs.account.getModule('addressbook');    // Get module details
cs.account.getProfile();                // Get current user profile
cs.account.whoAmI();                    // Get current authentication info
```

### Address Book

#### Contacts

```ts
cs.addressBook.contacts.list({ q: 'John', page: 1 });
cs.addressBook.contacts.listAll({ q: 'Smith' });        // async generator
cs.addressBook.contacts.get(42);
cs.addressBook.contacts.create({ first_name: 'Joe', last_name: 'Bloggs' });
cs.addressBook.contacts.update(42, { first_name: 'Jane' });
cs.addressBook.contacts.delete(42);
cs.addressBook.contacts.getTags(42);
cs.addressBook.contacts.getKeyDates(42);
```

#### Tags

```ts
cs.addressBook.tags.list();
cs.addressBook.tags.get(5);
cs.addressBook.tags.getContacts(5, { page: 1 });
```

#### Flows

```ts
cs.addressBook.flows.list();
cs.addressBook.flows.get(3);
cs.addressBook.flows.getStages(3);
cs.addressBook.flows.getTracking(3);
cs.addressBook.flows.addTracking(3, { contact_id: 42 });
```

#### Key Dates

```ts
cs.addressBook.keyDates.list();
cs.addressBook.keyDates.get(7);
cs.addressBook.keyDates.getContacts(7);
```

### Calendar

#### Events

```ts
cs.calendar.events.list({ date_start: '2025-01-01' });
cs.calendar.events.listAll({ category_id: 2 });         // async generator
cs.calendar.events.get(10);                              // by ID
cs.calendar.events.get('abc123');                         // by identifier
```

#### Categories

```ts
cs.calendar.categories.list();
```

### Children

```ts
cs.children.children.list({ q: 'Emma' });
cs.children.children.listAll();                          // async generator
cs.children.children.get(15);
cs.children.children.create({ first_name: 'Emma', last_name: 'Smith' });
cs.children.children.update(15, { first_name: 'Emily' });
cs.children.children.delete(15);
cs.children.children.getTags(15);
cs.children.children.getKeyDates(15);
cs.children.children.getGroups(15);
```

### Small Groups

#### Groups

```ts
cs.smallGroups.groups.list({ view: 'active' });
cs.smallGroups.groups.listAll();                         // async generator
cs.smallGroups.groups.get(8);
cs.smallGroups.groups.getMembers(8);
cs.smallGroups.groups.setMembers(8, {
  members: [{ contact_id: 42, roles: 'leader' }],
});
```

#### Clusters

```ts
cs.smallGroups.clusters.list();
cs.smallGroups.clusters.get(2);
```

### My

```ts
cs.my.getDetails();
cs.my.getContacts();
cs.my.getChildren();
cs.my.getChild(15);
```

### Embed (Public, No Auth)

The embed module accesses public-facing endpoints that don't require authentication.

```ts
const events = await cs.embed.calendarEvents({ num_results: 10 });
const groups = await cs.embed.smallGroups({ cluster_id: 2 });
```

## Auto-Pagination

Resources with paginated list endpoints expose a `listAll()` method that returns an async generator. It handles page iteration automatically, so you can iterate through every result without managing pages yourself.

```ts
for await (const contact of cs.addressBook.contacts.listAll({ q: 'Smith' })) {
  console.log(contact.id, contact.first_name);
}

// Or collect into an array
const allEvents: Event[] = [];
for await (const event of cs.calendar.events.listAll()) {
  allEvents.push(event);
}
```

## Error Handling

All API errors throw typed exceptions that you can catch and inspect.

```ts
import {
  ChurchSuiteHttpError,
  ChurchSuiteNotFoundError,
  ChurchSuiteValidationError,
} from 'churchsuite-api';

try {
  await cs.addressBook.contacts.get(999999);
} catch (error) {
  if (error instanceof ChurchSuiteNotFoundError) {
    // 404 - resource not found
    console.log(error.status);  // 404
  } else if (error instanceof ChurchSuiteValidationError) {
    // 400 - validation failed
    console.log(error.errors);  // { field: ['message'] }
  } else if (error instanceof ChurchSuiteHttpError) {
    // Any other HTTP error
    console.log(error.status, error.message);
  }
}
```

| HTTP Status | Error Class | Properties |
|---|---|---|
| 400 | `ChurchSuiteValidationError` | `status`, `body`, `errors` |
| 404 | `ChurchSuiteNotFoundError` | `status`, `body` |
| Other | `ChurchSuiteHttpError` | `status`, `body` |

## Testing Your Code

You can inject a custom `fetch` to mock API calls in your own tests:

```ts
const cs = new ChurchSuite({
  account: 'test',
  application: 'test',
  auth: 'test-key',
  fetch: myMockFetch,
});
```

## Requirements

- Node.js >= 18
- TypeScript >= 5.0 (for type-only consumers)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup, scripts, and PR guidelines.

## Security

See [SECURITY.md](SECURITY.md) for how to report vulnerabilities.

## License

[MIT](LICENSE)
