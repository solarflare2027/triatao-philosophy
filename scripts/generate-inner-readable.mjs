// Bounded offline refresh for the four inner-consciousness reading pages.
// This consumes authored HTML, not a browser-rendered DOM. It is not visual QA.
// Use the normal browser-backed generator for changes outside this route scope.
import {readFile, writeFile, readdir, rename, unlink} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {fileURLToPath, pathToFileURL} from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const manifestPath = path.join(root, 'readable-manifest.json');
const hash = value => createHash('sha256').update(value).digest('hex');
const normalize = value => value.replace(/\s+/g, ' ').trim();
const routeBase = 'knowing/inner-consciousness';
const parts = ['', 'recognition', 'dialogue', 'integration'];
const changedRoutes = new Set(parts.map(part => routeBase + (part ? '/' + part : '')));

// Python's stdlib parser is used only for HTML tokenization and text nodes.
// Text normalization and lengths stay in JavaScript to match the normal
// generator's whitespace semantics and UTF-16 textLength exactly.
const parserCode = String.raw`
import json, re, sys, html
from html.parser import HTMLParser
from urllib.parse import urljoin, urlsplit

request = json.load(sys.stdin)
known = set(request.get('routes', []))

def attribute(raw, name, value):
    pattern = re.compile(r'(\s' + re.escape(name) + r'\s*=\s*)(?:"[^"]*"|\x27[^\x27]*\x27|[^\s>]+)', re.I)
    replacement = lambda match: match.group(1) + '"' + html.escape(value, quote=True) + '"'
    if pattern.search(raw):
        return pattern.sub(replacement, raw, count=1)
    end = '/>' if raw.endswith('/>') else '>'
    return raw[:-len(end)] + ' ' + name + '="' + html.escape(value, quote=True) + '"' + end

def absolute(value):
    if not value or re.match(r'^(?:#|/|[a-z][a-z0-9+.-]*:)', value, re.I):
        return value
    result = urlsplit(urljoin('https://triatao.invalid/', value))
    return result.path + ('?' + result.query if result.query else '') + ('#' + result.fragment if result.fragment else '')

def link(value):
    if value.startswith('#/'):
        route, separator, query = value[2:].partition('?')
        prefix = '/read/' + (route + '/' if route else '') if route in known else '/#/' + route
        return prefix + (separator + query if separator else '')
    return absolute(value)

def srcset(value):
    # The authored image candidates use ordinary URLs and width descriptors.
    # Preserve data URLs, whose commas are part of the URL itself.
    if re.search(r'(?:^|,\s*)data:', value, re.I):
        return value
    candidates = []
    for candidate in value.split(','):
        tokens = candidate.strip().split(None, 1)
        if tokens:
            candidates.append(absolute(tokens[0]) + (' ' + tokens[1] if len(tokens) > 1 else ''))
    return ', '.join(candidates)

class Scan(HTMLParser):
    def __init__(self, source, convert):
        super().__init__(convert_charrefs=True)
        self.source = source
        self.convert = convert
        # HTMLParser positions count LF characters, not every Unicode separator.
        self.lines = [0] + [index + 1 for index, char in enumerate(source) if char == '\n']
        self.main = None
        self.main_depth = 0
        self.main_count = 0
        self.text = []
        self.resources = []
        self.head = False
        self.head_end = None
        self.edits = []
        self.buttons = []

    def position(self):
        line, column = self.getpos()
        return self.lines[line - 1] + column

    def start(self, tag, attrs, selfclosing=False):
        start = self.position()
        raw = self.get_starttag_text()
        values = dict(attrs)
        if tag == 'head':
            self.head = True
        if tag == 'main':
            self.main_count += 1
            if self.main_depth or self.main is not None:
                raise ValueError('Expected one main element')
            self.main_depth = 1
            self.main = {'start': start, 'innerStart': start + len(raw)}
        if self.head and tag in ('link', 'script'):
            self.resources.append({'tag': tag, 'attrs': values, 'start': start, 'end': start + len(raw), 'raw': raw})
        if not self.convert:
            return
        revised = raw
        for name, value in attrs:
            if value is None:
                continue
            converted = link(value) if name == 'href' else srcset(value) if name == 'srcset' else absolute(value) if name in ('src', 'poster') else value
            if converted != value:
                revised = attribute(revised, name, converted)
        if tag == 'button':
            target = values.get('data-ic-target')
            self.buttons.append(bool(target))
            if target:
                revised = re.sub(r'^<button\b', '<a', revised, count=1, flags=re.I)
                revised = re.sub(r'\s+type\s*=\s*(?:"[^"]*"|\x27[^\x27]*\x27|[^\s>]+)', '', revised, count=1, flags=re.I)
                revised = attribute(revised, 'href', '#' + target)
        if revised != raw:
            self.edits.append((start, start + len(raw), revised))

    def handle_starttag(self, tag, attrs):
        self.start(tag, attrs)

    def handle_startendtag(self, tag, attrs):
        self.start(tag, attrs, True)

    def handle_endtag(self, tag):
        start = self.position()
        end = self.source.index('>', start) + 1
        if tag == 'main':
            if not self.main_depth:
                raise ValueError('Unexpected closing main element')
            self.main_depth = 0
            self.main.update({'innerEnd': start, 'end': end})
        if tag == 'head':
            self.head = False
            self.head_end = start
        if self.convert and tag == 'button':
            if not self.buttons:
                raise ValueError('Unexpected closing button')
            if self.buttons.pop():
                self.edits.append((start, end, '</a>'))

    def handle_data(self, data):
        if self.main_depth:
            self.text.append(data)

    def result(self):
        if self.main_depth or self.buttons:
            raise ValueError('Unclosed authored element')
        result = {'main': self.main, 'mainCount': self.main_count, 'text': ''.join(self.text), 'resources': self.resources, 'headEnd': self.head_end}
        if self.convert:
            transformed = self.source
            for start, end, value in sorted(self.edits, reverse=True):
                transformed = transformed[:start] + value + transformed[end:]
            result['html'] = transformed
        return result

results = {}
for document in request['documents']:
    scanner = Scan(document['html'], document.get('convert', False))
    scanner.feed(document['html'])
    scanner.close()
    results[document['id']] = scanner.result()
print(json.dumps(results, ensure_ascii=False))
`;

