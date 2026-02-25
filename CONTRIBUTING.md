# Contributing

Thanks for your interest in contributing to `churchsuite-api`! This guide covers everything you need to get started.

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm

### Setup

```bash
git clone https://github.com/Danomanic/churchsuite-api.git
cd churchsuite-api
npm install
```

### Scripts

| Command | Description |
|---|---|
| `npm run lint` | Type-check with TypeScript (strict mode) |
| `npm test` | Run all tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run build` | Build ESM + CJS + type declarations |

## Making Changes

### Branching

Create a feature branch from `main`:

```bash
git checkout -b feat/my-feature
```

Use descriptive branch prefixes:

- `feat/` -- new features
- `fix/` -- bug fixes
- `docs/` -- documentation changes
- `refactor/` -- code changes that don't fix bugs or add features

### Writing Code

- **TypeScript strict mode** -- the project uses strict compiler settings, so all code must pass strict type checking
- **No runtime dependencies** -- this package ships with zero dependencies; keep it that way
- **Follow existing patterns** -- look at how similar modules are structured and match that style
- **Keep changes focused** -- one feature or fix per PR

### Writing Tests

- Every new module method needs a test
- Tests use [Vitest](https://vitest.dev) with the `createMockFetch` helper from `tests/setup.ts`
- Test files mirror the source structure: `src/modules/calendar/events.ts` -> `tests/modules/calendar/events.test.ts`
- Tests should verify: URL construction, HTTP method, headers, query params, request body, and response parsing

### Running Checks

Before submitting a PR, make sure everything passes:

```bash
npm run lint && npm test
```

CI will also run the full matrix (Node 18, 20, 22) on your PR.

## Pull Request Process

1. Fork the repo and create your branch from `main`
2. Make your changes with tests
3. Ensure `npm run lint && npm test` passes locally
4. Push your branch and open a PR against `main`
5. Fill in the PR description with what changed and why
6. Wait for CI checks to pass and a review

### PR Guidelines

- Keep PRs small and focused
- Update type definitions if you change any API interfaces
- Add a line to [CHANGELOG.md](CHANGELOG.md) under the `Unreleased` section
- Squash merge is enforced -- your PR title becomes the commit message, so make it descriptive

## Reporting Issues

Use the [GitHub issue templates](https://github.com/Danomanic/churchsuite-api/issues/new/choose):

- **Bug report** -- for something that isn't working
- **Feature request** -- for new functionality

## Questions?

Open a [discussion](https://github.com/Danomanic/churchsuite-api/issues) if you have questions about contributing.
