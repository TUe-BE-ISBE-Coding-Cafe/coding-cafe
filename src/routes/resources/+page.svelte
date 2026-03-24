<script>
	import resourceRows from '$lib/data/resources.json';

	const allItems = resourceRows.flatMap((row) => row.items);

	const levelFilters = [...new Set(allItems.map((item) => item.level))];
	const formatFilters = [...new Set(allItems.map((item) => item.format))];

	let searchTerm = '';
	let activeLevel = 'All';
	let activeFormat = 'All';
	let filtersOpen = false;
	let filteredRows = resourceRows;
	let totalResources = allItems.length;

	function normalize(value) {
		return String(value).trim().toLowerCase();
	}

	function matchesResource(resource) {
		const query = normalize(searchTerm);
		const haystack = [
			resource.title,
			resource.description,
			resource.level,
			resource.format,
			resource.meta,
			resource.duration,
			...resource.tags
		]
			.join(' ')
			.toLowerCase();

		return (
			(!query || haystack.includes(query)) &&
			(activeLevel === 'All' || normalize(resource.level) === normalize(activeLevel)) &&
			(activeFormat === 'All' || normalize(resource.format) === normalize(activeFormat))
		);
	}

	function applyFilters() {
		filteredRows = resourceRows
			.map((row) => ({
				...row,
				items: row.items.filter(matchesResource)
			}))
			.filter((row) => row.items.length > 0);

		totalResources = filteredRows.reduce((count, row) => count + row.items.length, 0);
	}

	function setLevel(filter) {
		activeLevel = filter;
		applyFilters();
	}

	function setFormat(filter) {
		activeFormat = filter;
		applyFilters();
	}

	function handleSearchInput() {
		applyFilters();
	}

	applyFilters();
</script>

<svelte:head>
	<title>Resources | BE Coding Cafe</title>
</svelte:head>

