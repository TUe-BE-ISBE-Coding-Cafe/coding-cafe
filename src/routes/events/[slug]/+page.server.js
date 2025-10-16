import path from 'path';
import { error } from '@sveltejs/kit';
import { readFile, readdir, stat } from 'fs/promises';
import matter from 'gray-matter';
import { marked } from 'marked';
import events from '$lib/data/events.json';

marked.setOptions({ mangle: false, headerIds: false });

const PROJECT_ROOT = process.cwd();
const STATIC_EVENTS_DIR = path.join(PROJECT_ROOT, 'static', 'events');
const POSTER_CANDIDATES = ['poster.png', 'poster.jpg', 'poster.jpeg', 'poster.webp'];

const fileExists = async (filePath) => {
	try {
		await stat(filePath);
		return true;
	} catch {
		return false;
	}
};

const normaliseStaticPath = (slug, value) => {
	if (!value) return value;
	if (value.startsWith('http')) return value;
	if (value.startsWith('/')) return value;
	const trimmed = value.replace(/^\.\//, '');
	return `/events/${slug}/${trimmed}`;
};

const collectFiles = async (directory, baseHref, exclude = new Set()) => {
	const results = [];
	try {
		const entries = await readdir(directory, { withFileTypes: true });
		for (const entry of entries) {
			if (entry.name.startsWith('.')) continue;
			const fullPath = path.join(directory, entry.name);
			const href = `${baseHref}/${entry.name}`;
			if (exclude.has(entry.name)) continue;
			if (entry.isDirectory()) {
				results.push(...(await collectFiles(fullPath, href, exclude)));
			} else {
				results.push({ name: entry.name, href });
			}
		}
	} catch (err) {
		if (err.code !== 'ENOENT') throw err;
	}
	return results;
};

export async function load({ params }) {
	const { slug } = params;
	const event = events.find((item) => item.slug === slug);
	if (!event) {
		throw error(404, `Event not found for slug: ${slug}`);
	}

	const eventDir = path.join(STATIC_EVENTS_DIR, slug);
	const infoPath = path.join(eventDir, 'info.md');

	let overrides = {};
	let htmlContent = '';

	if (await fileExists(infoPath)) {
		const raw = await readFile(infoPath, 'utf-8');
		const parsed = matter(raw);
		overrides = parsed.data ?? {};
		htmlContent = parsed.content ? marked.parse(parsed.content) : '';
	}

	const merged = {
		...event,
		...overrides
	};

	merged.poster = normaliseStaticPath(slug, merged.poster);
	merged.slides = normaliseStaticPath(slug, merged.slides);

	if (!merged.poster) {
		for (const candidate of POSTER_CANDIDATES) {
			const candidatePath = path.join(eventDir, candidate);
			if (await fileExists(candidatePath)) {
				merged.poster = `/events/${slug}/${candidate}`;
				break;
			}
		}
	}

	const excludeFiles = new Set(['info.md']);
	if (merged.poster) {
		const posterName = merged.poster.split('/').pop();
		if (posterName) excludeFiles.add(posterName);
	}

	const attachments = await collectFiles(eventDir, `/events/${slug}`, excludeFiles);

	return {
		event: merged,
		content: htmlContent,
		attachments
	};
}
