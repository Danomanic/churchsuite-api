# Contributing

Thanks for your interest in contributing to `churchsuite-api`!

## Development Setup

```bash
git clone https://github.com/Danomanic/churchsuite-api.git
cd churchsuite-api
npm install
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run lint` | Type-check with TypeScript |
| `npm test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage |
| `npm run build` | Build ESM + CJS + declarations |

## Pull Request Process

1. Fork the repo and create your branch from `main`
2. Add tests for any new functionality
3. Ensure `npm run lint && npm test` passes
4. Keep PRs focused — one feature or fix per PR
5. Update types if you change any API interfaces

## Code Style

- TypeScript strict mode
- No runtime dependencies
- Follow existing patterns in the codebase

## Reporting Issues

Use the GitHub issue templates for bug reports and feature requests.
