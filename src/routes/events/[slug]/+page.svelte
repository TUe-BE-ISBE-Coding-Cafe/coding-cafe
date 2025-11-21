<script>
	export let data;
	const { event, content } = data;

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

<!-- Container for spacing -->
<div class="mx-auto max-w-screen-xl px-8 py-16">
	<div class="flex flex-col-reverse gap-6 md:flex-row">
		<!-- Left: Text content -->
		<div class="flex-1 space-y-4">
			<h1 class="text-3xl font-bold">{event.title}</h1>
			<div class="flex flex-wrap gap-4 text-sm text-gray-600">
				{#if event.date}
					<p>📅 {formatDate(event.date)}</p>
				{/if}
				{#if event.time}
					<p>🕒 {event.time}</p>
				{/if}
				{#if event.location}
					<p>📍 {event.location}</p>
				{/if}
			</div>

			{#if event.speaker}
				<p class="text-sm text-gray-600">
					👤
					{#if event.speaker_link}
						<a class="text-blue-600 underline hover:text-blue-800" href={event.speaker_link} target="_blank"
							rel="noreferrer"
							>{event.speaker}</a
						>
					{:else}
						{event.speaker}
					{/if}
				</p>
			{/if}

			{#if content}
				<article class="prose prose-slate max-w-none pt-4">
					{@html content}
				</article>
			{:else}
				<p class="pt-4 text-sm text-gray-600">Materials for this session will be added soon.</p>
			{/if}
		</div>

		<!-- Right: Poster image -->
		{#if event.poster}
			<div class="w-full md:w-[440px]">
				<img
					src={event.poster}
					alt="Event poster"
					class="h-auto w-full rounded object-contain shadow-md"
				/>
			</div>
		{/if}
	</div>

	{#if event.slides}
		<!-- Embedded PDF -->
		<div class="mt-10">
			<h2 class="mb-2 text-xl font-semibold">Slides</h2>
			<iframe
				src={event.slides}
				title="Slides"
				class="aspect-[4/3] w-full rounded border shadow"
				style="min-height: 500px;"
			></iframe>
		</div>
	{/if}

		{#if event.repo}
			<div class="mt-10">
				<h2 class="mb-2 text-xl font-semibold">Exercises & materials</h2>
				<a
					class="inline-block rounded bg-[#C81919] px-4 py-2 text-white shadow hover:bg-[#a60d25]"
					href={event.repo}
					target="_blank"
					rel="noreferrer"
				>
					View on GitHub
				</a>
			</div>
		{/if}
	</div>
