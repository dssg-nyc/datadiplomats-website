// GitHub Pages serves a missing path as 404.html with a real 404 status,
// which search engines will not index. Give every real route its own static
// copy of the app shell so deep links answer 200; the React router renders
// the right page from the path. Unknown paths still fall to 404.html.
import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const ROUTES = ['workshops', 'research', 'apps', 'partner', 'privacy', 'cookies', 'ai-policy'];

for (const route of ROUTES) {
  const dir = join('dist', route);
  mkdirSync(dir, { recursive: true });
  copyFileSync(join('dist', 'index.html'), join(dir, 'index.html'));
}
console.log(`Wrote route pages: ${ROUTES.join(', ')}`);