<section class="resources-page">
	<div class="resources-shell">
		<section class="resources-hero">
			<div class="resources-hero__main">
				<div class="resources-hero__copy">
					<h1>
						<span class="resources-hero__line">Explore Resources for</span>
						<span>Better Research Software</span>
					</h1>
					<p class="resources-hero__body">
						This library brings together materials discussed in Coding Caf&#233; sessions, along
						with additional resources that are useful to the wider community.
					</p>
				</div>

				<section id="library" class="resources-toolbar">
					<div class="resources-toolbar__top">
						<label class="resources-search">
							<span>Search</span>
							<input
								type="search"
								bind:value={searchTerm}
								placeholder="Search by title, format, or keyword"
								on:input={handleSearchInput}
							/>
						</label>

						<div class="resources-summary">
							<span>{totalResources} resources</span>
							<span>{filteredRows.length} rows</span>
						</div>

						<button
							type="button"
							class="resources-filter-toggle"
							aria-expanded={filtersOpen}
							on:click={() => (filtersOpen = !filtersOpen)}
						>
							{filtersOpen ? 'Hide filters' : 'Show filters'}
						</button>
					</div>

					{#if filtersOpen}
						<div class="resources-filter-wrap">
							<div class="resources-filter-group">
								<p>Level</p>
								<div class="resources-chip-row">
									<button
										type="button"
										class:resources-chip--active={activeLevel === 'All'}
										class="resources-chip"
										on:click={() => setLevel('All')}
									>
										All
									</button>
									{#each levelFilters as filter}
										<button
											type="button"
											class:resources-chip--active={activeLevel === filter}
											class="resources-chip"
											on:click={() => setLevel(filter)}
										>
											{filter}
										</button>
									{/each}
								</div>
							</div>

							<div class="resources-filter-group">
								<p>Format</p>
								<div class="resources-chip-row">
									<button
										type="button"
										class:resources-chip--active={activeFormat === 'All'}
										class="resources-chip"
										on:click={() => setFormat('All')}
									>
										All
									</button>
									{#each formatFilters as filter}
										<button
											type="button"
											class:resources-chip--active={activeFormat === filter}
											class="resources-chip"
											on:click={() => setFormat(filter)}
										>
											{filter}
										</button>
									{/each}
								</div>
							</div>
						</div>
					{/if}
				</section>
			</div>
		</section>

		<section class="resources-library">
			{#if filteredRows.length}
				{#each filteredRows as row}
					<section class="resource-row" aria-labelledby={row.id}>
						<div class="resource-row__header">
							<h2 id={row.id}>{row.title}</h2>
							<a href="#library">{row.cta}</a>
						</div>

						<div class="resource-row__scroller" aria-label={row.title}>
							<div class="resource-row__track">
								{#each row.items as resource}
									<article class="resource-card resource-card--{resource.visual}">
										<div class="resource-card__tile">
											<div class="resource-card__media">
												<div class="resource-card__media-shine"></div>
												<div class="resource-card__media-meta">
													<span>{resource.format}</span>
													<span>{resource.duration}</span>
												</div>
											</div>
											<div class="resource-card__title">
												<h3>{resource.title}</h3>
											</div>
										</div>

										<div class="resource-card__preview">
											<div class="resource-card__preview-media">
												<div class="resource-card__media-shine"></div>
												<div class="resource-card__media-meta">
													<span>{resource.format}</span>
													<span>{resource.duration}</span>
												</div>
											</div>
											<div class="resource-card__overlay">
												<h3>{resource.title}</h3>
												<div class="resource-card__chips">
													<span class="resource-card__chip resource-card__chip--level">{resource.level}</span>
													<span class="resource-card__chip">{resource.meta}</span>
												</div>
												<p>{resource.description}</p>
												<a href="#library" class="resource-card__button">View Resource</a>
											</div>
										</div>
									</article>
								{/each}
							</div>
						</div>
					</section>
				{/each}
			{:else}
				<div class="resources-empty">
					<p class="resources-empty__eyebrow">No matches</p>
					<h2>No resources match the current filters.</h2>
					<p>Try clearing a filter or using a broader search term.</p>
				</div>
			{/if}
		</section>
	</div>
</section>

<style>
	:global(body) {
		background:
			radial-gradient(circle at top center, rgba(16, 34, 58, 0.08) 0%, transparent 28%),
			linear-gradient(180deg, #f4f6f8 0%, #f8fafc 42%, #f5f7fb 100%);
	}

	.resources-shell {
		width: min(100% - 2rem, 86rem);
		margin: 0 auto;
		padding: 1rem 0 4rem;
	}

	.resources-hero {
		position: relative;
		overflow: hidden;
		min-height: 15rem;
		padding: 1.35rem 0 1rem;
		background:
			radial-gradient(circle at 82% 24%, rgba(255, 255, 255, 0.78) 0%, transparent 15%),
			radial-gradient(circle at 72% 18%, rgba(255, 255, 255, 0.62) 0%, transparent 18%),
			linear-gradient(140deg, rgba(255, 255, 255, 0.7) 0%, rgba(242, 246, 250, 0.42) 48%, rgba(229, 236, 244, 0.38) 100%);
	}

	.resources-hero__main {
		position: relative;
		z-index: 1;
		display: grid;
		grid-template-columns: minmax(0, 1.3fr) minmax(19rem, 0.9fr);
		gap: 2rem;
		align-items: start;
	}

	.resources-hero__copy {
		max-width: 56rem;
	}

	.resources-hero::before {
		position: absolute;
		inset: -1rem -4rem auto auto;
		height: 18rem;
		width: 28rem;
		content: '';
		opacity: 0.18;
		background-image:
			radial-gradient(circle at 1px 1px, rgba(30, 41, 59, 0.35) 1px, transparent 0);
		background-size: 1.2rem 1.2rem;
		transform: perspective(800px) rotateY(-18deg);
		pointer-events: none;
	}

	h1 {
		margin: 0;
		max-width: 18ch;
		font-size: clamp(2.15rem, 4vw, 3.5rem);
		font-weight: 900;
		line-height: 0.98;
		letter-spacing: -0.05em;
		color: #111827;
	}

	h1 span {
		display: block;
		color: #e11d2e;
	}

	.resources-hero__line {
		color: #111827;
	}

	.resources-hero__body {
		margin: 0.9rem 0 0;
		max-width: 34rem;
		font-size: 0.98rem;
		line-height: 1.7;
		color: #475569;
	}

	.resources-toolbar {
		border: 1px solid rgba(226, 232, 240, 0.95);
		border-radius: 1.25rem;
		background: transparent;
		padding: 0.9rem 1rem;
	}

	.resources-toolbar__top {
		display: flex;
		flex-wrap: wrap;
		align-items: end;
		justify-content: space-between;
		gap: 0.9rem;
	}

	.resources-search {
		display: grid;
		flex: 1 1 22rem;
		gap: 0.4rem;
	}

	.resources-search span,
	.resources-filter-group p {
		margin: 0;
		font-size: 0.64rem;
		font-weight: 800;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: #64748b;
	}

	.resources-search input {
		border: 1px solid rgba(203, 213, 225, 0.95);
		border-radius: 0.85rem;
		background: white;
		padding: 0.72rem 0.9rem;
		font-size: 0.94rem;
		color: #0f172a;
		outline: none;
	}

	.resources-summary {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		font-size: 0.75rem;
		font-weight: 700;
		color: #64748b;
	}

	.resources-filter-toggle {
		border: 1px solid rgba(203, 213, 225, 0.95);
		border-radius: 9999px;
		background: white;
		padding: 0.45rem 0.8rem;
		font-size: 0.7rem;
		font-weight: 800;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: #475569;
		cursor: pointer;
	}

	.resources-filter-wrap {
		display: grid;
		gap: 0.7rem;
		margin-top: 0.85rem;
	}

	.resources-filter-group {
		display: grid;
		gap: 0.42rem;
	}

	.resources-chip-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
	}

	.resources-chip {
		border: 1px solid rgba(203, 213, 225, 0.95);
		border-radius: 9999px;
		background: white;
		padding: 0.34rem 0.68rem;
		font-size: 0.7rem;
		font-weight: 700;
		color: #475569;
		cursor: pointer;
		transition:
			background-color 180ms ease,
			border-color 180ms ease,
			color 180ms ease;
	}

	.resources-chip--active {
		border-color: #e11d2e;
		background: #e11d2e;
		color: white;
	}

	.resources-library {
		display: grid;
		gap: 1.15rem;
		margin-top: 1rem;
		position: relative;
		overflow: visible;
	}

	.resource-row {
		display: grid;
		gap: 0.55rem;
		position: relative;
		overflow: visible;
		isolation: isolate;
		z-index: 0;
	}

	.resource-row:hover,
	.resource-row:focus-within {
		z-index: 10;
	}

	.resource-row__header {
		display: flex;
		align-items: end;
		justify-content: space-between;
		gap: 1rem;
	}

	.resource-row__header h2 {
		margin: 0;
		font-size: clamp(1.2rem, 2vw, 1.7rem);
		font-weight: 800;
		letter-spacing: -0.03em;
		color: #111827;
	}

	.resource-row__header a {
		font-size: 0.7rem;
		font-weight: 800;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		text-decoration: none;
		color: #e11d2e;
	}

	.resource-row__scroller {
		position: relative;
		overflow-x: auto;
		overflow-y: visible;
		padding: 0.75rem 1.25rem 2.25rem;
		scrollbar-width: thin;
		scrollbar-color: rgba(148, 163, 184, 0.5) transparent;
		z-index: 1;
	}

	.resource-row__track {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: minmax(16rem, 17.5rem);
		gap: 0.9rem;
		position: relative;
		overflow-y: visible;
		scroll-snap-type: x proximity;
		width: max-content;
		min-width: 100%;
	}

	.resource-card {
		position: relative;
		scroll-snap-align: start;
		overflow: visible;
		width: 100%;
		aspect-ratio: 1.65 / 1;
		z-index: 0;
	}

	.resource-card:hover,
	.resource-card:focus-within {
		z-index: 20;
	}

	.resource-card__tile,
	.resource-card__preview {
		border: 1px solid rgba(31, 41, 55, 0.14);
		border-radius: 1.1rem;
		background: #0f172a;
		box-shadow: 0 18px 32px -28px rgba(15, 23, 42, 0.45);
	}

	.resource-card__tile {
		position: relative;
		overflow: hidden;
		height: 100%;
	}

	.resource-card__media,
	.resource-card__preview-media {
		position: relative;
		height: 100%;
		overflow: hidden;
		background-color: #0f172a;
	}

	.resource-card__media::before,
	.resource-card__media::after,
	.resource-card__preview-media::before,
	.resource-card__preview-media::after {
		position: absolute;
		inset: 0;
		content: '';
	}

	.resource-card--aurora .resource-card__media,
	.resource-card--aurora .resource-card__preview-media {
		background:
			radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.18) 0%, transparent 24%),
			radial-gradient(circle at 78% 25%, rgba(244, 114, 182, 0.2) 0%, transparent 18%),
			linear-gradient(145deg, #0f172a 0%, #111827 42%, #1d4ed8 100%);
	}

	.resource-card--terminal .resource-card__media,
	.resource-card--terminal .resource-card__preview-media {
		background:
			linear-gradient(180deg, rgba(15, 23, 42, 0.88), rgba(15, 23, 42, 0.5)),
			linear-gradient(135deg, #111827 0%, #1f2937 100%);
	}

	.resource-card--terminal .resource-card__media::before,
	.resource-card--terminal .resource-card__preview-media::before {
		inset: 1rem 1rem auto;
		height: 0.55rem;
		border-radius: 999px;
		background: linear-gradient(90deg, #ef4444 0 0.55rem, #f59e0b 0.55rem 1.1rem, #10b981 1.1rem 1.65rem, transparent 1.65rem);
	}

	.resource-card--terminal .resource-card__media::after,
	.resource-card--terminal .resource-card__preview-media::after {
		inset: 2.1rem 1rem 1rem;
		opacity: 0.84;
		background:
			repeating-linear-gradient(180deg, rgba(16, 185, 129, 0.95) 0 0.16rem, transparent 0.16rem 0.92rem),
			repeating-linear-gradient(90deg, rgba(148, 163, 184, 0.26) 0 1rem, transparent 1rem 1.45rem);
		mix-blend-mode: screen;
	}

	.resource-card--mesh .resource-card__media,
	.resource-card--mesh .resource-card__preview-media {
		background:
			radial-gradient(circle at 30% 30%, rgba(56, 189, 248, 0.38) 0%, transparent 20%),
			linear-gradient(155deg, #08111f 0%, #0f172a 55%, #1e293b 100%);
	}

	.resource-card--mesh .resource-card__media::before,
	.resource-card--mesh .resource-card__preview-media::before {
		background: repeating-radial-gradient(circle at center, rgba(34, 211, 238, 0.34) 0 1px, transparent 1px 0.95rem);
		opacity: 0.45;
		transform: scaleY(0.8);
	}

	.resource-card--panel .resource-card__media,
	.resource-card--panel .resource-card__preview-media {
		background: linear-gradient(160deg, #111827 0%, #1f2937 100%);
	}

	.resource-card--panel .resource-card__media::before,
	.resource-card--panel .resource-card__preview-media::before {
		inset: 0.95rem;
		border-radius: 0.8rem;
		background:
			repeating-linear-gradient(90deg, rgba(59, 130, 246, 0.22) 0 1px, transparent 1px 3rem),
			repeating-linear-gradient(180deg, rgba(248, 250, 252, 0.08) 0 1px, transparent 1px 2.4rem),
			linear-gradient(180deg, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.3));
		border: 1px solid rgba(255, 255, 255, 0.06);
	}

	.resource-card--orbit .resource-card__media,
	.resource-card--orbit .resource-card__preview-media {
		background:
			radial-gradient(circle at center, rgba(96, 165, 250, 0.2) 0%, transparent 26%),
			linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);
	}

	.resource-card--orbit .resource-card__media::before,
	.resource-card--orbit .resource-card__preview-media::before {
		inset: 1rem;
		border-radius: 9999px;
		border: 1px solid rgba(191, 219, 254, 0.5);
		box-shadow:
			0 0 0 1rem rgba(147, 197, 253, 0.08),
			0 0 0 2rem rgba(147, 197, 253, 0.06);
	}

	.resource-card--shield .resource-card__media,
	.resource-card--shield .resource-card__preview-media {
		background:
			radial-gradient(circle at center, rgba(56, 189, 248, 0.2) 0%, transparent 18%),
			linear-gradient(135deg, #0b1220 0%, #1e293b 100%);
	}

	.resource-card--shield .resource-card__media::before,
	.resource-card--shield .resource-card__preview-media::before {
		inset: 1.55rem auto auto 50%;
		width: 4.1rem;
		height: 4.8rem;
		background: linear-gradient(180deg, rgba(125, 211, 252, 0.9), rgba(29, 78, 216, 0.82));
		clip-path: polygon(50% 0%, 92% 18%, 92% 56%, 50% 100%, 8% 56%, 8% 18%);
		transform: translateX(-50%);
		box-shadow: 0 0 24px rgba(96, 165, 250, 0.3);
	}

	.resource-card--spotlight .resource-card__media,
	.resource-card--spotlight .resource-card__preview-media {
		background:
			radial-gradient(circle at 28% 24%, rgba(255, 255, 255, 0.35) 0%, transparent 16%),
			linear-gradient(135deg, #fff1f2 0%, #f8fafc 32%, #fee2e2 100%);
	}

	.resource-card--spotlight .resource-card__media::before,
	.resource-card--spotlight .resource-card__preview-media::before {
		inset: 1rem auto auto 1rem;
		width: 2.7rem;
		height: 2.7rem;
		border-radius: 0.85rem;
		background: linear-gradient(135deg, rgba(225, 29, 46, 0.12), rgba(225, 29, 46, 0.22));
	}

	.resource-card--spotlight .resource-card__media::after,
	.resource-card--spotlight .resource-card__preview-media::after {
		inset: 1.65rem auto auto 1.65rem;
		width: 1.3rem;
		height: 1.3rem;
		border-radius: 9999px;
		background: #e11d2e;
	}

	.resource-card--grid .resource-card__media,
	.resource-card--grid .resource-card__preview-media {
		background:
			linear-gradient(180deg, rgba(15, 23, 42, 0.32), rgba(15, 23, 42, 0.05)),
			linear-gradient(135deg, #0f172a 0%, #334155 100%);
	}

	.resource-card--grid .resource-card__media::before,
	.resource-card--grid .resource-card__preview-media::before {
		background:
			repeating-linear-gradient(90deg, rgba(226, 232, 240, 0.18) 0 1px, transparent 1px 2.2rem),
			repeating-linear-gradient(180deg, rgba(226, 232, 240, 0.12) 0 1px, transparent 1px 2.2rem);
	}

	.resource-card__media-shine {
		position: absolute;
		inset: 0;
		background: linear-gradient(120deg, transparent 0%, rgba(255, 255, 255, 0.16) 50%, transparent 100%);
		transform: translateX(-100%);
		transition: transform 420ms ease;
	}

	.resource-card:hover .resource-card__media-shine,
	.resource-card:focus-within .resource-card__media-shine {
		transform: translateX(100%);
	}

	.resource-card__media-meta {
		position: absolute;
		left: 0.8rem;
		right: 0.8rem;
		top: 0.8rem;
		display: flex;
		justify-content: space-between;
		gap: 0.75rem;
		font-size: 0.62rem;
		font-weight: 800;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.92);
		opacity: 0;
		transition: opacity 180ms ease;
	}

	.resource-card__title {
		position: absolute;
		inset: auto 0 0;
		padding: 3.3rem 0.95rem 0.95rem;
		background: linear-gradient(180deg, rgba(15, 23, 42, 0) 0%, rgba(15, 23, 42, 0.86) 58%, rgba(15, 23, 42, 0.98) 100%);
		transition: opacity 160ms ease;
	}

	.resource-card__preview {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		height: 21.5rem;
		overflow: hidden;
		opacity: 0;
		transform: translateY(0.45rem);
		transition:
			opacity 180ms ease,
			transform 220ms cubic-bezier(0.22, 1, 0.36, 1),
			box-shadow 220ms ease,
			border-color 220ms ease;
		pointer-events: none;
		border-color: rgba(225, 29, 46, 0.24);
		box-shadow: 0 42px 90px -34px rgba(15, 23, 42, 0.72);
		z-index: 60;
	}

	.resource-card__preview-media {
		height: 10.25rem;
	}

	.resource-card__preview .resource-card__media-meta {
		opacity: 1;
	}

	.resource-card__chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}

	.resource-card__chip {
		border-radius: 999px;
		padding: 0.26rem 0.5rem;
		font-size: 0.64rem;
		font-weight: 700;
	}

	.resource-card__chip--level {
		background: #fff1f2;
		color: #c81919;
	}

	.resource-card__chip:not(.resource-card__chip--level) {
		background: rgba(226, 232, 240, 0.14);
		color: rgba(226, 232, 240, 0.94);
	}

	.resource-card h3 {
		margin: 0;
		font-size: 0.96rem;
		font-weight: 800;
		letter-spacing: -0.03em;
		line-height: 1.25;
		color: white;
	}

	.resource-card__overlay {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0.62rem;
		padding: 0.95rem 0.95rem 1rem;
		background: linear-gradient(180deg, rgba(15, 23, 42, 0.96) 0%, rgba(15, 23, 42, 0.99) 100%);
	}

	.resource-card:hover .resource-card__preview,
	.resource-card:focus-within .resource-card__preview {
		opacity: 1;
		transform: translateY(0);
		pointer-events: auto;
	}

	.resource-card:hover .resource-card__title,
	.resource-card:focus-within .resource-card__title {
		opacity: 0;
	}

	.resource-card__overlay p {
		margin: 0;
		font-size: 0.78rem;
		line-height: 1.5;
		color: rgba(226, 232, 240, 0.92);
	}

	.resource-card__button {
		display: inline-flex;
		width: fit-content;
		align-items: center;
		justify-content: center;
		border-radius: 0.8rem;
		background: #e11d2e;
		padding: 0.62rem 0.82rem;
		font-size: 0.66rem;
		font-weight: 800;
		letter-spacing: 0.13em;
		text-transform: uppercase;
		text-decoration: none;
		color: white;
	}

	.resources-empty {
		border: 1px dashed #cbd5e1;
		border-radius: 1.4rem;
		padding: 2.5rem 1.5rem;
		background: rgba(255, 255, 255, 0.78);
		text-align: center;
	}

	.resources-empty__eyebrow {
		margin: 0 0 0.6rem;
		font-size: 0.68rem;
		font-weight: 800;
		letter-spacing: 0.24em;
		text-transform: uppercase;
		color: #e11d2e;
	}

	.resources-empty h2 {
		margin: 0;
		font-size: 1.6rem;
		font-weight: 800;
		letter-spacing: -0.03em;
		color: #111827;
	}

	.resources-empty p {
		margin: 0.8rem auto 0;
		max-width: 32rem;
		line-height: 1.7;
		color: #475569;
	}

	@media (max-width: 900px) {
		.resources-hero__main {
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		.resource-row__track {
			grid-auto-columns: minmax(14rem, 15.5rem);
		}
	}

	@media (max-width: 640px) {
		.resources-shell {
			width: min(100% - 1rem, 86rem);
			padding-top: 0.8rem;
		}

		.resources-hero {
			min-height: auto;
			padding-top: 0.8rem;
		}

		.resources-toolbar {
			padding: 0.85rem;
		}

		.resource-row__header {
			align-items: start;
			flex-direction: column;
		}

		.resource-row__scroller {
			padding: 0.2rem 0.1rem 0.9rem;
		}

		.resource-row__track {
			grid-auto-columns: 84%;
		}

		.resource-card:hover,
		.resource-card:focus-within {
			z-index: 0;
		}

		.resource-card__preview {
			position: static;
			min-height: auto;
			height: auto;
			opacity: 1;
			transform: none;
			pointer-events: auto;
			margin-top: 0.7rem;
			border-color: rgba(31, 41, 55, 0.14);
			box-shadow: 0 18px 32px -28px rgba(15, 23, 42, 0.45);
		}

		.resource-card__overlay {
			padding: 0.85rem 0.95rem 0.95rem;
			background: #0f172a;
		}

		.resource-card__title {
			position: static;
			padding: 0.85rem 0.95rem 0;
			background: #0f172a;
		}

		.resource-card__preview-media {
			height: 8.8rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		:global(html) {
			scroll-behavior: auto;
		}

		.resource-card,
		.resource-card__media-shine,
		.resource-card__overlay,
		.resources-chip {
			transition: none;
		}
	}
</style>
