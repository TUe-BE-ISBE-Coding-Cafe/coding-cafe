<script>
	import AgendaEventCard from '$lib/components/AgendaEventCard.svelte';
	import events from '$lib/data/events.json';
	import { groupEvents } from '$lib/utils/events.js';

	let viewMode = 'list';

	const { upcoming, past } = groupEvents(events);
</script>

<section class="bg-[linear-gradient(180deg,#fff8f4_0%,#ffffff_55%,#fff3f3_100%)]">
	<div class="mx-auto max-w-screen-xl px-8 py-14">
		<div class="max-w-3xl space-y-6">
			<p class="text-sm font-semibold uppercase tracking-[0.32em] text-[#C81919]">Agenda</p>
			<h1 class="text-5xl font-black tracking-tight text-zinc-900 md:text-6xl">
				Explore upcoming and past Coding Cafe sessions.
			</h1>
			<p class="max-w-2xl text-lg leading-8 text-zinc-600">
				Upcoming sessions, past materials, and direct links to talks and exercises live here.
			</p>
		</div>
	</div>
</section>

<section class="mx-auto max-w-screen-xl px-8 py-10">
	<div class="space-y-12">
		<div class="space-y-6">
			<div class="flex items-end justify-between gap-4 border-b border-zinc-200 pb-4">
				<div>
					<p class="text-sm font-semibold uppercase tracking-[0.2em] text-[#C81919]">
						Upcoming
					</p>
					<h2 class="text-3xl font-bold tracking-tight text-zinc-900">Next sessions</h2>
				</div>

				<div class="hidden rounded-[1.75rem] border border-zinc-200 bg-white/85 p-4 shadow-[0_24px_60px_-32px_rgba(24,24,27,0.25)] backdrop-blur md:block">
					<div class="flex items-center gap-6">
						<div>
							<p class="text-lg font-bold tracking-tight text-zinc-900">Event browser</p>
							<p class="text-sm text-zinc-500">
								{upcoming.length} upcoming session{upcoming.length === 1 ? '' : 's'} and {past.length} archived session{past.length === 1 ? '' : 's'}.
							</p>
						</div>

						<div class="inline-flex w-fit rounded-2xl bg-zinc-100 p-1">
							<button
								type="button"
								class={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${
									viewMode === 'list'
										? 'bg-white text-[#C81919] shadow-sm'
										: 'text-zinc-500 hover:text-zinc-800'
								}`}
								on:click={() => (viewMode = 'list')}
								aria-pressed={viewMode === 'list'}
							>
								<svg viewBox="0 0 24 24" aria-hidden="true" class="h-4 w-4">
									<path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
								</svg>
								List
							</button>
							<button
								type="button"
								class={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${
									viewMode === 'grid'
										? 'bg-white text-[#C81919] shadow-sm'
										: 'text-zinc-500 hover:text-zinc-800'
								}`}
								on:click={() => (viewMode = 'grid')}
								aria-pressed={viewMode === 'grid'}
							>
								<svg viewBox="0 0 24 24" aria-hidden="true" class="h-4 w-4">
									<path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
								</svg>
								Grid
							</button>
						</div>
					</div>
				</div>
			</div>

			<div class="rounded-[1.75rem] border border-zinc-200 bg-white/85 p-4 shadow-[0_24px_60px_-32px_rgba(24,24,27,0.25)] backdrop-blur md:hidden">
				<div class="flex flex-col gap-4">
					<div>
						<p class="text-lg font-bold tracking-tight text-zinc-900">Event browser</p>
						<p class="text-sm text-zinc-500">
							{upcoming.length} upcoming session{upcoming.length === 1 ? '' : 's'} and {past.length} archived session{past.length === 1 ? '' : 's'}.
						</p>
					</div>

					<div class="inline-flex w-fit rounded-2xl bg-zinc-100 p-1">
						<button
							type="button"
							class={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${
								viewMode === 'list'
									? 'bg-white text-[#C81919] shadow-sm'
									: 'text-zinc-500 hover:text-zinc-800'
							}`}
							on:click={() => (viewMode = 'list')}
							aria-pressed={viewMode === 'list'}
						>
							<svg viewBox="0 0 24 24" aria-hidden="true" class="h-4 w-4">
								<path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
							</svg>
							List
						</button>
						<button
							type="button"
							class={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${
								viewMode === 'grid'
									? 'bg-white text-[#C81919] shadow-sm'
									: 'text-zinc-500 hover:text-zinc-800'
							}`}
							on:click={() => (viewMode = 'grid')}
							aria-pressed={viewMode === 'grid'}
						>
							<svg viewBox="0 0 24 24" aria-hidden="true" class="h-4 w-4">
								<path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
							</svg>
							Grid
						</button>
					</div>
				</div>
			</div>

			{#if upcoming.length}
				<div class={viewMode === 'grid' ? 'grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3' : 'space-y-4'}>
					{#each upcoming as event, index (event.slug)}
						<AgendaEventCard event={event} variant="upcoming" view={viewMode} {index} />
					{/each}
				</div>
			{:else}
				<p class="rounded-3xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-10 text-zinc-500">
					No upcoming sessions are published yet.
				</p>
			{/if}
		</div>

		<div class="space-y-6">
			<div class="flex items-end justify-between gap-4 border-b border-zinc-200 pb-4">
				<div>
					<p class="text-sm font-semibold uppercase tracking-[0.2em] text-[#C81919]">Archive</p>
					<h2 class="text-3xl font-bold tracking-tight text-zinc-900">Past sessions</h2>
				</div>
			</div>

			{#if past.length}
				<div class={viewMode === 'grid' ? 'grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3' : 'space-y-4'}>
					{#each past as event, index (event.slug)}
						<AgendaEventCard event={event} variant="past" view={viewMode} index={index + upcoming.length} />
					{/each}
				</div>
			{:else}
				<p class="rounded-3xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-10 text-zinc-500">
					Past sessions will appear here once they are archived.
				</p>
			{/if}
		</div>
	</div>
</section>
