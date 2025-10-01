<script>
	import past from '$lib/data/past-events.json';
	import future from '$lib/data/future-events.json';

	const formatDate = (isoString) => {
		const date = new Date(isoString);
		return new Intl.DateTimeFormat('en-GB', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		}).format(date);
	};

	const formatMonthShort = (isoString) => {
		const date = new Date(isoString);
		return date.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase();
	};

	const getDay = (isoString) => new Date(isoString).getDate();
</script>

<section class="mx-auto max-w-screen-xl px-8 py-2">
	<h1 class="mb-4 text-4xl font-normal">Welcome to the Coding Café @TU/e BE</h1>
	<p class="text-lg">
		The Coding Café is a monthly community event organized by the Information Systems group in the
		Department of the Built Environment at TU/e. It's open to everyone interested in writing,
		sharing, and learning about code in a relaxed and inclusive environment.
	</p>

	<p class="pb-4 text-lg">
		You can learn more about the Coding Café on our <a
			href="/about"
			class="text-blue-600 underline hover:text-blue-800">About page</a
		>. This page lists all upcoming and previous sessions, it also contains slides, demos, and
		exercises from each edition.
	</p>

	<h1 class="text-4xl">/ AGENDA</h1>
	<h2 class="py-4 text-2xl">UPCOMING SESSIONS</h2>

	<!-- UPCOMING SESSIONS-->

	{#each future as event}
		<div
			class="group my-2 grid min-h-[150px] items-stretch overflow-hidden rounded-2xl bg-gray-200 sm:grid-cols-2 md:grid-cols-[1.8fr_4.2fr_1.2fr_0.8fr]"
		>
			<!-- DATE BLOCK LEFT-->
			<div
				class="flex h-full flex-col p-2 text-[#C81919] sm:text-center md:border-r-4 md:border-[#C81919] md:text-right"
			>
				<p class="text-2xl font-bold">
					{formatDate(event.date)}
				</p>
				<p class="text-xl">Wednesday</p>
				{#if event.time}
					<p class="  text-lg font-semibold">{event.time}</p>
				{/if}
				{#if event.location}
					<p class="text-lg font-medium">{event.location}</p>
				{/if}
			</div>
			<!-- TITLE + SUBTITLE MIDDLE-->
			<div class="flex h-full flex-col pl-2">
				<h2 class=" pt-2 text-2xl text-gray-800">
					{event.title}
				</h2>
				{#if event.subtitle}
					<h3 class="text-sm text-gray-600">{event.subtitle}</h3>
				{/if}
				{#if event.tags}
					<div class="flex flex-wrap gap-1 pb-2">
						{#each event.tags as tag}
							<span class="px-1 text-xs font-medium text-[#C81919]">
								#{tag}
							</span>
						{/each}
					</div>
				{/if}
				{#if event.description}
					<h3 class="text-sm text-black">{event.description}</h3>
				{/if}
			</div>
			<div class="flex h-full flex-col items-center justify-center p-2">
				<!-- Speaker image -->
				<div class="flex flex-col items-center justify-center">
					{#if event.speakerImage}
						<img
							src={event.speakerImage}
							alt={event.speaker}
							class="h-20 w-20 rounded-full object-cover"
						/>
					{:else}
						<div class="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
							<svg viewBox="0 0 24 24" class="h-10 w-10 text-gray-300">
								<path
									fill="currentColor"
									d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2m-13-6 2.03 2.71 2.71-3.61L17 17H7z"
								/>
							</svg>
						</div>
					{/if}
					<button
						class="mt-2 rounded-2xl bg-gray-300 px-1 text-sm font-medium text-gray-600 hover:bg-gray-500 hover:text-white"
						on:click={() => window.open(event.speaker_link, '_blank')}
						>{event.speaker}
					</button>
				</div>
			</div>
			<!-- CALENDAR BUTTON RIGHT-->
			<div class="flex h-full flex-col items-center justify-center p-2 pr-4">
				<!-- Calendar link -->
				{#if event.calendar}
					<a
						href={event.calendar}
						target="_blank"
						class="text-md inline-block w-full rounded-lg bg-[#C81919] px-2 py-2 text-center font-light text-white shadow-lg transition hover:bg-[#a60d25]"
					>
						Add to Calendar
					</a>
				{/if}
			</div>
		</div>
	{/each}
</section>

<section class="mx-auto max-w-screen-xl px-8">
	<h2 class="py-2 text-2xl">PAST SESSIONS</h2>

	{#each past as event}
		<a
			href={event.path}
			aria-label={`Open ${event.title}. Click to see the materials.`}
			class="group my-2 grid min-h-[150px] items-stretch overflow-hidden rounded-2xl bg-gray-200 sm:grid-cols-2 md:grid-cols-[1.8fr_4.2fr_1.2fr_0.8fr]"
		>
			<!-- DATE BLOCK LEFT-->
			<div
				class="flex h-full flex-col p-2 text-[#C81919] md:border-r-4 md:border-[#C81919] md:text-right"
			>
				<p class="text-2xl font-bold">
					{formatDate(event.date)}
				</p>
				<p class="text-xl">Wednesday</p>
				{#if event.time}
					<p class=" text-lg font-semibold">{event.time}</p>
				{/if}
				{#if event.location}
					<p class=" text-lg font-medium">{event.location}</p>
				{/if}
			</div>
			<!-- TITLE + SUBTITLE MIDDLE-->
			<div class="flex h-full flex-col pl-2">
				<h2 class="text-2xl text-gray-800">
					{event.title}
				</h2>
				{#if event.subtitle}
					<h3 class="text-sm text-gray-600">{event.subtitle}</h3>
				{/if}
				{#if event.tags}
					<div class="flex flex-wrap gap-1">
						{#each event.tags as tag}
							<span class="px-1 text-xs font-medium text-red-700">
								#{tag}
							</span>
						{/each}
					</div>
				{/if}
				{#if event.description}
					<h3 class="text-sm text-gray-600">{event.description}</h3>
				{/if}
				<div class="flex flex-wrap gap-3 pt-4 text-sm">
					{#if event.repo}
						<button
							type="button"
							on:click={() => window.open(event.repo, '_blank')}
							class="text-blue-600 underline">Github</button
						>
					{/if}
					{#if event.zenodo}
						<button
							type="button"
							on:click={() => window.open(event.zenodo, '_blank')}
							class="flex items-center gap-2"
						>
							<img
								src={`https://zenodo.org/badge/DOI/${event.zenodo}.svg`}
								alt="DOI badge"
								class="h-5"
							/>
						</button>
					{/if}
				</div>
			</div>
			<div class="flex h-full flex-col p-2">
				<!-- Speaker image -->
				<div class="flex flex-col items-center">
					<p></p>
					{#if event.speakerImage}
						<img
							src={event.speakerImage}
							alt={event.speaker}
							class="h-20 w-20 rounded-full object-cover"
						/>
					{:else}
						<div class="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
							<svg viewBox="0 0 24 24" class="h-10 w-10 text-gray-300">
								<path
									fill="currentColor"
									d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2m-13-6 2.03 2.71 2.71-3.61L17 17H7z"
								/>
							</svg>
						</div>
					{/if}
					<button
						class="mt-2 rounded-2xl bg-gray-300 px-1 text-sm font-medium text-gray-600 hover:bg-gray-500 hover:text-white"
						on:click={() => window.open(event.speaker_link, '_blank')}
						>{event.speaker}
					</button>
				</div>
			</div>
			<!-- CALENDAR BUTTON RIGHT-->
			<div class="flex h-full flex-col items-center justify-center p-2 pr-4">
				<!-- Calendar link -->
				<!-- RIGHT: arrow (diagonal ↗) -->
				<div class="col-start-3 row-span-2 flex items-center justify-center px-3 text-gray-400">
					<svg
						viewBox="0 0 36 36"
						aria-hidden="true"
						class="h-5 w-5 translate-x-1 -translate-y-1 scale-95 transform opacity-0
              transition-all duration-300 ease-out
              group-hover:translate-x-0 group-hover:-translate-y-0 group-hover:scale-100 group-hover:opacity-100"
					>
						<!-- Lugano-style “corner arrow” -->
						<path
							d="M1.5 34.5L34.5 1.5M34.5 1.5H1.5M34.5 1.5V34.5"
							stroke="currentColor"
							stroke-width="5"
							stroke-linecap="square"
						/>
					</svg>
				</div>
				<p
					class="mt-1 text-right text-[11px] text-gray-500 opacity-0 transition-opacity duration-300 select-none group-hover:opacity-100"
				>
					Click to see the materials
				</p>
			</div>
		</a>
	{/each}
</section>
