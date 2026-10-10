[![Download for Windows](https://img.shields.io/badge/Download-TimeBlocks--Setup.exe-0078D4?logo=windows&logoColor=white)](https://github.com/singlesoup/timeblocks-web/releases/latest/download/TimeBlocks-Setup.exe)
<!-- Microsoft Store badge: not linked on purpose, there is no listing URL yet.
     When the Store listing is live, wrap this image in a link to it:
     [![...](https://img.shields.io/badge/Microsoft%20Store-...)](STORE_URL) -->
![Microsoft Store — coming soon](https://img.shields.io/badge/Microsoft%20Store-coming%20soon-5E5E5E?style=flat-square&logo=microsoft&logoColor=white)
[![Windows 10 & 11](https://img.shields.io/badge/platform-Windows%2010%20%2B%2011-lightgrey?style=flat-square&logo=windows&logoColor=white)](https://github.com/singlesoup/timeblocks-web/releases/latest/download/TimeBlocks-Setup.exe)
[![Free](https://img.shields.io/badge/price-free-3FA34D?style=flat-square)](https://github.com/singlesoup/timeblocks-web/releases/latest)
[![Releases](https://img.shields.io/badge/releases-latest-informational?style=flat-square)](https://github.com/singlesoup/timeblocks-web/releases/latest)

<p align="center">
  <img src="assets/timeblocks-icon.png" alt="TimeBlocks" width="160">
</p>

# TimeBlocks

**Own your day. Block by block.**

A small always-on-top Windows widget that turns your day into named blocks of minutes. Plan in the morning, run a focus timer on one block at a time, and see whether the day matched the plan.

**[Website](https://singlesoup.github.io/timeblocks-web/)** | **[Download TimeBlocks-Setup.exe](https://github.com/singlesoup/timeblocks-web/releases/latest/download/TimeBlocks-Setup.exe)** | **[Releases](https://github.com/singlesoup/timeblocks-web/releases)** | **[Design system](DESIGN.md)**

Windows 10 & 11 · Free · No account · Data stays on your PC

---

## What it is

A block is a name plus planned minutes. **Start** runs a focus segment (25+5, 30+5, or 60+10). When focus ends, the break starts on its own and both are written to the log. The daily report sums focus seconds per block and shows actual minus planned.

The shipped loop is named blocks and minutes, not a clock schedule. Planned minutes and the Pomodoro length are separate: a 90 minute block is several 30+5 cycles, and only focus seconds count toward the plan.

Three views:

- **Compact** &mdash; a clock.
- **Day** &mdash; today's blocks, a remark, the session log, and the planned-versus-actual table.
- **Plan** &mdash; tomorrow's blocks, a tray reminder, and past daily reports.

A small always-on-top window. It hides to the tray and keeps a single instance.

## The day

- **Tonight:** name tomorrow's blocks and how many minutes each deserves.
- **Tomorrow:** the list is already today's list. Start, focus, break, repeat.
- **End of day:** planned work, actual focus, the difference, breaks, and a short remark. Past days stay as reports.

## Who it is for

Someone who installs TimeBlocks on their own Windows PC and leaves the widget on the desktop or in the tray. They work alone at a desk. Their day is a short list of named blocks they assign minutes to, not a meeting calendar and not a team board. They keep it because the timer has to be visible without opening a browser tab.

**Not a fit:** teams, a manager looking at someone else's day, billable hours, people whose day is meetings, or anyone who needs the same plan on a phone or a second computer.

## How TimeBlocks is different

A Pomodoro app times a session and forgets the plan. A calendar answers what is at 2pm. A todo app answers whether it is done. A time tracker answers where the hours went after the fact. TimeBlocks answers whether this block got the focus minutes assigned to it, and the timer writes the actual.

## Install

1. Download [**TimeBlocks-Setup.exe**](https://github.com/singlesoup/timeblocks-web/releases/latest/download/TimeBlocks-Setup.exe) from the [public releases page](https://github.com/singlesoup/timeblocks-web/releases/latest).
2. Open it. The wizard is titled **Setup - TimeBlocks**. It installs for your Windows user and does not ask you to pick a folder.
3. If Windows says it protected your PC, choose **More info**, then **Run anyway**. The installer is not code-signed yet.
4. Leave **Pin TimeBlocks to the taskbar** checked if you want it one click away, then finish. Setup opens TimeBlocks.
5. Press **Day**. Type a block name, set the planned minutes, and press **Add**.
6. Press **Start**. When focus ends, the break starts on its own. **Hide** keeps it in the tray.

## This repo

The landing page for TimeBlocks: `index.html`, `styles.css`, and `tokens.css`. The desktop app itself is a separate, private repository.

## Design

See [DESIGN.md](DESIGN.md). UI text is Inter, then Segoe UI. The clock and minute figures are IBM Plex Mono.

## Support

[soupapps.support@gmail.com](mailto:soupapps.support@gmail.com)

[Privacy policy](privacy.html)