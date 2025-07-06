import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';
import fs from 'fs';

const eventSlugs = fs
	.readdirSync('src/lib/events')
	.filter((f) => f.endsWith('.md'))
	.map((f) => `/events/${f.replace('.md', '')}`);

const config = {
	extensions: ['.svelte', '.svx', '.md'],
	preprocess: [mdsvex({ extensions: ['.svx', '.md'] })],
	kit: {
		adapter: adapter(),
		prerender: {
			entries: ['*', ...eventSlugs] // 👈 Required for dynamic slugs
		}
	}
};

export default config;
