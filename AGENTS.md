# Agent collaboration rules

## Reuse existing agent instances

- The user often has agents (e.g. Kilo CLI) already running outside Orca. Before launching ANY new agent instance or terminal, check what already exists (`orca terminal list --worktree active --json`, `orca worktree ps --json`) and ask the user if nothing is found or if the existing instance is not Orca-managed.
- Never start a duplicate agent instance without telling the user first and getting their OK.
- One coordinator at a time: the primary agent orchestrates; worker agents (e.g. Kilo) execute assigned tasks and report back. Workers must not spawn further agents, instances, or worktrees.
