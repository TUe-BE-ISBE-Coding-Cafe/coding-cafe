<script>
	export let data;
	const { content, metadata } = data;

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
			<h1 class="text-3xl font-bold">{metadata.title}</h1>
			<p class="text-sm text-gray-600">📅 {formatDate(metadata.date)}</p>

			<article class="prose prose-slate max-w-none pt-4">
				<svelte:component this={content} />
			</article>
		</div>

		<!-- Right: Poster image -->
		{#if metadata.poster}
			<div class="w-full md:w-[440px]">
				<img
					src={metadata.poster}
					alt="Event poster"
					class="h-auto w-full rounded object-contain shadow-md"
				/>
			</div>
		{/if}
	</div>

	{#if metadata.slides}
		<!-- Embedded PDF -->
		<div class="mt-10">
			<h2 class="mb-2 text-xl font-semibold">Slides</h2>
			<iframe
				src={metadata.slides}
				title="Slides"
				class="aspect-[4/3] w-full rounded border shadow"
				style="min-height: 500px;"
			></iframe>
		</div>
	{/if}
</div>
