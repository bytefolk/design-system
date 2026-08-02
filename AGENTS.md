# Repository instructions

These instructions apply to the entire repository.

## Product contract

- This repository owns the single shared visual and interaction system for `doc`, `mem`, and future
  `digital-employee` Web applications.
- Keep packages product-neutral. Business routing, authentication, i18n, editors, and domain data
  belong in consumer repositories.
- The approved C direction is light-first and paper-centered: warm ivory canvas, stone navigation,
  charcoal text, sage as the primary accent, and lavender reserved for AI affordances.
- Accessibility, keyboard navigation, reduced motion, and dark theme are required behavior, not
  optional polish.
- React must remain a peer dependency. Do not introduce a React dependency into the
  `digital-employee` runtime.

## Workflow

1. Keep changes scoped to one documented outcome and linked issue.
2. Use a branch and pull request after the initial repository foundation.
3. Add observable tests and visual evidence for behavior changes.
4. Run `npm run check` before a pull request.
5. Never commit credentials, personal data, generated output, or consumer-specific content.
