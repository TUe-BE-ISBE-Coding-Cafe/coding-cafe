import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const eventDir = './static/events';
const outFile = './static/events/events.json';

const events = [];

fs.readdirSync(eventDir).forEach((folder) => {
	const filePath = path.join(eventDir, folder, `info.md`);
	if (fs.existsSync(filePath)) {
		const content = fs.readFileSync(filePath, 'utf8');
		const { data } = matter(content);
		events.push({
			...data,
			slug: folder,
			path: `/events/${folder}/${folder}.md`
		});
	}
});

// Sort by date
events.sort((a, b) => new Date(b.date) - new Date(a.date));

fs.writeFileSync(outFile, JSON.stringify(events, null, 2));
console.log(`✅ Generated ${outFile} with ${events.length} events`);
