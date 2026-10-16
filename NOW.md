# TimeBlocks web — hero demo video

Repo: `singlesoup/timeblocks-web` (this checkout). Live site today: https://timeblocks-web.vercel.app/

Branch: **`video-demo-section`**, cut from `main` at the changelog / `cleanUrls` commit (`c4dce7f`). Implement this file only on that branch. Do **not** merge to `main` unless the human asks. Do **not** touch the private app repo `singlesoup/timeblocks`.

Reference UI for the cursor-follow play control: https://woblo.in/ (behavior only). Design tokens and rules: [DESIGN.md](DESIGN.md). Existing page patterns: [index.html](index.html), [styles.css](styles.css), [tokens.css](tokens.css).

## Goal

1. Put a demo **video** in the hero (where the static mockup is today), with a “Play video” control that **follows the cursor inside the video frame** (Woblo-style).
2. Move the existing HTML **mockup** below the “The method, in plain words” section.
3. Ship a **compressed** copy of the user’s demo recording as a site asset.

Keep the site **left-aligned**. Do not center the page to match Woblo. Do not invent a new visual system.

## Status

| Task | State |
| --- | --- |
| 0. Branch and scope | Done. Work on `video-demo-section`. Changelog / privacy / Store links stay as on `main`. |
| 1. Compress demo video + poster | Done. `assets/demo.mp4` (1280×720, H.264 CRF 28 + AAC, faststart) is ~3.7 MB; `assets/demo-poster.jpg` extracted at 30s. |
| 2. Hero video markup, CSS, and `demo.js` | Done. `.mockup` replaced by the `.demo` stage in the hero; cursor-follow chip with `--dx`/`--dy` offset from stage center; `demo.js` added, fine-pointer only, reduced-motion keeps the chip centered. |
| 3. Move mockup below Method | Done. Mockup moved into a new `#preview` section ("The widget") between the Method section and `#report`. Mockup tree unchanged. |
| 4. First-level acceptance check | Done locally. Branch, asset sizes, page order, left alignment, faststart, design tokens, and regression URLs checked. Cursor-follow/playback interaction needs a human browser pass; touch device untested. |

Do tasks **1 → 2 → 3 → 4** in order. Do not start Task 2 until `assets/demo.mp4` exists and is under the size limit.

## Locked decisions

- **Alignment:** Hero copy stays left-aligned. Video frame is left-aligned with that copy (`width: 100%`, `max-width: 880px`), same band as today’s `.mockup`. Not `margin: 0 auto` centered like Woblo’s `max-w-4xl mx-auto`.
- **Aspect:** `aspect-ratio: 16 / 10`. Video uses `object-fit: cover` and `object-position: top`.
- **Corners / chrome:** Square corners (`border-radius: 0`). Border `1px solid #f4f4f4` (strong). Stage background `#121212`. No soft multi-layer shadows. No `rounded-full` pills.
- **Play chip:** Light fill `#f4f4f4`, dark text `#121212`, 1px border, square corners — same language as `.btn-primary`. Label: **Play video** (sentence case is fine; match the button text exactly as `Play video`).
- **Cursor math (from Woblo, confirmed live):** Follower is positioned at `left: 50%; top: 50%` with transform `translate(-50%, -50%) translate(var(--dx, 0px), var(--dy, 0px))`. On `pointermove`, set `--dx` / `--dy` to pointer position minus the stage center (in CSS pixels).
- **Page order after the change:**
  1. Hero: chip → H1 → lede → CTAs → proof → **demo video**
  2. How it works (`#how`)
  3. Method (plain words)
  4. **Product preview** (moved `.mockup`)
  5. Daily report → FAQ → Download
- **Source video:** `C:\Users\samon\Downloads\timeblocks_demo-hq.mp4` (~129 MB). Do **not** commit that file. GitHub rejects files over 100 MB.
- **Out of scope:** Changelog automation, GitHub Actions, Store / installer URL changes, privacy rewrite (a one-line website note is optional), centering the whole landing page, editing the desktop app.

## What Woblo does (copy behavior only)

On https://woblo.in/ the demo sits under the hero CTAs:

- Stage: `relative`, aspect `16/10` (then `2/1` on larger breakpoints on their site — we use **16/10** only).
- `<video src="/demo-video.mp4" playsinline preload="none">` fills the stage.
- A “play video” control tracks the pointer **only inside** the video container via `--dx` / `--dy`.
- Click starts playback. We do **not** copy their light theme, center alignment, top-only rounded corners, or pill shape.

---

## Task 1 — Compress demo video and poster

### Work

