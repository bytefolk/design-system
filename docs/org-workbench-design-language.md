# org-workbench Design Language (summary)

> Consumer documentation for `@fullstack-ai-infra/ui`. Full design language draft lives in the Design
> Lead workspace: `outputs/org-workbench-设计语言草案-2026-08-23.md`. This summary is the repo-anchored
> contract that implementations and reviews refer to.

## 1. Inheritance

org-workbench (file-tree-as-org-chart desktop client) inherits **Direction C — Warm Agent Workspace**
(see [ADR 0001](adr/0001-warm-agent-workspace.md)). No new visual language, no raw brand colors:
business semantics map onto the existing semantic token contract.

## 2. Semantic token mapping

| org-workbench semantics                                   | Token                                       | Notes                                          |
| --------------------------------------------------------- | ------------------------------------------- | ---------------------------------------------- |
| Canvas / navigation / surface / foreground                | `--ui-canvas/navigation/surface/foreground` | full inheritance                               |
| Node actions (hire/transfer/confirm)                      | `--ui-primary*`                             | human actions, active nav, focus family        |
| Budget bar — healthy segment                              | `--ui-success*`                             | budget within limits                           |
| Budget bar — warning segment                              | `--ui-warning*`                             | threshold (>80%)                               |
| Budget bar — over-budget segment                          | `--ui-danger*`                              | over-budget nodes highlighted, link to reports |
| Escalation along reporting line                           | warning → danger gradient                   | per org-tree.v1 edges                          |
| AI affordances only (`@position`, AIStatus, AI-generated) | `--ui-ai*`                                  | **lavender reserved for AI meaning only**      |
| Audit / evidence / contract info                          | `--ui-info*`                                | audit stream, evidence deep links              |
| Removal (laid-off) confirmation                           | `--ui-danger*`                              | second-confirm dialog                          |
| Drag drop target — legal                                  | `--ui-primary-soft` / `--ui-focus`          | legal drop highlight                           |
| Drag drop target — illegal                                | `--ui-danger-soft`                          | reject on drop                                 |
| Apply-rejection reason bar                                | `--ui-danger-soft` + danger text            | stable error code surfaced                     |
| Read-only / no-permission node                            | `--ui-foreground-subtle` + lock icon        | editing disabled                               |

Layout: 60px topbar (`--ui-topbar-height`), 72px module rail (`--ui-rail-width`), organization tree
baseline 288px (`--ui-sidebar-wide`, added in this change), 4px spacing base, radius 6–18px, modal the
only strong shadow tier, motion 120/180ms with reduced-motion collapse.

## 3. Visual direction

File-tree-as-org-chart: the organization tree renders as a file tree — add directory = hire,
move directory = change reporting line, delete = lay off. Folder-family icons distinguish position
types; reporting lines use the border token family; over-budget escalation intensifies warning→danger
up the reporting line and links to the reports center. Lavender appears only for AI affordances;
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

## 6. Review checklist (aligned with ADR 0001)

- New primitives need observable tests (keyboard/axe), both themes, reduced-motion.
- Business repos and `ui-org-*` components consume semantic tokens only — no raw hex.
- React 18 peer, Radix behavioral base (dialog/dropdown-menu), Lucide icons.
- Review slot runs in parallel with D1 implementation (client Lead sign-off).
