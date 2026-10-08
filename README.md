# TimeBlocks

Landing page for TimeBlocks, a Windows desktop widget. One person installs it and leaves it on the desk. They name blocks, run focus and break, and see whether the day matched the minutes they planned.

## What it is

A small always-on-top window. It hides to the tray and keeps a single instance. The compact view is a clock. Day opens today's blocks, a remark, a session log, and a planned-versus-actual table. Plan holds tomorrow's blocks, a tray reminder, and past daily reports.

A block is a name plus planned minutes. Start runs a focus segment (25+5, 30+5, or 60+10). When focus ends, the break starts on its own and both are written to the log. The report sums focus seconds per block and shows actual minus planned. Data stays on that PC for that day. There is no account, sync, or team.

The shipped loop is named blocks and minutes, not a clock schedule.

## User

Someone who installs TimeBlocks on their own Windows PC and leaves the widget on the desktop or in the tray. They work alone at a desk. Their day is a short list of named blocks they assign minutes to, not a meeting calendar and not a team board.

They install it because the timer has to be visible without opening a browser tab.

Not a fit: teams, a manager looking at someone else's day, billable hours, people whose day is meetings, or anyone who needs the same plan on a phone or a second computer.

## Job to be done

When I sit down, I want the next block already named, one click to start it, an automatic break, and at the end of the day a plain comparison of the minutes I promised to the minutes I actually focused.

The morning version: plan tomorrow tonight, leave the app in the tray, and get a reminder that those blocks are waiting.

## Value proposition

**Start the block you already named, and see whether the day matched the plan.**

The promise is a closed loop on one machine:

- Tonight: name tomorrow's blocks and how many minutes each deserves.
- Tomorrow: the list is already today's list. Start, focus, break, repeat.
- End of day: planned work, actual focus, the difference, breaks, and a short remark. Past days stay as reports.

A Pomodoro app times a session and forgets the plan. A calendar answers what is at 2pm. A todo app answers whether it is done. A time tracker answers where the hours went after the fact. TimeBlocks answers whether this block got the focus minutes assigned to it, and the timer writes the actual.

## Results it can drive

- Less time deciding what to work on, because the block list is the queue and the widget is already on screen.
- Focus sessions that end, because the break starts without a second decision.
- A daily correction: over and under by block. The remark is the only narrative; the table is the evidence.
- A morning that starts from yesterday's plan, if the reminder is on and the app stays in the tray.

It will not drive shared accountability, project status, deep work analytics, or a schedule that protects hours on a calendar. Planned minutes and the Pomodoro length are separate. A 90 minute block is several 30+5 cycles, and only focus seconds count toward the plan.

## Design

See [DESIGN.md](DESIGN.md). UI text is Inter, then Segoe UI. The clock and minute figures are IBM Plex Mono.

## Landing page

A stranger has to understand the widget in the first minute: add a block, press Start, and see actual minutes appear next to the plan.

Do not add sync, teams, or categories. The reason they keep it on the desktop is the closed loop on one machine: tomorrow's blocks, today's timer, and the planned-versus-actual table.