1. Confirm the source exists: `C:\Users\samon\Downloads\timeblocks_demo-hq.mp4`.
2. Ensure `ffmpeg` is available. If missing, install or use a path the machine already has; do not skip compression.
3. Write `assets/demo.mp4` with a web-friendly encode, for example:
   - H.264 (`libx264`) + AAC
   - Scale so the long edge is about **1280px** (keep aspect)
   - CRF around **28**, `+faststart` (`-movflags +faststart`)
   - Target size: **under 15 MB**, ideally **5–10 MB**
4. Extract a still poster to `assets/demo-poster.jpg` (first frame or a clear mid frame). JPEG is fine; keep it small.
5. Do not commit `timeblocks_demo-hq.mp4` or anything from Downloads.
6. If `assets/store-hero-1920x1080.png` is still untracked and unrelated, leave it alone unless the human asks to add it.

### Acceptance (Task 1)

- [ ] `assets/demo.mp4` exists in the repo working tree.
- [ ] File size of `assets/demo.mp4` is **&lt; 15 MB** (hard fail if ≥ 15 MB or ≥ 100 MB).
- [ ] `assets/demo-poster.jpg` exists and loads as an image.
- [ ] The HQ Downloads file was **not** added to git.

---

## Task 2 — Hero video (markup, CSS, script)

### Markup — [index.html](index.html)

1. Remove the `.mockup` block from inside `<section class="hero">` (it moves in Task 3; you may cut it to a temp buffer while doing Task 2).
2. Under the proof paragraph (`No account. No cloud…`), insert:

```html
<div class="demo" data-demo>
  <video
    class="demo-video"
    src="assets/demo.mp4"
    poster="assets/demo-poster.jpg"
    playsinline
    preload="none"
  ></video>
  <span class="demo-cursor" hidden>
    <button type="button" class="demo-play" aria-label="Play demo video">Play video</button>
  </span>
</div>
```

3. Before `</body>`, add `<script src="demo.js" defer></script>` (or equivalent so it runs after the DOM is ready). Prefer a separate [demo.js](demo.js) over a large inline script.
4. Do not change header CTAs, Store links, or the `.exe` download URLs.

### Styles — [styles.css](styles.css)

Add rules that match DESIGN.md:

| Selector | Rules |
| --- | --- |
| `.demo` | `position: relative`; `width: 100%`; `max-width: 880px`; `aspect-ratio: 16 / 10`; `overflow: hidden`; `background: var(--bg)`; `border: var(--border) solid var(--strong)`; `border-radius: var(--radius)` (0). |
| `.demo-video` | `position: absolute`; `inset: 0`; `width: 100%`; `height: 100%`; `object-fit: cover`; `object-position: top`; `display: block`. |
| `.demo.is-hoverable` (or when fine pointer) | `cursor: none` while idle (before play). |
| `.demo-cursor` | `position: absolute`; `left: 50%`; `top: 50%`; `z-index: 2`; `transform: translate(-50%, -50%) translate(var(--dx, 0px), var(--dy, 0px))`; `pointer-events: auto`; `will-change: transform`. |
| `.demo-play` | Primary-style: `#f4f4f4` background, `#121212` text, 1px solid border, square corners, Inter, padding in the existing `--s*` steps. Not `border-radius: 999px`. |
| After play | Hide `.demo-cursor`. Allow normal interaction with the video (either `controls` turned on after play, or click-to-pause on the video). Stage may use `cursor: auto` again. |

Responsive:

- At `max-width: 760px`, the demo still fits inside `main` padding; no horizontal overflow.
- Enable cursor-follow only when `(hover: hover) and (pointer: fine)`. On touch, do not force `cursor: none` and do not show a stuck follower.

Reduced motion:

- If `prefers-reduced-motion: reduce`, keep the play chip centered (`--dx`/`--dy` stay `0`); still allow click/tap to play.

### Script — [demo.js](demo.js)

Implement roughly:

1. Query `[data-demo]`, the video, the cursor span, the play button.
2. **Fine pointer enter / move:** unhide cursor; set `--dx` = `clientX - rect.left - rect.width/2`, `--dy` = `clientY - rect.top - rect.height/2`.
3. **Leave:** hide cursor (unless you choose to leave it centered — prefer hide on leave).
4. **Play button click** (and Enter/Space via button): `video.play()`; hide cursor; mark demo as playing; optionally set `video.controls = true`.
5. **Touch / coarse pointer:** tap on the stage or play control starts play; no follower.
6. On `ended` or pause (if you hide controls until play): restore a sensible idle state so Play can show again when appropriate.
7. No analytics, no third-party players, no scripts from Microsoft or Woblo.

### Acceptance (Task 2)

