function parseEventDate(dateString) {
	if (!dateString) return new Date(Number.NaN);

	const [year, month, day] = dateString.split('-').map(Number);
	return new Date(year, month - 1, day);
}

export function groupEvents(events) {
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const upcoming = [];
	const past = [];

	for (const event of events) {
		if (event.type === 'upcoming' || parseEventDate(event.date) >= today) {
			upcoming.push(event);
		} else {
			past.push(event);
		}
	}

	upcoming.sort((a, b) => parseEventDate(a.date) - parseEventDate(b.date));
	past.sort((a, b) => parseEventDate(b.date) - parseEventDate(a.date));

	return { upcoming, past };
}

export function formatEventTime(event) {
	if (!event?.startTime && !event?.endTime) return event?.time ?? '';
	if (event?.startTime && event?.endTime) return `${event.startTime} - ${event.endTime}`;
	return event?.startTime || event?.endTime || '';
}
