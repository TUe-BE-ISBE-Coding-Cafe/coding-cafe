<script>
	import past from '$lib/data/past-events.json';

	const formatDate = (isoString) => {
		const date = new Date(isoString);
		return new Intl.DateTimeFormat('en-GB', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		}).format(date);
	};
</script>

<section class="mx-auto max-w-screen-xl px-8 py-16">
	<h1 class="text-tue-red mb-8 text-3xl font-bold">Past Events</h1>

	<div class="space-y-6">
		{#each past as event}
			<div
				class="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
			>
				<!-- Event Info -->
				<div class="space-y-2">
					<h2 class="text-xl font-semibold text-gray-800">
						<a href={event.path} class="hover:text-[#C8102E]">{event.title}</a>
					</h2>
					{#if event.subtitle}
						<h3 class="text-lg text-gray-600">{event.subtitle}</h3>
					{/if}
					{#if event.speaker}
						<p class="text-sm text-gray-600">🎤 {event.speaker}</p>
					{/if}
					<p class="text-sm text-gray-600">📅 {formatDate(event.date)}</p>

					<!-- Links -->
					<div class="flex flex-wrap gap-3 pt-1 text-sm">
						{#if event.repo}
							<a href={event.repo} target="_blank" class="text-blue-600 underline">
								💻 Exercises on GitHub
							</a>
						{/if}
						{#if event.zenodo}
							Slides on Zenodo --> <a
								href={`${event.zenodo}`}
								target="_blank"
								class="inline-flex items-center gap-2"
							>
								<img
									src={`https://zenodo.org/badge/DOI/${event.zenodo}.svg`}
									alt="DOI badge"
									class="h-5"
								/>
							</a>
						{/if}
					</div>
				</div>

				<!-- Tags -->
				{#if event.tags}
					<div class="mt-4 flex flex-wrap gap-2">
						{#each event.tags as tag}
							<span class="rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-700">
								#{tag}
							</span>
						{/each}
					</div>
				{/if}
			</div>
		{/each}
	</div>
</section>
