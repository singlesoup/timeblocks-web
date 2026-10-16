# TimeBlocks web — hero demo video

Repo: `singlesoup/timeblocks-web` (this checkout). Production: https://timeblocks-web.vercel.app/

Branch: **`video-demo-section`**. Implement this file only on that branch. Do **not** merge to `main` unless the human asks. Do **not** touch the private app repo `singlesoup/timeblocks`.

Design: [DESIGN.md](DESIGN.md). Patterns: [index.html](index.html), [styles.css](styles.css), [demo.js](demo.js).

## Status

| Task | State |
| --- | --- |
| 0. Branch and scope | Done |
| 1. Compress demo video + poster | Done. `assets/demo.mp4` ~3.7 MB; `assets/demo-poster.jpg` |
| 2. Hero video + `demo.js` (first pass) | Done. Needs Tasks 6–7 polish |
| 3. Mockup out of hero into `#preview` | Done. Needs Task 5 (nest into Method) |
| 4. First-level acceptance | Done for Tasks 1–3 |
| 5. Nest mockup inside Method section | Done. Mockup sits under the two Method cards (30px gap); `#preview` and its copy removed. |
| 6. Play chip: stay centered, follow in-frame, return to center on leave | Done. Chip visible + centered when idle; follows fine pointers in-frame; returns to center on leave (180ms ease); reduces to centered under reduced motion; touch tap-to-play kept. |
| 7. Play icon inside Play video button | Done. Inline SVG triangle, `currentColor`, square primary button. |
| 8. Remove hero “See how it works” CTA | Done. Two CTAs remain; header nav `#how` stays. |
| 9. Second-level acceptance | Done. Branch, structure, syntax, asset serving, and redirects verified locally; pointer interaction needs human/browser pass; no touch device tested. |

Do Tasks **5 → 6 → 7 → 8 → 9** in order. Do not re-compress the video or redo Tasks 1–3 unless a new task says so.

## Locked decisions (including human review)

- Site stays **left-aligned**. Video `max-width: 880px`, not Woblo-centered.
- Play chip: square corners, `#f4f4f4` fill, `#121212` text, 1px border — not a pill.
- **Mockup placement (updated):** Put the existing `.mockup` **inside** the Method section (“The method, in plain words” / “Two simple ideas that work.”), **below** the two cards (Time blocking / Pomodoro). Remove the separate `#preview` section and its “The widget” / “See it on the desktop.” headings — the mockup is part of Method, not its own section. See the human’s annotated screenshot (red arrow into Method).
- **Play chip motion (updated):**
  1. Idle / pointer outside the frame: chip is **visible and centered** (`--dx: 0`, `--dy: 0`). Do **not** leave it `hidden` when idle.
  2. Fine pointer **inside** the frame (and not playing): chip **follows** the pointer via `--dx` / `--dy` (pointer − stage center).
  3. Pointer **leaves** the frame: animate or snap `--dx`/`--dy` back to **0** so the chip returns to center (still visible).
  4. While playing: hide the chip (current `is-playing` behavior can stay).
  5. Touch / coarse: no follow; centered chip or tap-to-play on the stage is fine.
  6. `prefers-reduced-motion: reduce`: chip stays centered always (no follow).
- **Play icon:** Add a small filled triangle (play) to the left of the “Play video” label inside `.demo-play`. Inline SVG, `currentColor`, square-button layout (`inline-flex`, gap). No emoji, no icon font.
- **“See how it works” (updated — remove from hero):** Remove that button from the hero `.cta-row`. Keep **Download for Windows** and **Get it from Microsoft Store** only. Rationale: the demo video already sits under the proof line, so scrolling to the video is pointless; a third text CTA competes with install. The header nav link **How it works** (`#how`) stays for people who want the three steps. Do **not** retarget the removed button to the video.

### Recommendation note (for the human — already locked above)

| Option | Verdict |
| --- | --- |
| Remove the button | **Chosen.** Cleaner hero; video + two install CTAs are enough. |
| Scroll to video | Rejected. Video is already in the hero under the CTAs. |
| Keep as `#how` | Acceptable fallback, but still three CTAs. Prefer remove; nav already has How it works. |

## Page order after Tasks 5–8

1. Hero: chip → H1 → lede → **Download** + **Store** only → proof → **demo video** (centered Play chip + follow)
2. How it works (`#how`)
3. Method: label + “Two simple ideas…” + two cards + **`.mockup` under the cards** (no separate preview section)
4. Daily report → FAQ → Download

---

## Task 5 — Nest mockup inside Method

### Work

1. In [index.html](index.html), open the Method `<section class="section">` that contains “The method, in plain words”.
2. After `.cards.cards-2` (still inside that same `<section>`), place the existing `.mockup` tree (titlebar, timeline, timer) unchanged.
3. Delete the entire `<section class="section" id="preview">…</section>` block (label “The widget”, heading “See it on the desktop.”, lede, and the mockup that lived there).
4. Optional spacing: a small top margin on `.mockup` when it sits under the cards (e.g. `margin-top: var(--s16)` or `30px`) so it is not flush against the card row. Prefer a class on a wrapper if needed; do not invent a new card chrome around the mockup.
5. Do not change mockup inner markup or `#report` / FAQ / download sections.

