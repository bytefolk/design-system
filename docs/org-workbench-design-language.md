# org-workbench Design Language (summary)

> Consumer documentation for `@fullstack-ai-infra/ui`. Full design language draft lives in the Design
> Lead workspace: `outputs/org-workbench-设计语言草案-2026-08-23.md`. This summary is the repo-anchored
> contract that implementations and reviews refer to.

## 1. Inheritance

org-workbench (file-tree-as-org-chart desktop client) inherits the **Ant Design aligned language**
ruled by [ADR 0002](adr/0002-antd-design-language.md), which supersedes ADR 0001's warm-ivory
Direction C. No new visual language, no raw brand colors: business semantics map onto the existing
semantic token contract, now sourced from `tokens/design-tokens.json` (antd@5 default/dark algorithm
values).

## 2. Semantic token mapping

| org-workbench semantics                                   | Token                                       | Notes                                          |
| --------------------------------------------------------- | ------------------------------------------- | ---------------------------------------------- |
| Canvas / navigation / surface / foreground                | `--ui-canvas/navigation/surface/foreground` | full inheritance                               |
| Node actions (hire/transfer/confirm)                      | `--ui-primary*`                             | human actions, active nav, focus family        |
| Budget bar — healthy segment                              | `--ui-success*`                             | budget within limits                           |
| Budget bar — warning segment                              | `--ui-warning*`                             | threshold (>80%)                               |
| Budget bar — over-budget segment                          | `--ui-danger*`                              | over-budget nodes highlighted, link to reports |
| Escalation along reporting line                           | warning → danger gradient                   | per org-tree.v1 edges                          |
| AI affordances only (`@position`, AIStatus, AI-generated) | `--ui-ai*`                                  | **purple reserved for AI meaning only**        |
| Audit / evidence / contract info                          | `--ui-info*`                                | audit stream, evidence deep links              |
| Removal (laid-off) confirmation                           | `--ui-danger*`                              | second-confirm dialog                          |
| Drag drop target — legal                                  | `--ui-primary-soft` / `--ui-focus`          | legal drop highlight                           |
| Drag drop target — illegal                                | `--ui-danger-soft`                          | reject on drop                                 |
| Apply-rejection reason bar                                | `--ui-danger-soft` + danger text            | stable error code surfaced                     |
| Read-only / no-permission node                            | `--ui-foreground-subtle` + lock icon        | editing disabled                               |

Layout: 60px topbar (`--ui-topbar-height`), 72px module rail (`--ui-rail-width`), organization tree
baseline 288px (`--ui-sidebar-wide`, added in this change), 4px spacing base, radius 4–8px (antd
radius scale), modal the only strong shadow tier, motion 100/200ms (antd `motionDurationFast/Mid`)
with reduced-motion collapse.

**Contrast contract (tokens v3).** Status text on soft backgrounds uses the `-strong` tier and must
clear WCAG AA (4.5:1): `success-strong #237804`, `warning-strong #ad4e00`, `danger-strong #cf1322`
in light — antd's base success/warning/error hues do not reach AA on their own backgrounds, which is
why the strong tier exists. Documented antd-parity deviations: white on `primary #1677ff` (4.1:1,
identical to antd Button) and `info` on `info-soft` (borders/icons only, mirroring antd Alert) are
gated at 3.0:1 (non-text) in tests; `danger` on `danger-soft` measures 2.99:1 — identical to antd
error-on-error-bg — and is deliberately ungated (borders/icons only; text uses `danger-strong`).
`foreground-subtle` mirrors antd tertiary text
(0.45 alpha) and is reserved for decorative/disabled content, excluded from the AA gate.

## 3. Visual direction

File-tree-as-org-chart: the organization tree renders as a file tree — add directory = hire,
move directory = change reporting line, delete = lay off. Folder-family icons distinguish position
types; reporting lines use the border token family; over-budget escalation intensifies warning→danger
up the reporting line and links to the reports center. Purple appears only for AI affordances;
the AI status stays honest (`idle` = no credentials, never fake-online). Failures always carry an
actionable next step (workspace_invalid, org_apply_budget_missing, engine offline).

Icons: Lucide family (Folder / User / Scale / TriangleAlert / ShieldCheck / FileCheck / GitBranch /
History), with accessible names on icon-only controls.

## 4. Component contract — `ui-org-*` family

New primitives pending design-system review, shipped by the client team consuming this package:

| Milestone | Component                                        | Contract / data                                             |
| --------- | ------------------------------------------------ | ----------------------------------------------------------- |
| D1        | OrgTree / OrgTreeNode / PositionCard / BudgetBar | org-tree.v1 / `/positions/:id`                              |
| D2        | OrgTreeDragLayer / BudgetDialog                  | org apply change list (add = hire incl. budget declaration) |
| D3        | PositionMention / TurnThread                     | engine S1 turn contract                                     |
| D4        | EscalationItem / AuditEntry / EvidenceLink       | engine budget stop + reporting seam                         |

**BudgetBar dual-phase contract**: D1 carries budget declarations only — `consumption=null` degrades
the bar to a declaration bar; consumption rendering is driven by engine turn data at D3/D4. This keeps
D1 unblocked by upstream data.

## 5. Edge states (first-pass enumeration)

workspace invalid / empty tree / skeleton loading / apply rejection (rollback) / engine offline /
SSE reconnect w/ version-stamp catch-up / no credentials (AI idle) / read-only positions / empty
reports streams / 401 token expiry. Full states per screen get enumerated by the edge-case pass during
D milestone implementation.

## 6. Review checklist (aligned with ADR 0002)

- New primitives need observable tests (keyboard/axe), both themes, reduced-motion.
- Business repos and `ui-org-*` components consume semantic tokens only — no raw hex.
- React 18 peer, Radix behavioral base (dialog/dropdown-menu), Lucide icons.
- Review slot runs in parallel with D1 implementation (client Lead sign-off).
