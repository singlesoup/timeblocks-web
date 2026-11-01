# TimeBlocks web — download page and buttons

Repo: `singlesoup/timeblocks-web` (this checkout). Production: https://timeblocks.in/ (custom domain; deploys via https://timeblocks-web.vercel.app/).

Work on a branch off `main`. Do **not** merge to `main` unless the human asks. Do **not** touch the app repo (it is private and separate from this one).

Design system: [DESIGN.md](DESIGN.md) (black/white, 1px borders, square corners, Inter / IBM Plex Mono). The **download page layout** is the exception: match Ratio’s download page (https://useratio.app/download?os=windows and the screenshot the human attached). Copy that page’s structure, not its typeface, pill radius, or purple mark.

Patterns: [index.html](index.html), [styles.css](styles.css), [download/index.html](download/index.html). `vercel.json` has `cleanUrls`, so the page URL is `/download`.

## Status

| Task | State |
| --- | --- |
| 1. Rewrite `/download` in the Ratio layout | Done. New `download/index.html`: centered column, brand mark, "TimeBlocks is on its way.", Downloads note + "download it here", three numbered step cards, 64-bit foot line, brand + "Back to the site" header, hidden iframe auto-starts the `.exe` on load. |
| 2. Point every installer button at `/download` and drop the homepage steps | Done. Header / hero / bottom installer buttons go to `download`; "— Free" dropped; "How to download and use" steps removed. |
| 3. Header: drop Store, label **Download**, center the nav | Done. Store button removed from homepage header; header label is **Download**; `.header-inner` is a `1fr auto 1fr` grid; changelog + privacy headers updated; sub-760px hiding unchanged. |
| 4. Windows icon on every installer button; colorful Windows icon on every Store button | Done. `currentColor` four-pane Windows SVG on all installer buttons (home header, hero, bottom, changelog, privacy); Windows-colored SVG on both Store buttons. `.btn` is inline-flex with a gap. |
| 5. Homepage sections from reference design | Done. All 5 sections rebuilt + QA (equal 339x228 mock boxes, centered interiors, copy polish, nav 4 items). Merged to `main` via PR #1 (`fca9598`); live at https://singlesoup.github.io/timeblocks-web/. |
| 6. SEO / AEO / GEO for the live site (timeblocks.in) | Done. Kilo's audit + implementation commit `a54b834` (schema refresh, favicon verified); sitemap submitted to GSC + Bing (processing). Publisher footer line dropped after human review (redundant with the © line; publisher signal stays in the JSON-LD). llms.txt **deferred / not implemented** — excluded from the scoped task by decision. |
| 7. Mac/Linux interest form links | Done. Hero muted line + FAQ link to the Tally form; JSON-LD mirror synced. Commits `4b250ca` + `da89410` (design feedback) on `seo_improve`. Interest card and "Coming next" item dropped per human decision (section does not exist). |

Tasks 1-5 are merged to `main` (PR #1) and deployed. Tasks 6-7 live on branch `seo_improve` (pushed).

Do the tasks in order.

## Task 6 — SEO / AEO / GEO for the live site

### Work

1. Add `https://useratio.app/llms.txt` support for crawlers and AI agents.
2. Run SEO / AEO / GEO audit via Kilo (skills: open-seo, ai-seo, seo-audit, content-strategy, keyword-research) on the live site only (timeblocks.in).
3. Apply or act on audit findings.

### Status

- Audit **completed** by Kilo on the live site.
- Findings were partially stale: OG/Twitter cards, canonicals, robots.txt, sitemap.xml, and JSON-LD (SoftwareApplication + FAQPage) already exist on `main` (commit `0a87c5e`). Verified before adding anything.
- **Kilo's implementation commit landed and pushed: `a54b834` "SEO: schema, favicon, publisher line"** on `seo_improve` — SoftwareApplication schema refresh (BusinessApplication category, publisher, trimmed description), publisher line in footer, favicon verification. He did NOT touch llms.txt, pricing.md, WebPage schema, or dateModified, as agreed.
- Kilo reviewed the existing FAQPage JSON-LD for exact text match with visible FAQ copy (kept in sync by Task 7) instead of adding a second block.
- **llms.txt: deferred / not implemented** — explicitly excluded from the scoped SEO task (Kilo + human decision). Recommendation remains from the broader audit if wanted later.
- **GSC + Bing: sitemap.xml submitted** to Google Search Console and Bing Webmaster Tools (both processing; expected Success in 24-48h).
- Publisher footer line: Kilo's original edit ("Built by [YOUR NAME], SoupApps") was accidentally lost during the Task 7 commit separation (backup/restore only restored the schema hunk). Re-added by OpenCode as "Built by SoupApps", then **removed again after human review** — redundant with the existing "© 2026 SoupApps" footer line. The publisher signal for crawlers remains in the SoftwareApplication JSON-LD (`publisher: Organization SoupApps`).
- Explicitly out of scope (per Kilo): pricing.md, WebPage schema, datePublished/dateModified, new pages, tracking scripts. Title, meta description, OG, Twitter Card, canonicals left untouched.

### Acceptance

- [x] SEO/AEO/GEO audit completed on the live site (Kilo).
- [x] llms.txt: **deferred / not implemented** — excluded from the scoped SEO task by decision (recommendation preserved for a future task).
- [x] Findings applied: schema + publisher line + favicon in commit `a54b834`; publisher footer line re-added as "Built by SoupApps"; sitemap submitted to GSC + Bing (external, processing).

## Task 7 — Mac/Linux interest form links (completed)

Form: `https://tally.so/r/kblAOZ`, every link `target="_blank" rel="noopener"`.

### Work

1. Hero: muted line `Windows only for now. Want TimeBlocks for Mac/Linux? Tell us.` added between the `.cta-row` and the trust `.proof` line; only "Tell us" is a link (underlined).
2. Interest card: dropped per human decision — replaced by the hero line above (spec's "Coming next" section does not exist in the current page).
3. "Coming next" Mac/Linux item: dropped — no such item exists in the current markup.
4. FAQ: question retitled to "Which systems does it run on?", answer now "Windows 10 and 11. Mac and Linux will follow once there's enough demand. Vote for yours." with "Vote for yours" linking to the form.
5. JSON-LD FAQPage mirror in `<head>` updated to match the visible FAQ (same content, kept in sync).
6. `styles.css`: `.proof-interest` margin override + underlined inline-link styling with visible `:focus-visible` outline for `.proof-interest a` and `.faq-item a`. No new colors or fonts.
7. Design feedback applied: 12px top padding on the interest line (hero lines move as one group), "Tell us" in primary text color `var(--text)` (#f4f4f4).

### Acceptance

- [x] All links open the form in a new tab (`target="_blank" rel="noopener"`).
- [x] Verified at 360px and 1280px: links visible, no horizontal overflow from these changes, focus rule present.
- [x] One commit: `4b250ca` "Add Mac/Linux interest form links", pushed to `seo_improve`; diff touches only the intended places.
- [x] Design feedback round applied: commit `da89410` "Hero interest line: top spacing and white link color per design feedback" (styles.css only; pathspec commit so Kilo's staged index.html was untouched). Verified: 24px gap above the line, both hero lines moved as one group, "Tell us" in `var(--text)` (#f4f4f4), 360px and 1280px clean.

### Notes

- Pre-existing issue (not from this task): horizontal overflow at 360px from `.report-card` / `.report-table` in the Daily Report section — candidate for a separate fix.
- Kilo's SoftwareApplication schema edits were preserved in the working tree (backed up and restored around this commit) so his SEO commit stays separate.

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

- [x] `/download` shows the brand mark, “TimeBlocks is on its way.”, the Downloads-folder note, three numbered cards, and “For Windows 10 and 11, 64-bit.” (verified in `download/index.html`: brand mark line 33, h1 line 34, dl-notes lines 35-36, three `.dl-step` cards lines 38-51, foot line 53)
- [x] Cards are a vertical stack with the number on the left of each card, as on the Ratio page. (`.dl-step` with `.dl-num` badge + sentence, one step per card)
- [x] Opening `/download` starts `TimeBlocks-Setup.exe` and leaves the instructions on screen. “download it here” hits the same file URL. (hidden iframe line 58, same GitHub Releases URL as the fallback link)
- [x] Header is brand + Back to the site. No installer button on this page. (`header-back` line 27)

---

## Task 2 — Installer links and homepage steps

### Work

1. In [index.html](index.html), point the hero and bottom installer buttons at `download` (clean URL `/download`).
2. Delete the homepage “How to download and use” heading and `ol.download-steps`.
3. Drop `— Free` from both “Download for Windows” labels.

### Acceptance

- [x] Homepage has no “How to download and use” list. (no `download-steps` / “How to download” matches in `index.html`)
- [x] Both homepage installer buttons read **Download for Windows** and go to `/download`. (hero line 100, bottom line 350; no “— Free” anywhere)
- [x] Both Store buttons still go to the Store listing. (lines 106, 356 → `apps.microsoft.com/detail/9PFRD4P2ZHWS`)

---

## Task 3 — Header

### Work

1. Homepage header: remove the Store button.
2. Homepage header installer label is **Download**, linking to `download`.
3. In [styles.css](styles.css), make `.header-inner` a three-column grid (`1fr auto 1fr`): brand left, `.site-nav` centered, `.header-actions` right.
4. [changelog.html](changelog.html) and [privacy.html](privacy.html): header label **Download**, href `download`, same Windows icon. No new nav.

### Acceptance

- [x] Homepage header is brand | How it works, Daily report, Who it's for, FAQ | Download. (nav lines 75-80, header-actions lines 81-84; no Store button in any header)
- [x] No Store button in any header. (only installer control per header: `index.html` 82, `changelog.html` 33, `privacy.html` 33 — all `href="download"`)
- [x] Nav stays hidden under 760px, with the header actions. (`styles.css` 1170-1172)

---

## Task 4 — Icons on every button

### Work

1. Add the `currentColor` Windows SVG to every installer button (homepage header, hero, bottom, changelog, privacy).
2. Add the four-color Windows SVG to every Store button (hero and bottom only).
3. Update `.btn` so the icon and label sit on one line.

### Acceptance

- [x] Every installer button shows a Windows mark that follows the button text color, including hover. (`fill="currentColor"` four-pane SVG: `index.html` 84, 102, 352; `changelog.html` 35; `privacy.html` 35; `.btn` hover keeps `currentColor`)
- [x] Every Store button shows the colored Windows mark. (`index.html` 108, 358 — `#f25022`/`#7fba00`/`#00a4ef`/`#ffb900`)
- [x] Header installer buttons say **Download**. Body installer buttons say **Download for Windows**.

---

## Task 5 — Homepage sections from reference design

Rebuild 5 homepage sections in `index.html`/`styles.css` to match the reference design (the reference HTML `Main.dc.html` lines 115-278 and screenshot `Home page@1x.png`, provided by the human outside this repo), translating into the DESIGN.md system rather than copying raw styles.

Sections (ids `#how`, `#report`, `#next`, `#who`, `#different`):

1. **HOW IT WORKS** — “Plan. Focus. Review. There’s no fourth step.” 3 mockup cards (Plan-for-Tomorrow form, 24:58 focus timer, planned-vs-actual table) plus numbered captions 1. Plan / 2. Focus / 3. Review.
2. **DAILY REPORT** — “The honest end-of-day scorecard.” Saturday October 31 report card (4-row table + session log).
3. **DECIDING WHAT’S NEXT** — “Can’t start? It picks the next task for you.” Context card + recommended-task card.
4. **WHO IT’S FOR** — “Built for students and people who work alone, especially ADHD brains.” 3 cards + not-a-fit line.
5. **HOW IT’S DIFFERENT** — “Keeps the plan. Checks the day against it.” 3-column joined grid.

Edit rules: replace the existing How-it-works and Daily-report sections; delete the “Method in plain words” section; hero/FAQ/download/footer untouched.

Translation rules: tokens instead of raw hex, square corners, IBM Plex Mono, 14px base type scale, spacing steps 4-16px. Exception: keep the app delta colors `#81c784` (green), `#ffd54f` (yellow), `#e57373` (red) and the green focus dot because the real app uses them (matches existing styles.css precedent).

### Work

1. In `index.html`, replace How-it-works and Daily-report sections with the 5 rebuilt sections; delete the “Method in plain words” section; leave everything else untouched.
2. In `styles.css`, add only the styles needed for these 5 sections; do not restyle hero/FAQ/download/footer.

### Acceptance

- [x] All 5 sections render with ids `#how`, `#report`, `#next`, `#who`, `#different`.
- [x] “Method in plain words” section removed; hero/FAQ/download/footer untouched.
- [x] Orca browser screenshot of each section matches the reference within design-system substitutions; loop until visual match.

### Locked decisions

- Build only these 5 sections from the reference; nothing else moves.
- Replace How-it-works and Daily-report; delete “Method in plain words.”
- Hero/FAQ/download/footer untouched.
- Design-system translation: tokens instead of raw hex, square corners, IBM Plex Mono, 14px base, 4-16px spacing steps.
- Keep app delta colors `#81c784`/`#ffd54f`/`#e57373` and green focus dot (existing styles.css precedent).
- Verification via Orca browser screenshots compared against `Home page@1x.png`, loop until match.

---

## Backlog

- [ ] P3 (low, do later): Add two SEO content pages to timeblocks.in
  - Page 1: "Time blocking for students and exam prep"
    Covers: planning study blocks, using plan mode and the daily planned-vs-actual report during exam prep, and a sample study day.
  - Page 2: "ADHD-friendly focus timer"
    Covers: what TimeBlocks does today for ADHD (next-task recommendations by available time/energy/focus goal, always-visible compact widget, automatic breaks). Clearly label planned features (task initiation ramp, flow-state mode, distraction blocking) as "coming next", not as existing.
  - Each page: 400–800 words of real, specific content from how the app works. No generic productivity filler, and no claims about features that aren't shipped.
  - Use real screenshots with descriptive alt text.
  - Link each page from the nav or footer, link back to the home page and the download button, and add both to sitemap.xml.
  - Give each page its own title tag, meta description and canonical URL, plus Open Graph and Twitter tags matching the home page.
  - Also check that existing changelog entries have dates (if not, add them).
  - Why: the site is a single landing page, which is thin for search engines and AI tools. These pages target "study timer for exams" and "focus timer for ADHD" searches.
  - Prerequisite: finish current feature work first.
