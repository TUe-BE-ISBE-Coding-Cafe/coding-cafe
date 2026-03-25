<script>
	import { formatEventTime } from '$lib/utils/events.js';

	export let event;
	export let variant = 'upcoming';
	export let view = 'list';
	export let index = 0;

	const formatDate = (isoString) => {
		const date = new Date(isoString);
		return new Intl.DateTimeFormat('en-GB', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		}).format(date);
	};

	const isPast = variant === 'past';
	const detailHref = `/events/${event.slug}`;
	const eventTime = formatEventTime(event);
</script>

{#if view === 'grid'}
	<article
		class="agenda-card agenda-card-grid group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-white p-6 shadow-sm"
		style={`--card-delay: ${index * 80}ms;`}
	>
		<div class="mb-6 flex items-start justify-between gap-4">
			<div class="rounded-xl bg-[#f7d7d7] px-3 py-1 text-sm font-semibold text-[#C81919]">
				{formatDate(event.date)}
			</div>
			{#if eventTime}
				<p class="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">{eventTime}</p>
			{/if}
		</div>

		<div class="flex-1 space-y-4">
			<div class="space-y-2">
				<h3 class="text-2xl font-bold tracking-tight text-zinc-900 transition-colors group-hover:text-[#C81919]">
					{event.title}
				</h3>
				{#if event.subtitle}
					<p class="text-sm text-zinc-500">{event.subtitle}</p>
				{/if}
			</div>

			{#if event.tags}
				<div class="flex flex-wrap gap-2">
					{#each event.tags as tag}
						<span class="rounded-full bg-zinc-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-600">
							{tag}
						</span>
					{/each}
				</div>
			{/if}

			{#if event.description}
				<p class="text-sm leading-6 text-zinc-600">{event.description}</p>
			{/if}
		</div>

		<div class="mt-8 space-y-4 border-t border-zinc-100 pt-5">
			<div class="flex items-center gap-3">
				{#if event.speaker_link}
					<a
						href={event.speaker_link}
						target="_blank"
						rel="noreferrer"
						class="speaker-chip flex min-w-0 flex-1 items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-2"
						aria-label={`More about ${event.speaker}`}
					>
						{#if event.speakerImage}
							<img
								src={event.speakerImage}
								alt={event.speaker}
								class="h-11 w-11 rounded-full object-cover ring-2 ring-white shadow-sm"
							/>
						{:else}
							<div class="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-100 text-xs font-bold text-zinc-400">
								CC
							</div>
						{/if}

						<div class="min-w-0 flex-1">
							<p class="truncate text-sm font-semibold text-zinc-900">{event.speaker}</p>
							<p class="truncate text-[11px] uppercase tracking-[0.14em] text-zinc-500">
								More info
							</p>
						</div>
					</a>
				{:else}
					<div class="flex min-w-0 flex-1 items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-2">
						{#if event.speakerImage}
							<img
								src={event.speakerImage}
								alt={event.speaker}
								class="h-11 w-11 rounded-full object-cover ring-2 ring-white shadow-sm"
							/>
						{:else}
							<div class="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-100 text-xs font-bold text-zinc-400">
								CC
							</div>
						{/if}

						<div class="min-w-0 flex-1">
							<p class="truncate text-sm font-semibold text-zinc-900">{event.speaker}</p>
							{#if event.location}
								<p class="truncate text-xs text-zinc-500">{event.location}</p>
							{/if}
						</div>
					</div>
				{/if}

				{#if isPast}
					<a
						href={detailHref}
						class="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 transition-all group-hover:bg-[#C81919] group-hover:text-white"
						aria-label={`Open ${event.title}`}
					>
						<svg viewBox="0 0 24 24" aria-hidden="true" class="h-4 w-4">
							<path d="M7 17L17 7M17 7H8M17 7V16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
					</a>
				{:else if event.calendar}
					<a
						href={event.calendar}
						target="_blank"
						rel="noreferrer"
						class="rounded-full bg-[#C81919] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-transform hover:-translate-y-0.5"
					>
						Calendar
					</a>
				{/if}
			</div>
		</div>
	</article>
{:else if isPast}
	<article
		class="agenda-card agenda-card-list group grid min-h-[180px] overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-white p-6 shadow-sm md:grid-cols-[1.2fr_2.6fr_1fr]"
		style={`--card-delay: ${index * 80}ms;`}
	>
		<div class="space-y-3 border-b border-zinc-100 pb-5 md:border-b-0 md:border-r md:pb-0 md:pr-6">
			<p class="text-xl font-bold tracking-tight text-zinc-900">{formatDate(event.date)}</p>
			{#if eventTime}
				<p class="text-sm font-medium text-zinc-500">{eventTime}</p>
			{/if}
			{#if event.location}
				<p class="text-sm text-zinc-500">{event.location}</p>
			{/if}
		</div>

		<div class="space-y-4 py-5 md:px-6 md:py-0">
			<div class="space-y-2">
				<h3 class="text-2xl font-bold tracking-tight text-zinc-900 transition-colors group-hover:text-[#C81919]">
					{event.title}
				</h3>
				{#if event.subtitle}
					<p class="text-sm text-zinc-500">{event.subtitle}</p>
				{/if}
			</div>

			{#if event.tags}
				<div class="flex flex-wrap gap-2">
					{#each event.tags as tag}
						<span class="rounded-full bg-zinc-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-600">
							{tag}
						</span>
					{/each}
				</div>
			{/if}

			{#if event.description}
				<p class="text-sm leading-6 text-zinc-600">{event.description}</p>
			{/if}
		</div>

		<div class="flex flex-col justify-between gap-5 border-t border-zinc-100 pt-5 md:border-t-0 md:border-l md:pl-6 md:pt-0">
			{#if event.speaker_link}
				<a
					href={event.speaker_link}
					target="_blank"
					rel="noreferrer"
					class="speaker-chip flex items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-2"
					aria-label={`More about ${event.speaker}`}
				>
					{#if event.speakerImage}
						<img
							src={event.speakerImage}
							alt={event.speaker}
							class="h-12 w-12 rounded-full object-cover ring-2 ring-white shadow-sm"
						/>
					{:else}
						<div class="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 text-xs font-bold text-zinc-400">
							CC
						</div>
					{/if}

					<div class="min-w-0">
						<p class="truncate text-sm font-semibold text-zinc-900">{event.speaker}</p>
						<p class="text-[11px] uppercase tracking-[0.14em] text-zinc-500">More info</p>
					</div>
				</a>
			{:else}
				<div class="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-2">
					{#if event.speakerImage}
						<img
							src={event.speakerImage}
							alt={event.speaker}
							class="h-12 w-12 rounded-full object-cover ring-2 ring-white shadow-sm"
						/>
					{:else}
						<div class="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 text-xs font-bold text-zinc-400">
							CC
						</div>
					{/if}

					<div class="min-w-0">
						<p class="truncate text-sm font-semibold text-zinc-900">{event.speaker}</p>
					</div>
				</div>
			{/if}

			<div class="flex items-center justify-between">
				<div class="flex flex-wrap items-center gap-3 text-sm">
					{#if event.repo}
						<span class="text-zinc-500">Exercises on GitHub</span>
					{/if}
					{#if event.zenodo}
						<img
							src={`https://zenodo.org/badge/DOI/${event.zenodo}.svg`}
							alt="DOI badge"
							class="h-5"
						/>
					{/if}
				</div>
				<a
					href={detailHref}
					class="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400 transition-colors hover:text-[#C81919]"
					aria-label={`Open materials for ${event.title}`}
				>
					<span>Materials</span>
					<svg viewBox="0 0 24 24" aria-hidden="true" class="h-4 w-4 transition-transform hover:translate-x-1">
						<path d="M7 17L17 7M17 7H8M17 7V16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				</a>
			</div>
		</div>
	</article>
{:else}
	<article
		class="agenda-card agenda-card-list group grid min-h-[180px] overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-white p-6 shadow-sm md:grid-cols-[1.2fr_2.6fr_1fr]"
		style={`--card-delay: ${index * 80}ms;`}
	>
		<div class="space-y-3 border-b border-zinc-100 pb-5 md:border-b-0 md:border-r md:pb-0 md:pr-6">
			<p class="text-xl font-bold tracking-tight text-zinc-900">{formatDate(event.date)}</p>
			{#if eventTime}
				<p class="text-sm font-medium text-zinc-500">{eventTime}</p>
			{/if}
			{#if event.location}
				<p class="text-sm text-zinc-500">{event.location}</p>
			{/if}
		</div>

		<div class="space-y-4 py-5 md:px-6 md:py-0">
			<div class="space-y-2">
				<h3 class="text-2xl font-bold tracking-tight text-zinc-900 transition-colors group-hover:text-[#C81919]">
					{event.title}
				</h3>
				{#if event.subtitle}
					<p class="text-sm text-zinc-500">{event.subtitle}</p>
				{/if}
			</div>

			{#if event.tags}
				<div class="flex flex-wrap gap-2">
					{#each event.tags as tag}
						<span class="rounded-full bg-zinc-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-600">
							{tag}
						</span>
					{/each}
				</div>
			{/if}

			{#if event.description}
				<p class="text-sm leading-6 text-zinc-600">{event.description}</p>
			{/if}
		</div>

		<div class="flex flex-col justify-between gap-5 border-t border-zinc-100 pt-5 md:border-t-0 md:border-l md:pl-6 md:pt-0">
			{#if event.speaker_link}
				<a
					href={event.speaker_link}
					target="_blank"
					rel="noreferrer"
					class="speaker-chip flex items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-2"
					aria-label={`More about ${event.speaker}`}
				>
					{#if event.speakerImage}
						<img
							src={event.speakerImage}
							alt={event.speaker}
							class="h-12 w-12 rounded-full object-cover ring-2 ring-white shadow-sm"
						/>
					{:else}
						<div class="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 text-xs font-bold text-zinc-400">
							CC
						</div>
					{/if}

					<div class="min-w-0">
						<p class="truncate text-sm font-semibold text-zinc-900">{event.speaker}</p>
						<p class="text-[11px] uppercase tracking-[0.14em] text-zinc-500">More info</p>
					</div>
				</a>
			{:else}
				<div class="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-2">
					{#if event.speakerImage}
						<img
							src={event.speakerImage}
							alt={event.speaker}
							class="h-12 w-12 rounded-full object-cover ring-2 ring-white shadow-sm"
						/>
					{:else}
						<div class="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 text-xs font-bold text-zinc-400">
							CC
						</div>
					{/if}

					<div class="min-w-0">
						<p class="truncate text-sm font-semibold text-zinc-900">{event.speaker}</p>
					</div>
				</div>
			{/if}

			<div class="flex flex-wrap items-center gap-3">
				{#if event.calendar}
					<a
						href={event.calendar}
						target="_blank"
						rel="noreferrer"
						class="rounded-full bg-[#C81919] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-transform hover:-translate-y-0.5"
					>
						Add to calendar
					</a>
				{/if}
			</div>
		</div>
	</article>
{/if}

<style>
	.agenda-card {
		animation: card-enter 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
		animation-delay: var(--card-delay, 0ms);
		transform-origin: center;
		transition:
			transform 180ms ease,
			box-shadow 180ms ease,
			border-color 180ms ease;
	}

	.agenda-card:hover {
		transform: translateY(-6px) scale(1.01);
		box-shadow: 0 24px 50px -24px rgb(24 24 27 / 0.28);
		border-color: rgb(228 228 231);
	}

	.agenda-card-grid:hover {
		transform: translateY(-8px);
	}

	.speaker-chip {
		transition:
			border-color 180ms ease,
			background-color 180ms ease,
			transform 180ms ease,
			box-shadow 180ms ease;
	}

	.speaker-chip:hover {
		transform: translateY(-1px);
		border-color: rgb(200 25 25 / 0.35);
		background-color: rgb(254 242 242);
		box-shadow: 0 12px 24px -18px rgb(200 25 25 / 0.35);
	}

	@keyframes card-enter {
		from {
			opacity: 0;
			transform: translateY(22px) scale(0.985);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}
</style>
