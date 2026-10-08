# Design

Same system as the TimeBlocks desktop widget. Black and white only, 1px borders, square corners.

## Type

UI text uses Inter, then Segoe UI, then the system sans.

`"Inter", "Segoe UI", sans-serif`

Weights: 400, 500, 600. Base size 14px. Line height 1.35.

The clock, planned minutes, and actual minutes use IBM Plex Mono, then Consolas.

`"IBM Plex Mono", Consolas, monospace`

Weights: 400 and 500. Tabular numbers. The clock is large, weight 500, letter-spacing `-0.04em`, line height 1.

Section labels are 13px, weight 600. Secondary lines (date, mode, hints, log) are 12px, weight 400.

## Color

| Role | Value |
| --- | --- |
| Background | `#121212` |
| Surface (buttons, inputs) | `#1c1c1c` |
| Text | `#f4f4f4` |
| Muted text | `#c6c6c6` |
| Secondary text | `#b5b5b5` |
| Placeholder | `#9a9a9a` |
| Quiet / inactive chip | `#7a7a7a` |
| Disabled text | `#8a8a8a` |
| Text on a light fill | `#121212` |
| Muted text on a light fill | `#4a4a4a` |
| Hairline border | `#3a3a3a` |
| Input border | `#5a5a5a` |
| Strong border (buttons) | `#f4f4f4` |
| Dotted chip border | `#6a6a6a` |
| Dotted chip border, hover | `#9a9a9a` |

Color scheme is dark.

## Controls

Corners are square. Borders are 1px.

A default button is a `#1c1c1c` fill, `#f4f4f4` text, and a solid `#f4f4f4` border. Hover inverts it: light fill, dark text. A primary button starts inverted, and hover swaps back.

A disabled button keeps the dark fill, uses `#8a8a8a` text, and a dashed `#5a5a5a` border.

An unselected preset chip is transparent, `#7a7a7a` text, and a dotted `#6a6a6a` border. The selected chip matches a primary button: light fill, dark text, weight 600, solid border.

Inputs and text areas use the surface fill, text color, and a `#5a5a5a` border. Placeholders are `#9a9a9a`. Focus is a 1px `#f4f4f4` outline, offset 2px.

A selected row inverts like a primary button. Its meta line uses `#4a4a4a`.

Tables and cards use the hairline `#3a3a3a`.

## Space

4, 6, 8, 10, 12, and 16px are the steps. Sections sit 30px apart.
