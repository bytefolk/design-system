# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

- Establish the C “Warm Agent Workspace” semantic palette for light and dark themes.
- Add the Tailwind preset and eight accessible React primitives.
- Add shared application-shell, navigation, page-header, AI, and source-status patterns.
- Add a responsive Vite showcase for Digital Employees, Memory, and Docs.
- Add unit, accessibility, keyboard, build, and browser screenshot validation.
- Make screenshot baselines portable by bundling the showcase font and capturing a fixed viewport.
- Validate the published tarball from a clean TypeScript/React 18/Tailwind consumer.
- Document the design decision and Next.js RSC/Vite consumption boundaries.
- Build distributable files automatically during npm packaging and force public scoped-package access.
- Add npm repository metadata and stable public documentation links.
- Keep the clean tarball consumer executable inside an npm publish dry run.
- Ship ESM and CommonJS entry points so Next.js 14 and Tailwind 3 configuration loaders can consume the preset.
