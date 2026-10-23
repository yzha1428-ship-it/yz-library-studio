import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const distDirectory = fileURLToPath(new URL('../dist/', import.meta.url));
const indexFile = join(distDirectory, 'index.html');

// GitHub Pages serves files rather than rewriting Vue history URLs.
// Give each fixed route an entry page so opening or refreshing it works.
const fixedRoutes = [
  'about',
  'login',
  'access-denied',
  'add-book',
  'getbookcount',
  'WeatherCheck',
  'CountBookAPI',
  'GetAllBookAPI',
];

for (const route of fixedRoutes) {
  const routeDirectory = join(distDirectory, route);
  await mkdir(routeDirectory, { recursive: true });
  await copyFile(indexFile, join(routeDirectory, 'index.html'));
}

// This is already-built Vite output; Pages must not process it with Jekyll.
await writeFile(join(distDirectory, '.nojekyll'), '');
console.log(`Prepared ${fixedRoutes.length} static route entry pages.`);
