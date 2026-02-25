# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2025-02-25

### Added

- `ChurchSuite` client with configurable account, application, and auth headers
- **Account** module: `getModule`, `getProfile`, `whoAmI`
- **Address Book** module:
  - Contacts: `list`, `listAll`, `get`, `create`, `update`, `delete`, `getTags`, `getKeyDates`
  - Tags: `list`, `get`, `getContacts`
  - Flows: `list`, `get`, `getStages`, `getTracking`, `addTracking`
  - Key Dates: `list`, `get`, `getContacts`
- **Calendar** module:
  - Events: `list`, `listAll`, `get` (by ID or identifier)
  - Categories: `list`
- **Children** module: `list`, `listAll`, `get`, `create`, `update`, `delete`, `getTags`, `getKeyDates`, `getGroups`
- **Small Groups** module:
  - Groups: `list`, `listAll`, `get`, `getMembers`, `setMembers`
  - Clusters: `list`, `get`
- **My** module: `getDetails`, `getContacts`, `getChildren`, `getChild`
- **Embed** module (public, no auth): `calendarEvents`, `smallGroups`
- Auto-pagination via async generators (`listAll`)
- Typed error hierarchy: `ChurchSuiteValidationError`, `ChurchSuiteNotFoundError`, `ChurchSuiteHttpError`
- Injectable `fetch` for testing
- Dual ESM + CJS builds with TypeScript declarations

[Unreleased]: https://github.com/Danomanic/churchsuite-api/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/Danomanic/churchsuite-api/releases/tag/v1.0.0
