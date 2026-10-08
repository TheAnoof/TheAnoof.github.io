#!/usr/bin/env node
/**
 * Lists every placeholder still waiting for real content.
 *
 *   npm run placeholders
 *
 * It looks in the /content folder for text in [square brackets] containing
 * the word "placeholder", and for "TODO" notes. It also checks whether the
 * resume PDF is still the placeholder file and which projects have no images.
 * (The _TEMPLATE folder is skipped.)
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const contentDir = join(root, 'content');
const PLACEHOLDER = /\[[^[\]\n]*placeholder[^[\]\n]*\]/gi;
const TODO = /\bTODO\b.*$/;

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    if (name.startsWith('_') || name.startsWith('.')) return [];
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return walk(full);
    return /\.(md|ya?ml)$/.test(name) ? [full] : [];
  });
}

let total = 0;
for (const file of walk(contentDir)) {
  const lines = readFileSync(file, 'utf8').split('\n');
  const hits = [];
  lines.forEach((line, i) => {
    if (line.trim().startsWith('#') && !TODO.test(line)) return; // skip plain comments
    const matches = line.match(PLACEHOLDER) ?? [];
    for (const m of matches) hits.push(`  line ${i + 1}: ${m}`);
    const todo = line.match(TODO);
    if (todo) hits.push(`  line ${i + 1}: ${todo[0].trim()}`);
  });
  if (hits.length) {
    total += hits.length;
    console.log(`\n${relative(root, file)}  (${hits.length})`);
    console.log(hits.join('\n'));
  }
}

// Resume PDF
const profile = readFileSync(join(contentDir, 'profile.yaml'), 'utf8');
const resumePath = profile.match(/^\s*file:\s*(\S+)/m)?.[1];
if (resumePath) {
  const pdf = join(root, 'public', resumePath);
  if (!existsSync(pdf)) {
    total++;
    console.log(`\nResume PDF missing: public${resumePath}`);
  } else if (readFileSync(pdf, 'latin1').includes('RESUME PLACEHOLDER')) {
    total++;
    console.log(`\nResume PDF is still the placeholder file: public${resumePath}`);
  }
}

// Photo + project images
if (!/^\s*photo:/m.test(profile)) {
  total++;
  console.log('\nProfile photo not set (content/profile.yaml → photo)');
}
const projectsDir = join(contentDir, 'projects');
for (const name of readdirSync(projectsDir)) {
  const file = join(projectsDir, name, 'index.md');
  if (name.startsWith('_') || !existsSync(file)) continue;
  const text = readFileSync(file, 'utf8');
  const missing = [];
  if (!/^cover:/m.test(text)) missing.push('cover image');
  if (!/^gallery:/m.test(text)) missing.push('gallery');
  if (missing.length) {
    total++;
    console.log(`\ncontent/projects/${name}: no ${missing.join(' or ')} yet`);
  }
}

console.log(total ? `\n${total} item(s) still to fill in.\n` : '\nNo placeholders left. 🎉\n');
