<script>
	export let data;
	const { event, content } = data;
	const zenodoDoi = event.zenodo ? String(event.zenodo).replace(/^https?:\/\/doi\.org\//, '') : '';
	const zenodoBadge = zenodoDoi ? `https://zenodo.org/badge/DOI/${zenodoDoi}.svg` : '';

	const formatDate = (isoString) => {
		if (!isoString) return 'No date provided';
		const date = new Date(isoString);
		if (isNaN(date)) return 'Invalid date';
		return new Intl.DateTimeFormat('en-GB', {
			month: 'long',
			year: 'numeric'
		}).format(date);
	};
</script>

<div class="mx-auto max-w-screen-xl px-6 py-12 md:px-8 md:py-16">
	<div class="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:items-start">
		<div class="space-y-2">
			<div class="space-y-2">
				<h1 class="text-4xl font-black tracking-tight text-zinc-900 md:text-5xl">
					{event.title}
				</h1>
				{#if event.subtitle}
					<p class="max-w-3xl text-lg font-semibold tracking-tight text-zinc-700 md:text-xl">
						{event.subtitle}
					</p>
				{/if}
				{#if event.description}
					<p class="max-w-3xl text-base leading-7 text-zinc-600 md:text-lg">
						{event.description}
					</p>
				{/if}
			</div>

			{#if event.date || event.speaker}
				<div class="event-meta-row">
					{#if event.date}
						<div class="inline-flex leading-none">
							<p class="hero-badge">{formatDate(event.date)}</p>
						</div>
					{/if}

					{#if event.speaker}
						<div class="event-meta-card event-meta-card--speaker">
							<div class="event-speaker">
								{#if event.speakerImage}
									<img
										src={event.speakerImage}
										alt={event.speaker}
										class="event-speaker__image"
									/>
								{/if}
								<div>
									<p class="event-meta-label">Speaker</p>
									<p class="event-meta-value">{event.speaker}</p>
								</div>
							</div>
						</div>
					{/if}
				</div>
			{/if}

			{#if content}
				<article class="prose prose-slate max-w-none pt-2">
					{@html content}
				</article>
			{:else}
				<p class="pt-2 text-sm text-zinc-600">Materials for this session will be added soon.</p>
			{/if}

			{#if event.zenodo || event.repo}
				<div class="resource-cards">
					{#if event.zenodo}
						<a
							href={event.zenodo}
							target="_blank"
							rel="noreferrer"
							class="resource-card resource-card--zenodo"
						>
							<h2 class="resource-card__title">Slides on Zenodo</h2>
							<span class="resource-card__chip">
								<img src={zenodoBadge} alt={`DOI ${zenodoDoi}`} class="resource-card__doi-badge" />
							</span>
						</a>
					{/if}

					{#if event.repo}
						<a
							href={event.repo}
							target="_blank"
							rel="noreferrer"
							class="resource-card resource-card--github"
						>
							<h2 class="resource-card__title">Exercises and materials</h2>
							<span class="resource-card__chip">View on GitHub</span>
						</a>
					{/if}
				</div>
			{/if}
		</div>

		<div class="space-y-5 lg:sticky lg:top-8">
			{#if event.poster}
				<div
					class="overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-white shadow-[0_28px_80px_-38px_rgba(24,24,27,0.24)]"
				>
					<img src={event.poster} alt="Event poster" class="h-auto w-full object-contain" />
				</div>
			{/if}
		</div>
	</div>

	{#if event.slides}
		<div class="mt-12">
			<h2 class="mb-4 text-2xl font-bold tracking-tight text-zinc-900">Slides</h2>
			<iframe
				src={event.slides}
				title="Slides"
				class="aspect-[16/10] min-h-[500px] w-full rounded-[1.75rem] border border-zinc-200 bg-white shadow-[0_20px_60px_-40px_rgba(24,24,27,0.35)]"
				loading="lazy"
				allowfullscreen
			></iframe>
		</div>
	{/if}
</div>

<style>
	.event-meta-row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.45rem;
	}

	.event-meta-card {
		display: inline-flex;
		align-items: center;
		border: 1px solid rgb(228 228 231);
		border-radius: 0.8rem;
		background: #fff1f1;
		padding: 0.35rem 0.55rem;
		line-height: 1.05;
	}

	.event-meta-card--speaker {
		padding-right: 0.7rem;
	}

	.event-meta-label {
		margin: 0;
		font-size: 0.62rem;
		font-weight: 700;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: #71717a;
	}

	.event-meta-value {
		margin: 0.18rem 0 0;
		font-size: 0.86rem;
		font-weight: 700;
		line-height: 1.15;
		color: #18181b;
	}

	.event-speaker {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
	}

	.event-speaker__image {
		height: 1.9rem;
		width: 1.9rem;
		flex: none;
		border-radius: 0.65rem;
		object-fit: cover;
	}

	.resource-cards {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 0.75rem;
	}

	.resource-card {
		display: grid;
		gap: 0.65rem;
		flex: 1 1 16rem;
		min-width: 15rem;
		border: 1px solid rgb(228 228 231);
		border-radius: 1.25rem;
		padding: 0.9rem 1rem 0.85rem;
		text-decoration: none;
		box-shadow: none;
		transition:
			border-color 180ms ease,
			transform 180ms ease,
			background-color 180ms ease;
	}

	.resource-card--zenodo {
		background: #fff1f1;
	}

	.resource-card--github {
		background: #fff1f1;
	}

	.resource-card:hover {
		transform: translateY(-1px);
		border-color: rgba(200, 25, 25, 0.22);
	}

	.resource-card--zenodo:hover {
		background: #ffe9e9;
	}

	.resource-card--github:hover {
		background: #ffe9e9;
	}

	.resource-card__title {
		margin: 0;
		font-size: 1rem;
		font-weight: 800;
		line-height: 1.2;
		letter-spacing: -0.02em;
		color: #18181b;
	}

	.resource-card__chip {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: fit-content;
		margin-top: 0.1rem;
		border-radius: 9999px;
		padding: 0;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: #18181b;
	}

	.resource-card__doi-badge {
		display: block;
		height: 1.25rem;
		width: auto;
	}
</style>