### Acceptance (Task 5)

- [ ] There is **no** `#preview` section and no “The widget” / “See it on the desktop.” copy.
- [ ] Method section contains: section-label → h2 → two cards → `.mockup`.
- [ ] Mockup still shows Daily timeline + Focus timer visually as before.
- [ ] Page order matches the list above (Method includes mockup; Daily report follows).

---

## Task 6 — Play chip center / follow / return

### Work

Edit [demo.js](demo.js) and [styles.css](styles.css) as needed:

1. On load: `.demo-cursor` is **not** `hidden`; `--dx` and `--dy` are `0px`. Chip sits in the center of the stage over the poster.
2. On `pointerenter` / `pointermove` (fine pointer, not playing): update `--dx`/`--dy` so the chip follows the pointer.
3. On `pointerleave` (fine pointer, not playing): set `--dx` and `--dy` back to `0` (chip returns to center and **stays visible**). Do not set `hidden` on leave.
4. Optional polish: short CSS transition on `transform` for the return-to-center (e.g. 120–200ms). Disable or skip the transition while actively tracking if it feels laggy; return-to-center should feel smooth.
5. Playing state: hide chip / `is-playing` as today; on pause/ended restore centered visible chip.
6. Keep fine-pointer-only follow; reduced-motion = always centered.

### Acceptance (Task 6)

- [ ] With mouse outside the video: **Play video** is visible in the **center** of the frame.
- [ ] Mouse inside (idle): chip follows the cursor.
- [ ] Mouse leaves the frame: chip returns to the **center** (not disappears).
- [ ] After play ends or pause returns to idle: chip is centered again (or follows if pointer is still inside).
- [ ] Touch: can still start playback; no stuck off-center chip.

---

## Task 7 — Play icon in the button

### Work

1. Inside `.demo-play` in [index.html](index.html), add an inline SVG play triangle before the text “Play video”, `aria-hidden="true"` on the SVG.
2. Style with flex: `.demo-play { display: inline-flex; align-items: center; gap: … }` so icon + label sit on one line.
3. Icon uses `currentColor` / fill `#121212` (inherits from button text). Size ~12–14px; keep square button corners.

Example shape (agent may adjust path):

```html
<button type="button" class="demo-play" aria-label="Play demo video">
  <svg class="demo-play-icon" width="12" height="14" viewBox="0 0 12 14" aria-hidden="true" focusable="false">
    <path fill="currentColor" d="M0 0v14l12-7z"/>
  </svg>
  Play video
</button>
```

### Acceptance (Task 7)

- [ ] Button shows a play triangle + “Play video”.
- [ ] Icon is not an emoji; square button; still `#f4f4f4` / `#121212` primary style.
- [ ] `aria-label` (or accessible name) still describes play.

---

## Task 8 — Remove “See how it works” from the hero

### Work

1. In the hero `.cta-row` in [index.html](index.html), delete the `<a … href="#how">See how it works</a>` link.
2. Leave Download and Microsoft Store buttons unchanged (same URLs).
3. Leave header `.site-nav` link to `#how` in place.

### Acceptance (Task 8)

- [ ] Hero CTA row has exactly two buttons: Download for Windows, Get it from Microsoft Store.
- [ ] Header still has “How it works” → `#how`.
- [ ] No dead `#` links added for the video.

---

## Task 9 — Second-level acceptance (agent self-check)

Before handing back to the human:

1. Branch is `video-demo-section`.
2. Tasks 5–8 acceptance boxes all pass.
3. Desktop: centered chip → follow in frame → return to center on leave → click plays.
4. Method section owns the mockup; no orphan `#preview`.
5. Store + `.exe` URLs unchanged; Changelog + Privacy footer unchanged.
6. Update this Status table to Done for 5–9.
7. Commit on `video-demo-section` (do not merge to `main`). Push if the human wants a remote preview.

### Hand back

Tell the human: branch, commit SHA, and that Task 9 passed. Flag anything not verified (e.g. no touch device). The human will ask a reviewing agent to verify again.

---

## Forbidden

- Merging to `main` without the human.
- Committing the 129 MB HQ file from Downloads.
- Centering the whole page / Woblo pill styling.
- Retargeting a hero CTA to scroll to the video.
- Editing `singlesoup/timeblocks` (private app).
- New frameworks.

## Archive — original Tasks 1–4 (shipped)

Tasks 1–4 shipped on commit `a708134` (and changelog auto markers on `f110e2a`). Summary: compressed `assets/demo.mp4`, hero `.demo` + `demo.js`, mockup moved to `#preview`, first-level check. Tasks 5–8 supersede the “separate preview section” and “hide chip when idle” parts of that pass.
