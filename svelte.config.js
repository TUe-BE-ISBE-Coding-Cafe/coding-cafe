import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';
import fs from 'fs';

const eventsJson = JSON.parse(fs.readFileSync('src/lib/data/events.json', 'utf-8'));
const eventSlugs = eventsJson.map((event) => `/events/${event.slug}`);

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