- [ ] Hero no longer contains `.mockup`.
- [ ] Hero contains `.demo` with `assets/demo.mp4` and poster.
- [ ] Desktop (mouse): moving inside the video frame moves the **Play video** chip; the system cursor is hidden over the frame while idle.
- [ ] Desktop: leaving the frame hides (or parks) the chip; chip does not escape the frame.
- [ ] Desktop: clicking Play starts the video; chip disappears; audio/video actually play (user may unmute if browser blocks sound — autoplay with sound may fail; **click-to-play** is the contract).
- [ ] Touch / narrow viewport: layout does not overflow; tap starts playback; no broken absolute positioning.
- [ ] Play chip is square-cornered black/white TimeBlocks styling, not a white pill like Woblo.
- [ ] Video frame is left-aligned with the hero text, not centered in the viewport.
- [ ] `demo.js` has no dependency on React/Next; plain browser JS.

---

## Task 3 — Move mockup below Method

### Work

1. After the Method section (`section-label` **The method, in plain words** / heading **Two simple ideas that work.** / `.cards.cards-2`), and **before** the Daily report section (`#report`), insert a new section, for example:

```html
<section class="section" id="preview">
  <p class="section-label">The widget</p>
  <h2>See it on the desktop.</h2>
  <p class="section-lede">The floating timer, today’s blocks, and the focus clock — the same black-and-white language as the app.</p>
  <!-- existing .mockup markup, unchanged internally -->
</section>
```

2. Paste the **same** `.mockup` tree that used to live in the hero (titlebar, timeline, timer). Do not redesign the mockup.
3. Keep existing `.mockup*` CSS. Only add spacing if the new section needs the same `.section` padding as neighbors (it should use `class="section"`).
4. Optional: one line in [privacy.html](privacy.html) under the website list that the marketing site may serve a demo video as a static file from the same host. Do not change app-data claims.

### Acceptance (Task 3)

- [ ] Document order is: Hero (with video) → How it works → Method → **Preview/mockup** → Daily report → FAQ → Download.
- [ ] Mockup content still shows timeline + focus timer and matches the previous visual.
- [ ] No duplicate mockup left in the hero.
- [ ] Mobile: mockup stacks as it already does (`.mockup-body` → one column under 760px).

---

## Task 4 — First-level acceptance (agent self-check)

Run this checklist locally before asking the human for review. Prefer a local static server (`npx serve`, `python -m http.server`, etc.) on this branch, or the Vercel preview if the branch is pushed.

### Checklist

1. **Branch:** `git branch --show-current` is `video-demo-section` (or the human’s renamed equivalent of this work). Not committed onto `main` unless asked.
2. **Asset size:** `assets/demo.mp4` &lt; 15 MB; not the 129 MB HQ file.
3. **Hero composition:** First viewport still reads as brand + one headline + lede + CTAs + proof; video sits under the proof (may require scroll on short phones — that is OK).
4. **Left align:** Video’s left edge lines up with the hero text column, not the center of the viewport on a wide desktop.
5. **Cursor follow:** On desktop, chip tracks the pointer inside `.demo` only.
6. **Play:** Click/tap plays `assets/demo.mp4`.
7. **Mockup placement:** Mockup is after Method and before Daily report.
8. **Design system:** No purple gradients, no cream theme, no pill play button, no Inter-only violation (Inter + Segoe UI stack remains), black and white only for chrome.
9. **No regressions:** Store link still `https://apps.microsoft.com/detail/9PFRD4P2ZHWS`; `.exe` still points at `singlesoup/timeblocks-web` releases; footer still has Changelog + Privacy.
10. **Files touched (expected):** `index.html`, `styles.css`, `demo.js` (new), `assets/demo.mp4`, `assets/demo-poster.jpg`, optionally `privacy.html`, this `NOW.md` status table updated to Done.

### When Task 4 passes

- Update the Status table in this file to **Done** for tasks 1–4.
- Commit on `video-demo-section` with a clear message (example: `Add left-aligned hero demo video and move the mockup below Method.`).
- Push the branch if the human asked for a remote preview. Do **not** merge to `main` until the human (or the reviewing agent) signs off.

### Hand back

Tell the human:

- Branch name and latest commit SHA.
- Path to `assets/demo.mp4` and its size in MB.
- That first-level acceptance (Task 4) passed.
- Anything you could not verify (e.g. no touch device available).

The human will ask a separate agent to verify after that.

---

## Forbidden

- Committing `C:\Users\samon\Downloads\timeblocks_demo-hq.mp4` or any file ≥ 100 MB.
- Centering the hero or the video with Woblo’s `mx-auto` layout as the primary alignment.
- Microsoft Store web-component badge or `get.microsoft.com` installer badge scripts.
- Cloning or editing `singlesoup/timeblocks` (private app).
- Rewriting Changelog, removing Privacy, or changing download URLs.
- New frameworks (React, Vite app shell, etc.). Stay static HTML/CSS/JS.
