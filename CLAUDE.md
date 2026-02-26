# CLAUDE.md — AI Assistant Guide for money-press

## Project Overview

**money-press** is a dropshipping company project. This repository is in its earliest stage — only a README exists. No tech stack, framework, or source code has been committed yet.

## Current Repository State

```
money-press/
├── .git/
├── README.md       # "money-press — dropshipping company"
└── CLAUDE.md       # This file
```

- **Single commit:** `454ed35` — "Initial commit"
- **Language/Framework:** Not yet established
- **Dependencies:** None
- **Tests:** None
- **CI/CD:** None

## Development Branch

The active development branch is:

```
claude/claude-md-mm2mnu1wdd9474mi-a5IGM
```

Always develop on the designated `claude/` branch. Never push to `main` or `master` without explicit permission.

## Git Workflow

```bash
# Push changes
git push -u origin claude/claude-md-mm2mnu1wdd9474mi-a5IGM

# If push fails due to network error, retry with exponential backoff:
# 2s → 4s → 8s → 16s
```

- Write clear, descriptive commit messages
- Commit and push when changes are complete
- Create the branch locally first if it does not exist

## Conventions to Follow (When Code is Added)

Since no stack has been chosen yet, the following are placeholder conventions to apply once the project is initialized:

### General
- Keep the codebase minimal — only add what is needed for the current task
- No over-engineering; avoid premature abstractions
- Validate only at system boundaries (user input, external APIs)
- No backwards-compatibility hacks for code that is not yet in use

### Code Style
- Follow the conventions of whatever language/framework is adopted
- Use linting and formatting tools standard to that ecosystem
- Do not add docstrings or comments to code you did not change

### Security
- Never commit secrets, credentials, or `.env` files
- Sanitize all user input before use
- Avoid OWASP Top 10 vulnerabilities (injection, XSS, CSRF, etc.)

### Testing
- Write tests for new features once a testing framework is established
- Run tests before committing

## Next Steps for the Project

When development begins, update this file with:

1. **Tech stack** — language, framework, runtime version
2. **Setup instructions** — how to install dependencies and run locally
3. **Development scripts** — `npm run dev`, `make serve`, etc.
4. **Test commands** — how to run the test suite
5. **Environment variables** — list required vars (use `.env.example`)
6. **Directory structure** — explain what lives in each top-level folder
7. **Deployment** — how the app is built and shipped

## Updating This File

Keep this file current as the project evolves. After any major structural change (new framework, new directory layout, new scripts), update the relevant sections here so future AI sessions have accurate context.
