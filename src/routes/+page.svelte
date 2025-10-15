<script>
	import events from '$lib/data/events.json';
	import EventCard from '$lib/components/EventCard.svelte';
	import { groupEvents } from '$lib/utils/events.js';
	const { upcoming, past } = groupEvents(events);
</script>

<section class="mx-auto max-w-screen-xl px-8 py-2">
	<h1 class="mb-4 text-4xl font-normal">Welcome to the Coding Café @TU/e BE</h1>
	<p class="text-lg">
		The Coding Café is a monthly community event organized by the Information Systems group in the
		Department of the Built Environment at TU/e. It's open to everyone interested in writing,
		sharing, and learning about code in a relaxed and inclusive environment.
	</p>

	<p class="pb-4 text-lg">
		You can learn more about the Coding Café on our
		<a href="/about" class="text-blue-600 underline hover:text-blue-800">About page</a>. This page
		lists all upcoming and previous sessions, it also contains slides, demos, and exercises from
		each edition.
	</p>

	<h1 class="text-4xl">/ AGENDA</h1>

	<h2 class="py-4 text-2xl">UPCOMING SESSIONS</h2>
	{#each upcoming as event}
		<EventCard {event} variant="upcoming" />
	{/each}
</section>

<section class="mx-auto max-w-screen-xl px-8">
	<h2 class="py-2 text-2xl">PAST SESSIONS</h2>
	{#each past as event}
		<EventCard {event} variant="past" />
	{/each}
</section>
