export function groupEvents(events) {
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const tomorrow = new Date(today);
	tomorrow.setDate(today.getDate() - 2);

	const upcoming = [];
	const past = [];

	for (const event of events) {
		if (event.type === 'upcoming' || new Date(event.date) >= tomorrow) {
			upcoming.push(event);
		} else {
			past.push(event);
		}
	}

	upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));
	past.sort((a, b) => new Date(b.date) - new Date(a.date));

	return { upcoming, past };
}
