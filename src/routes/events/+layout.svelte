<script>
	import past from '$lib/data/past-events.json';

	export let data;
	const formatDate = (isoString) => {
		if (!isoString) return 'No date provided';
		const date = new Date(isoString);
		if (isNaN(date)) return 'Invalid date';
		return new Intl.DateTimeFormat('en-GB', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		}).format(date);
	};
</script>

<div class="mx-auto max-w-5xl px-4 py-10">
	<!-- Back button -->
	<a
		href="/agenda"
		class="mb-6 inline-block rounded bg-[#C8102E] px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
	>
		← Back to Agenda
	</a>

	<!-- Main two-column layout -->
	<div class="flex flex-col-reverse gap-6 sm:flex-row sm:items-start sm:justify-between">
		<!-- Left: Content block -->
		<div class="flex-1 space-y-4">
			<!-- Title -->
			<h1 class="text-3xl font-bold">{data.title}</h1>

			<!-- Subtitle -->
			{#if data.subtitle}
				<h2 class="text-lg text-gray-600">{data.subtitle}</h2>
			{/if}

			<!-- Meta info -->
			<p class="text-sm text-gray-600">
				{#if data.date}
					📅 {formatDate(data.date)}
				{/if}
				{#if data.speaker}
					&nbsp; &middot; 🎤 {data.speaker}
				{/if}
			</p>

			<!-- Tags -->
			{#if data.tags}
				<div class="flex flex-wrap gap-2 pt-2">
					{#each data.tags as tag}
						<span class="rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-700">
							#{tag}
						</span>
					{/each}
				</div>
			{/if}

			<!-- External links -->
			<div class="flex flex-wrap gap-4 pt-4 text-sm">
				{#if data.slides}
					<a href={data.slides} target="_blank" class="text-blue-600 underline">📄 Slides</a>
				{/if}
				{#if data.repo}
					<a href={data.repo} target="_blank" class="text-blue-600 underline">💻 GitHub</a>
				{/if}
				{#if data.zenodo}
					<a
						href={'https://doi.org/' + data.zenodo}
						target="_blank"
						class="text-blue-600 underline"
					>
						📘 Zenodo
					</a>
				{/if}
			</div>

			<!-- Markdown content -->
			<article class="prose prose-slate max-w-none pt-6">
				<slot />
			</article>
		</div>

		<!-- Right: Poster image -->
		{#if data.poster}
			<div class="w-full flex-shrink-0 sm:w-[240px]">
				<img
					src={data.poster}
					alt={'Poster for ' + data.title}
					class="h-auto w-full rounded-lg object-contain shadow-md"
				/>
			</div>
		{/if}
	</div>
</div>
