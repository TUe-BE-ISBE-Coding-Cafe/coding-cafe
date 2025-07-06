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

<h1>{metadata.title}</h1>
<p>📅 {formatDate(metadata.date)}</p>

<article class="prose">
	<svelte:component this={content} />
</article>
