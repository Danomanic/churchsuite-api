# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1](https://github.com/Danomanic/churchsuite-api/compare/v1.0.0...v1.0.1) (2026-04-19)


### Features

* add dependabot ([#1](https://github.com/Danomanic/churchsuite-api/issues/1)) ([6531305](https://github.com/Danomanic/churchsuite-api/commit/65313054eaa01b79c5ea05943cb7e5556a99dfbe))


### Build System & Dependencies

* **deps:** bump picomatch from 4.0.3 to 4.0.4 in the npm_and_yarn group across 1 directory ([#2](https://github.com/Danomanic/churchsuite-api/issues/2)) ([236269e](https://github.com/Danomanic/churchsuite-api/commit/236269ea398fc0342b40fb9c9486cfdd55a5ed6c))
* **deps:** bump vite from 7.3.1 to 7.3.2 in the npm_and_yarn group across 1 directory ([#3](https://github.com/Danomanic/churchsuite-api/issues/3)) ([6fa70bd](https://github.com/Danomanic/churchsuite-api/commit/6fa70bd7c69232c75d1488640b762acaf4b9a00c))


### Continuous Integration

* replace tag-triggered release workflow with release-please ([12976c0](https://github.com/Danomanic/churchsuite-api/commit/12976c076c734d03d8120cd4acc05ca912adeb31))

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
