import { readdir, readFile, access } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map(e => e.isDirectory() ? walk(path.join(dir, e.name)) : path.join(dir, e.name)));
  return files.flat();
}
const files = await walk(root);
const errors = [];
let modules = 0, references = 0;
for (const file of files) {
  const ext = path.extname(file);
  if (!['.html', '.css', '.js'].includes(ext)) continue;
  const text = await readFile(file, 'utf8');
  let matches = [];
  if (ext === '.js') {
    modules++;
    const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
    if (result.status !== 0) errors.push(result.stderr || result.error?.message || `Cannot check ${file}`);
    matches = [...text.matchAll(/(?:\bfrom\s*|\bimport\s*\(\s*|\bimport\s*)['"]([^'"]+)['"]/g)].map(m => m[1]);
  } else if (ext === '.html') {
    matches = [...text.matchAll(/(?:src|href)\s*=\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
  } else {
    matches = [...text.matchAll(/url\(\s*(?:"([^"]*)"|'([^']*)'|([^\s)]+))\s*\)/g)].map(m => m[1] ?? m[2] ?? m[3]);
  }
  for (const ref of matches) {
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(ref)) continue;
    if (ext === '.js' && !ref.startsWith('.')) continue;
    const clean = ref.split(/[?#]/)[0];
    if (!clean) continue;
    references++;
    const target = ref.startsWith('/') ? path.resolve(root, '.' + clean) : path.resolve(path.dirname(file), clean);
    try { await access(target); } catch { errors.push(`${path.relative(root, file)} -> missing: ${ref}`); }
  }
}
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log(`通过：${modules} 个 JavaScript 文件；${references} 个静态本地引用。页面交互与视觉效果请继续在浏览器检查。`);