function inspect(documents, routes) {
  const result = spawnSync('python3', ['-c', parserCode], {
    input: JSON.stringify({documents, routes}), encoding: 'utf8', maxBuffer: 64 * 1024 * 1024
  });
  if (result.error || result.status !== 0) throw Error('Offline HTML parsing failed: ' + (result.error?.message || result.stderr));
  return JSON.parse(result.stdout);
}

async function htmlFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, {withFileTypes: true})) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await htmlFiles(full));
    else if (entry.isFile() && entry.name.endsWith('.html')) files.push(full);
  }
  return files.sort();
}

function applyEdits(source, edits) {
  let previous = source.length;
  for (const {start, end, value} of edits.sort((a, b) => b.start - a.start)) {
    if (start < 0 || end > previous || end < start) throw Error('Overlapping offline HTML edits');
    source = source.slice(0, start) + value + source.slice(end);
    previous = start;
  }
  return source;
}

const escapeAttribute = value => value.replace(/[&"<>]/g, char => ({'&': '&amp;', '"': '&quot;', '<': '&lt;', '>': '&gt;'}[char]));
function setAttribute(tag, name, value) {
  const expression = new RegExp('(\\s' + name + '\\s*=\\s*)(?:"[^"]*"|\x27[^\x27]*\x27|[^\\s>]+)', 'i');
  if (!expression.test(tag)) throw Error('Missing ' + name + ' in ' + tag);
  return tag.replace(expression, (_, prefix) => prefix + '"' + escapeAttribute(value) + '"');
}

const localURL = value => new URL(value, 'https://triatao.invalid/');
const pathOf = value => localURL(value).pathname;
const rootReference = value => {
  const url = localURL(value);
  if (url.origin !== 'https://triatao.invalid') return value;
  return url.pathname + url.search + url.hash;
};

const originalManifest = await readFile(manifestPath, 'utf8');
const manifest = JSON.parse(originalManifest);
const routes = manifest.pages.map(page => page.route);
for (const route of changedRoutes) if (!routes.includes(route)) throw Error('Missing inner route in existing manifest: ' + route);
const files = await htmlFiles(root);
const originals = new Map(await Promise.all(files.map(async file => [file, await readFile(file, 'utf8')])));
const scans = inspect([...originals].map(([id, html]) => ({id, html})), routes);
const fileForRoute = route => path.join(root, 'read', route, 'index.html');

// Establish parser accuracy and an unmodified static baseline before any writes.
for (const entry of manifest.pages) {
  const file = fileForRoute(entry.route), html = originals.get(file), scan = scans[file];
  if (!scan?.main || scan.mainCount !== 1) throw Error('Expected one existing main element: ' + entry.route);
  if (hash(html) !== entry.htmlHash) throw Error('Existing generated HTML changed before preflight: ' + entry.route);
  const text = normalize(scan.text);
  if (hash(text) !== entry.textHash || text.length !== entry.textLength) throw Error('Offline parser does not reproduce existing text: ' + entry.route);
}
console.log('Offline preflight: all ' + manifest.pages.length + ' existing HTML/text hashes reproduced.');

const sourceSnapshots = new Map();
for (const name of (await readdir(root)).sort()) {
  if (/\.(?:js|css|html)$/.test(name) && name !== 'readable-routes.js') {
    const bytes = await readFile(path.join(root, name));
    sourceSnapshots.set(name, bytes);
    const prior = manifest.sourceFiles[name];
    const inScope = /^(?:app\.js|index\.html|readable\.js|inner-[a-z0-9-]+\.(?:js|css))$/.test(name);
    if ((!prior || hash(bytes) !== prior) && !inScope) throw Error('Runtime input outside bounded inner-page scope changed: ' + name);
  }
}
for (const name of Object.keys(manifest.sourceFiles)) if (!sourceSnapshots.has(name)) throw Error('Authored runtime input was removed: ' + name);

const indexFile = path.join(root, 'index.html');
const indexScan = scans[indexFile];
const styles = indexScan.resources.filter(resource => resource.tag === 'link' && (resource.attrs.rel || '').split(/\s+/).includes('stylesheet'));
const styleMap = new Map(styles.map(resource => [pathOf(resource.attrs.href), rootReference(resource.attrs.href)]));
const app = indexScan.resources.find(resource => resource.tag === 'script' && resource.attrs.src && pathOf(resource.attrs.src) === '/app.js');
if (!app) throw Error('Final index.html has no versioned app entry');
const appReference = rootReference(app.attrs.src);
const appQuery = localURL(appReference).search;
if (!appQuery) throw Error('Offline refresh requires a versioned app entry');
const readableSource = sourceSnapshots.get('readable.js').toString('utf8');
const readableImport = readableSource.match(/import\s*\(\s*['"]([^'"]*app\.js[^'"]*)['"]\s*\)/)?.[1];
if (!readableImport || rootReference(readableImport) !== appReference) throw Error('readable.js and final index.html must reference the same app version');
const readableReference = '/readable.js' + appQuery;

function syncHead(html, scan) {
  if (scan.headEnd === null) throw Error('Static document has no head');
  const present = new Set(), edits = [];
  let hasEntry = false;
  for (const resource of scan.resources) {
    if (resource.tag === 'link' && (resource.attrs.rel || '').split(/\s+/).includes('stylesheet')) {
      const key = pathOf(resource.attrs.href);
      present.add(key);
      if (styleMap.has(key)) edits.push({start: resource.start, end: resource.end, value: setAttribute(resource.raw, 'href', styleMap.get(key))});
    }
    if (resource.tag === 'script' && resource.attrs.src) {
      const key = pathOf(resource.attrs.src);
      if (key === '/app.js' || key === '/readable.js') {
        hasEntry = true;
        edits.push({start: resource.start, end: resource.end, value: setAttribute(resource.raw, 'src', key === '/app.js' ? appReference : readableReference)});
      }
    }
  }
  const additions = styles.filter(resource => !present.has(pathOf(resource.attrs.href))).map(resource => setAttribute(resource.raw, 'href', rootReference(resource.attrs.href)));
  if (!hasEntry) additions.push('<script type="module" src="' + readableReference + '"></script>');
  if (additions.length) edits.push({start: scan.headEnd, end: scan.headEnd, value: '\n' + additions.join('\n') + '\n'});
  return applyEdits(html, edits);
}

const {innerPage} = await import(pathToFileURL(path.join(root, 'inner-consciousness.js')).href);
const fragments = parts.map(part => ({id: routeBase + (part ? '/' + part : ''), html: innerPage(part), convert: true}));
const transformed = inspect(fragments, routes);
for (const fragment of fragments) {
  const scan = transformed[fragment.id];
  if (scan.mainCount || !scan.html.includes('class="page-shell ic-page"')) throw Error('Unexpected authored inner-page shape: ' + fragment.id);
}

const plan = new Map();
for (const [file, original] of originals) {
  if (file === indexFile) continue; // The authored root entry is already final.
  let html = syncHead(original, scans[file]);
  const entry = manifest.pages.find(page => fileForRoute(page.route) === file);
  if (entry && changedRoutes.has(entry.route)) {
    // Head edits change offsets, so obtain the main range again before replacing.
    const scan = inspect([{id: file, html}], routes)[file];
    html = html.slice(0, scan.main.innerStart) + transformed[entry.route].html + html.slice(scan.main.innerEnd);
  }
  if (html !== original) plan.set(file, html);
}

const finalScans = inspect([...originals].map(([id, html]) => ({id, html: plan.get(id) ?? html})), routes);
for (const [file, before] of Object.entries(scans)) {
  const after = finalScans[file];
  const changed = [...changedRoutes].some(route => fileForRoute(route) === file);
  if (!changed && before.main && normalize(before.text) !== normalize(after.text)) throw Error('Unchanged static prose was modified: ' + path.relative(root, file));
}
for (const entry of manifest.pages) {
  const file = fileForRoute(entry.route), html = plan.get(file) ?? originals.get(file);
  const text = normalize(finalScans[file].text);
  if (changedRoutes.has(entry.route)) {
    entry.textHash = hash(text);
    entry.textLength = text.length;
  } else if (hash(text) !== entry.textHash) throw Error('Unchanged text hash drifted: ' + entry.route);
  entry.htmlHash = hash(html);
}
const alias = path.join(root, 'practice', 'index.html'), practice = fileForRoute('practice');
if ((plan.get(alias) ?? originals.get(alias)) !== (plan.get(practice) ?? originals.get(practice))) throw Error('The /practice alias would diverge');
manifest.sourceFiles = Object.fromEntries([...sourceSnapshots].map(([name, bytes]) => [name, hash(bytes)]));
manifest.generation = {mode: 'offline-inner-only', browserRendered: false, routeScope: [...changedRoutes], preflightTextHashes: manifest.pages.length};
plan.set(manifestPath, JSON.stringify(manifest, null, 2) + '\n');

// Verify the inputs still match the snapshot, then stage every result before
// replacing any document. The manifest is intentionally committed last.
for (const [file, original] of originals) if (await readFile(file, 'utf8') !== original) throw Error('HTML changed during offline planning: ' + file);
if (await readFile(manifestPath, 'utf8') !== originalManifest) throw Error('Manifest changed during offline planning');
for (const [name, original] of sourceSnapshots) if (hash(await readFile(path.join(root, name))) !== hash(original)) throw Error('Runtime source changed during offline planning: ' + name);
const temporary = new Map(), committed = [];
try {
  for (const [file, value] of plan) {
    const staged = file + '.inner-offline-' + process.pid + '.tmp';
    await writeFile(staged, value, {flag: 'wx'});
    temporary.set(file, staged);
  }
  for (const [file, staged] of temporary) {
    await rename(staged, file);
    committed.push(file);
  }
} catch (error) {
  for (const file of committed.reverse()) await writeFile(file, file === manifestPath ? originalManifest : originals.get(file));
  throw error;
} finally {
  for (const staged of temporary.values()) await unlink(staged).catch(error => {if (error.code !== 'ENOENT') throw error;});
}
console.log('Offline bounded refresh: 4 inner mains; ' + (plan.size - 1) + ' static documents; ' + manifest.pages.length + ' manifest entries.');
console.log('All other main texts retained. Browser rendering and visual/interaction verification were not performed by this generator.');
