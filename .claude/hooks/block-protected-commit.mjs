// PreToolUse hook: forbid `git commit` on develop or main — work on feature/* or fix/* branches.
import { execSync } from 'node:child_process';

const PROTECTED = ['develop', 'main'];

let raw = '';
for await (const chunk of process.stdin) raw += chunk;
const command = JSON.parse(raw).tool_input?.command ?? '';

if (!/\bgit\b[^;&|]*\bcommit\b/.test(command)) process.exit(0);

const branch = execSync('git branch --show-current', {
	cwd: process.env.CLAUDE_PROJECT_DIR,
	encoding: 'utf8',
}).trim();

if (PROTECTED.includes(branch)) {
	process.stderr.write(
		`Direct commits on "${branch}" are not allowed. Update develop, then create a feature/<name> or fix/<name> branch from it.\n`,
	);
	process.exit(2);
}
