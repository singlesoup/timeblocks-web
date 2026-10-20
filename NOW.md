# TimeBlocks web — download page and buttons

Repo: `singlesoup/timeblocks-web` (this checkout). Production: https://timeblocks-web.vercel.app/

Work on a branch off `main`. Do **not** merge to `main` unless the human asks. Do **not** touch the private app repo `singlesoup/timeblocks`.

Design system: [DESIGN.md](DESIGN.md) (black/white, 1px borders, square corners, Inter / IBM Plex Mono). The **download page layout** is the exception: match Ratio’s download page (https://useratio.app/download?os=windows and the screenshot the human attached). Copy that page’s structure, not its typeface, pill radius, or purple mark.

Patterns: [index.html](index.html), [styles.css](styles.css), [download/index.html](download/index.html). `vercel.json` has `cleanUrls`, so the page URL is `/download`.

## Status

| Task | State |
| --- | --- |
| 1. Rewrite `/download` in the Ratio layout | Done. New `download/index.html`: centered column, brand mark, "TimeBlocks is on its way.", Downloads note + "download it here", three numbered step cards, 64-bit foot line, brand + "Back to the site" header, hidden iframe auto-starts the `.exe` on load. |
| 2. Point every installer button at `/download` and drop the homepage steps | Done. Header / hero / bottom installer buttons go to `download`; "— Free" dropped; "How to download and use" steps removed. |
| 3. Header: drop Store, label **Download**, center the nav | Done. Store button removed from homepage header; header label is **Download**; `.header-inner` is a `1fr auto 1fr` grid; changelog + privacy headers updated; sub-760px hiding unchanged. |
| 4. Windows icon on every installer button; colorful Windows icon on every Store button | Done. `currentColor` four-pane Windows SVG on all installer buttons (home header, hero, bottom, changelog, privacy); Windows-colored SVG on both Store buttons. `.btn` is inline-flex with a gap. |

All work is in the working tree only — not committed, not merged (human review first).

Do the tasks in order.

## Locked decisions

- Every **installer** control goes to `/download`. It does not link straight at the `.exe`. The download page starts the file.
- Every **Microsoft Store** control stays on `https://apps.microsoft.com/detail/9PFRD4P2ZHWS`.
- Header installer label is **Download**. Hero and the bottom `#download` installer label is **Download for Windows** (remove `— Free`). Store label stays **Get it from Microsoft Store**.
- Apply the icon and label rules to **every** installer button and **every** Store button (home header, hero, bottom section, changelog, privacy). Not only the hero.
- Remove **Get it from Microsoft Store** from the homepage header only. Store buttons in the hero and the bottom section stay.
- Homepage `#download` loses the `h3` “How to download and use” and `ol.download-steps`. Keep the section heading, lede, and the two buttons.
- Hero chip “Windows 10 & 11 · Free” and the bottom lede stay.
- Below 760px, `.site-nav` and `.header-actions` stay hidden.
- Installer icon: inline four-pane Windows SVG, `currentColor` (light on `.btn-primary`, dark when the button hover inverts). A literal black mark disappears on the dark primary button.
- Store icon: inline four-pane Windows SVG in the Windows colors (orange `#f25022`, green `#7fba00`, blue `#00a4ef`, yellow `#ffb900`).
- No icon font. `.btn` is `inline-flex`, icon left of the label, small gap. Hover must keep the icon visible.

### Download page (match the Ratio screenshot)

Rewrite [download/index.html](download/index.html). This page is centered, like Ratio, not the left-aligned legal layout it has now.

Header: brand left, **Back to the site** on the right (links home). No Download button and no Store button on this page.

Main, centered in a narrow column:

1. TimeBlocks brand mark (the existing 2×2 square mark).
2. Heading: **TimeBlocks is on its way.**
3. Two lines: **TimeBlocks-Setup.exe** will be in your Downloads folder in a moment. / If it doesn’t start, **download it here**.
4. Three stacked cards. Each card is a horizontal row: a number badge on the left, sentence on the right. Match the Ratio stack (gap between cards, number sitting inside the card, one step per card). Keep square corners and 1px hairline borders from DESIGN.md.
5. Foot line, centered: For Windows 10 and 11, 64-bit.

Card copy (old steps 1, 5, and 6 are gone; step 4 is rewritten):

1. Open **TimeBlocks-Setup.exe** from your Downloads. The wizard is titled **Setup - TimeBlocks**. It installs for your Windows user and does not ask you to pick a folder.
2. If Windows says it protected your PC, choose **More info**, then **Run anyway**. The installer is not code-signed yet.
3. **TimeBlocks opens as soon as it’s installed.**

On load, start the installer without navigating away from this page: a hidden iframe whose `src` is `https://github.com/singlesoup/timeblocks-web/releases/latest/download/TimeBlocks-Setup.exe`. The “download it here” link uses that same URL.

Keep the existing site footer (Home, Changelog, Privacy, email).

---

## Task 1 — Download page

### Work

1. Replace the legal-style `<main class="legal">` and the six-item list in [download/index.html](download/index.html) with the centered layout above.
2. Header on this page: brand + **Back to the site** only.
3. Add the one-shot hidden iframe so the `.exe` starts on load.
4. Add CSS in [styles.css](styles.css) for the centered column, the heading, the two-line note, and the three step cards. Do not restyle the rest of the site to be centered.

### Acceptance

- [ ] `/download` shows the brand mark, “TimeBlocks is on its way.”, the Downloads-folder note, three numbered cards, and “For Windows 10 and 11, 64-bit.”
- [ ] Cards are a vertical stack with the number on the left of each card, as on the Ratio page.
- [ ] Opening `/download` starts `TimeBlocks-Setup.exe` and leaves the instructions on screen. “download it here” hits the same file URL.
- [ ] Header is brand + Back to the site. No installer button on this page.

---

## Task 2 — Installer links and homepage steps

### Work

1. In [index.html](index.html), point the hero and bottom installer buttons at `download` (clean URL `/download`).
2. Delete the homepage “How to download and use” heading and `ol.download-steps`.
3. Drop `— Free` from both “Download for Windows” labels.

### Acceptance

- [ ] Homepage has no “How to download and use” list.
- [ ] Both homepage installer buttons read **Download for Windows** and go to `/download`.
- [ ] Both Store buttons still go to the Store listing.

---

## Task 3 — Header

### Work

1. Homepage header: remove the Store button.
2. Homepage header installer label is **Download**, linking to `download`.
3. In [styles.css](styles.css), make `.header-inner` a three-column grid (`1fr auto 1fr`): brand left, `.site-nav` centered, `.header-actions` right.
4. [changelog.html](changelog.html) and [privacy.html](privacy.html): header label **Download**, href `download`, same Windows icon. No new nav.

### Acceptance

- [ ] Homepage header is brand | How it works, Daily report, FAQ | Download.
- [ ] No Store button in any header.
- [ ] Nav stays hidden under 760px, with the header actions.

---

## Task 4 — Icons on every button

### Work

1. Add the `currentColor` Windows SVG to every installer button (homepage header, hero, bottom, changelog, privacy).
2. Add the four-color Windows SVG to every Store button (hero and bottom only).
3. Update `.btn` so the icon and label sit on one line.

### Acceptance

- [ ] Every installer button shows a Windows mark that follows the button text color, including hover.
- [ ] Every Store button shows the colored Windows mark.
- [ ] Header installer buttons say **Download**. Body installer buttons say **Download for Windows**.
