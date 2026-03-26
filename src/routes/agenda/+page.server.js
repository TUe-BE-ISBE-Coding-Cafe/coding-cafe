import path from 'path';
import { stat } from 'fs/promises';
import events from '$lib/data/events.json';

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

export async function load() {
	const agendaEvents = await Promise.all(
		events.map(async (event) => {
			if (event.poster) return event;
			if (!event.slug) return event;

			for (const candidate of POSTER_CANDIDATES) {
				const candidatePath = path.join(STATIC_EVENTS_DIR, event.slug, candidate);
				if (await fileExists(candidatePath)) {
					return {
						...event,
						poster: `/events/${event.slug}/${candidate}`
					};
				}
			}

			return event;
		})
	);

	return {
		events: agendaEvents
	};
}
