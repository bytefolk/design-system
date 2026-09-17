# Semantic alignment across products

This contract supplements ADR 0002. The same Ant Design 6 tokens, profiles and
interaction roles apply to RoleWeave, mem and doc. Alignment follows purpose;
it is not a global `text-align` override.

| Content                                                            | Alignment             |
| ------------------------------------------------------------------ | --------------------- |
| Page, card and dialog titles; descriptions and prose               | Start                 |
| Navigation, menus, form labels, input/select values and file names | Start                 |
| Comparable amounts, counts, sizes and durations in columns         | End, tabular numerals |
| Page and dialog trailing action groups                             | End                   |
| Text inside buttons, compact badges and tabs                       | Center                |
| A whole empty collection or panel                                  | Center                |

Use logical start/end so reading direction remains available to consumers.
Keep labels with their controls and put menu shortcuts at the trailing edge.
Do not center prose, code, paths or long selectable values. Marketing hero
composition is separate from a workspace page header. At narrow widths, wrap
the action row below its title without creating horizontal document overflow.

`PageHeader`, card titles, dialog headers and menu items establish start
alignment. `DialogFooter` ends its actions. `ui-actions` is an optional wrapping
trailing action group; `ui-data-number` aligns a comparable numeric cell to the
end with tabular numerals. These classes do not change data or event handling.

## EmptyState

```tsx
<EmptyState
  icon={<FileText />}
  title="No documents yet"
  description="Create a document when you are ready to write."
  action={<Button onClick={createDocument}>Create document</Button>}
/>
```

Props: `icon?: ReactNode`, `title: ReactNode`, `description?: ReactNode`,
`action?: ReactNode`, `compact?: boolean`, plus div attributes and `className`.
The caller owns localized copy, permissions and the action. An empty state
contains one title, at most one explanation and one primary next action. A
parent panel must not repeat the same empty message around it. Hide controls
that cannot operate without a selected item; keep relevant navigation available.
Loading, errors and permission denial are distinct states, not empty success.

Stable classes: `ui-empty-state`, `ui-empty-state--compact`,
`ui-empty-state__icon`, `ui-empty-state__title`,
`ui-empty-state__description`, `ui-empty-state__action`.

The icon is decorative and 32px; the title is 14px/600; description is 14px with
1.5 line height and a 28rem maximum width. Icon/title, title/description and
description/action spacing is 12/8/16px. Padding is 48px vertical/24px horizontal,
or 24px/16px for a compact panel. Use existing semantic foreground and spacing
tokens. No fixed page height, border, shadow or product-specific illustration is
imposed by this pattern.

## Consumer migration

Do not require a not-yet-published package build or change a product's React
major for a layout correction. A temporary local adapter may follow the props,
class structure and spacing above using the consumer's existing semantic tokens.
Record that boundary and replace the adapter when the compatible package ships.

Palette values remain owned by `tokens/design-tokens.json`. A consumer with a
different variable format may generate a compatibility stylesheet from a pinned
snapshot, provided it records the upstream commit/license and checks the generated
output. Never hand-maintain a second palette. Preserve the user's theme choice.

Verify both themes and every shipped profile: normal/hover/disabled/focus,
desktop/narrow, empty/populated, long labels, numeric columns and keyboard use.
For visible text, target at least 4.5:1 with its actual composited background;
do not use the documented decorative-icon exceptions as permission for faint
button labels. The source token contract's existing parity exceptions remain
documented separately until a token change is reviewed.
