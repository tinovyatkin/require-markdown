# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**require-markdown** is a lightweight Node.js utility that loads Markdown files as compiled HTML strings synchronously using `require()`. It uses markdown-it as the rendering engine with several plugins enabled (emoji, subscript, superscript, abbreviations, inline comments).

## Commands

```bash
npm test              # Run tests with coverage (c8 + node:test)
npm run lint          # Run oxlint
npm run format        # Format code with oxfmt
npm run format:check  # Check formatting without changes
npm run test:update-snapshots  # Update test snapshots
```

There is no build step - the module is a single ~25-line JavaScript file (`index.js`) that publishes directly.

## Architecture

The entire module is in `index.js`:
- Exports a factory function that accepts optional markdown-it options (defaults to `{ typographer: true }`)
- Returns a function that reads Markdown files synchronously and renders them to HTML
- Resolves relative paths using `module.parent.filename` (relative to the requiring module's directory)
- Renders as block HTML if content contains linefeeds, otherwise renders inline

### Enabled markdown-it plugins
- `markdown-it-inline-comments` - strips inline comments
- `markdown-it-emoji` - emoji support (full variant with shortcuts)
- `markdown-it-sub` - subscript
- `markdown-it-sup` - superscript
- `markdown-it-abbr` - abbreviations

## Testing

- Native `node:test` with `@matteo.collina/snap` for snapshot testing
- `c8` for code coverage (outputs lcov for Codecov)
- Tests in `__tests__/index.test.js`
- Update snapshots with `npm run test:update-snapshots` (sets `SNAP_UPDATE=1`)

## Linting & Formatting

- **oxlint** - Fast linter from oxc project (configured in `oxlint.json`)
- **oxfmt** - Prettier-compatible formatter from oxc project

## Release Process

Releases are automated via GitHub Actions. To publish a new version:
1. Update version in package.json
2. Create and push a git tag matching `v*` (e.g., `git tag v1.2.1 && git push --tags`)
3. GitHub Actions runs lint, format check, tests, and publishes to npm with provenance
