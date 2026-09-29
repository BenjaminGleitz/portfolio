// PostToolUse hook: after Claude edits a source file, run lint + tests.
// Exit code 2 feeds the failure output back to Claude so it fixes it before moving on.
import { execSync } from 'node:child_process';

const SOURCE_FILE = /\.(astro|ts|mts|js|mjs|css)$/;

let raw = '';
for await (const chunk of process.stdin) raw += chunk;
const filePath = JSON.parse(raw).tool_input?.file_path ?? '';

if (!SOURCE_FILE.test(filePath) || filePath.includes('/node_modules/'))
	process.exit(0);

try {
	execSync('npm run --silent lint && npm run --silent test', {
		cwd: process.env.CLAUDE_PROJECT_DIR,
		stdio: ['ignore', 'pipe', 'pipe'],
		encoding: 'utf8',
	});
} catch (error) {
	process.stderr.write(
		`Lint or tests failed after editing ${filePath}:\n${error.stdout}${error.stderr}`,
	);
	process.exit(2);
}
