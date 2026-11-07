# ReadAll — Development Roadmap

This document tracks engineering work that should be completed and verified before the application is presented as production-ready.

## Quality and maintainability

- Add a maintained automated test suite for the API and critical frontend flows.
- Add CI checks for backend syntax, frontend linting and production builds.
- Document supported Node.js and MongoDB versions.
- Add consistent validation and error-response conventions across API routes.

## Account and access workflows

- Verify and complete the password-change and account-recovery flows.
- Review role-based access controls for every administrative endpoint.
- Add rate-limit and authorization regression tests.

## Marketplace workflows

- Add integration tests for catalogue search, categories, cart totals and order lifecycle.
- Verify upload validation, file limits and storage cleanup.
- Confirm that order and payment state changes are server-authoritative and idempotent.

## Release preparation

- Document deployment configuration and required environment variables.
- Configure production secrets in the hosting provider, never in Git.
- Test backup and restore procedures before using real customer data.
- Complete a staging acceptance pass before any production launch.

## Status policy

A roadmap item is complete only after its implementation and verification evidence are recorded. Do not treat planned work as an existing application capability.
