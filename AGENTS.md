# Repository instructions

These instructions apply to the entire repository.

## Product contract

- This repository owns the single shared visual and interaction system for `doc`, `mem`, and future
  `digital-employee` Web applications.
- Keep packages product-neutral. Business routing, authentication, i18n, editors, and domain data
  belong in consumer repositories.
- The design language is Ant Design aligned (ADR 0002): light-first with a switchable dark theme,
  antd@6 default/dark algorithm values as the color baseline, blue `#1677ff` as primary, and purple
  `#722ed1` reserved for AI affordances. The former warm-ivory "Direction C" is deprecated. The
  package aligns to the single antd major running on the org-workbench production line; dual majors
  are rejected.
- Converted primitives (Button, Input, Card, Badge, Skeleton) are facades over antd components
  behind a stable export surface. Theme through `DSProvider` and `tokens/design-tokens.json`; never
  override antd tokens ad hoc in this repository or consumers. Keep facade props narrow to what
  consumers use; pass-through bloat defeats the facade.
- Accessibility, keyboard navigation, reduced motion, and dark theme are required behavior, not
  optional polish.
- React must remain a peer dependency. Do not introduce a React dependency into the
  `digital-employee` runtime.

## Workflow

1. Keep changes scoped to one documented outcome and linked issue.
2. Use a branch and pull request after the initial repository foundation.
3. Add observable tests and visual evidence for behavior changes.
4. Run `npm run check` before a pull request.
5. Never commit credentials, personal data, or consumer-specific content.
6. `tokens/design-tokens.json` is the single token source (ADR 0002). Never hand-edit
   `src/styles/tokens.css`; change the JSON and rerun `npm run tokens:generate`, committing both.
