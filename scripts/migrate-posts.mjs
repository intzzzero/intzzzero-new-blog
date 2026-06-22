// One-off migration: content/blog/*.md (Gatsby) -> src/content/posts/*.md (Astro).
// Flat layout (no category folder) so the Astro slug == filename == original URL.
// frontmatter remap: update -> updatedAt, drop `path`, normalize category to slug.
import { readdirSync, readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const SRC = 'content/blog';
const DST = 'src/content/posts';

const CAT_MAP = {
  JavaScript: 'javascript',
  React: 'react',
  'Computer Science': 'computer-science',
  ComputerScience: 'computer-science',
  think: 'think',
  book: 'book',
  AI: 'ai',
  etc: 'etc',
  Node: 'node',
  Database: 'database',
  work: 'work',
  Network: 'network',
  dev: 'dev',
  CSS: 'css',
  HTML: 'html',
  Python: 'python',
  NestJS: 'nestjs',
};

rmSync(DST, { recursive: true, force: true });
mkdirSync(DST, { recursive: true });

const files = readdirSync(SRC).filter((f) => f.endsWith('.md'));
let migrated = 0;
const failed = [];
const unknownCats = new Set();
const catCount = {};

for (const file of files) {
  const raw = readFileSync(join(SRC, file), 'utf-8');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) {
    failed.push(file);
    continue;
  }
  const [, fm, body] = m;
  const lines = fm.split(/\r?\n/);
  const out = [];
  for (const line of lines) {
    if (/^path:/.test(line)) continue; // drop legacy path
    let l = line;
    if (/^update:/.test(l)) l = l.replace(/^update:/, 'updatedAt:');
    if (/^category:/.test(l)) {
      const val = l
        .replace(/^category:\s*/, '')
        .replace(/^["']|["']$/g, '')
        .trim();
      const slug = CAT_MAP[val] ?? val.toLowerCase().replace(/\s+/g, '-');
      if (!CAT_MAP[val]) unknownCats.add(val);
      catCount[slug] = (catCount[slug] || 0) + 1;
      l = `category: ${slug}`;
    }
    out.push(l);
  }
  const newFm = '---\n' + out.join('\n') + '\n---\n';
  writeFileSync(join(DST, file), newFm + body, 'utf-8');
  migrated++;
}

console.log('Migrated:', migrated, '/', files.length);
console.log('Failed (no frontmatter):', failed);
console.log('Unknown categories (slug = lowercase fallback):', [...unknownCats]);
console.log('Category counts:', catCount);
