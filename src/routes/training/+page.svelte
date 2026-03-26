<script>
	import trainings from '$lib/data/trainings.json';

	const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

	let searchTerm = '';
	let selectedLevel = 'All';

	function dateKeyFromDate(date) {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	}

	const todayKey = dateKeyFromDate(new Date());

	function isArchivedTraining(training) {
		if (training.sessions.length === 0) return false;

		const latestSessionDate = training.sessions
			.map((session) => session.date.slice(0, 10))
			.sort()
			.at(-1);

		return latestSessionDate !== undefined && latestSessionDate < todayKey;
	}

	function matchesFilters(training) {
		const term = searchTerm.trim().toLowerCase();
		const matchesSearch =
			!term ||
			training.title.toLowerCase().includes(term) ||
			training.description.toLowerCase().includes(term) ||
			training.tags.some((tag) => tag.toLowerCase().includes(term));
		const matchesLevel = selectedLevel === 'All' || training.level === selectedLevel;

		return matchesSearch && matchesLevel;
	}

	function formatSessionDates(dates) {
		if (dates.length === 0) return 'TBD';

		return dates
			.map((date) =>
				new Date(`${date}T12:00:00`).toLocaleDateString('en-GB', {
					day: '2-digit',
					month: 'short',
					year: 'numeric'
				})
			)
			.join(', ');
	}

	function badgeClass(level) {
		if (level === 'Beginner') return 'training-badge training-badge--beginner';
		if (level === 'Intermediate') return 'training-badge training-badge--intermediate';
		return 'training-badge training-badge--advanced';
	}

	$: currentTrainings = trainings.filter(
		(training) => !isArchivedTraining(training) && matchesFilters(training)
	);
	$: archivedTrainings = trainings.filter(
		(training) => isArchivedTraining(training) && matchesFilters(training)
	);
</script>

<svelte:head>
	<title>Training | BE Coding Cafe</title>
</svelte:head>

<section class="training-page">
	<div class="training-shell">
		<section class="training-hero">
			<div class="training-hero__copy">
				<p class="training-hero__eyebrow">Trainings</p>
				<h1>Upcoming Events and Trainings</h1>
				<p>
					Check this page for internal and external training opportunities, from foundational
					scripting to more advanced reproducible workflows.
				</p>
			</div>

			<div class="training-links">
				<p>Looking for more training opportunities?</p>
				<div class="training-links__grid">
					<a href="https://taxila.nl/events?per_page=50#home" target="_blank" rel="noreferrer">
						<strong>Taxila</strong>
						<span>Taxila is a repository of training opportunities from across the Netherlands.</span>
						<span>Click to go to Taxila and see what is happening in NL.</span>
					</a>
				</div>
			</div>
		</section>

		<section class="training-layout">
			<aside class="training-sidebar">
				<div class="training-filter-card">
					<label class="training-label" for="training-search">Search</label>
					<input
						id="training-search"
						type="text"
						placeholder="Python, Git, Linux..."
						bind:value={searchTerm}
					/>
				</div>

				<div class="training-filter-card">
					<p class="training-label">Level</p>
					<div class="training-levels">
						{#each levels as level}
							<button
								type="button"
								class:training-levels__button--active={selectedLevel === level}
								class="training-levels__button"
								on:click={() => (selectedLevel = level)}
							>
								{level}
							</button>
						{/each}
					</div>
				</div>
			</aside>

			<section class="training-results">
				<p class="training-count">
					Showing {currentTrainings.length} current course{currentTrainings.length === 1 ? '' : 's'}
				</p>

				{#if currentTrainings.length > 0}
					<div class="training-grid">
						{#each currentTrainings as training (training.id)}
							<article class="training-card" id={training.id}>
								<div class="training-card__top"></div>
								<div class="training-card__content">
									<h2>{training.title}</h2>
									<p class="training-dates">
										<strong>Dates:</strong>
										{formatSessionDates(training.sessions.map((session) => session.date))}
									</p>

									<div class="training-meta">
										<span class={badgeClass(training.level)}>{training.level}</span>
										<span class="training-meta__dot">•</span>
										<span>{training.duration}</span>
									</div>

									<p class="training-organizer">
										<strong>Organizer:</strong>
										{training.organizer}
									</p>

									<p class="training-description">{training.description}</p>

									<div class="training-spacer"></div>

									{#if training.registrationLink}
										<a
											class="training-button"
											href={training.registrationLink}
											target="_blank"
											rel="noreferrer"
										>
											More info and registration
										</a>
									{:else}
										<p class="training-unavailable">Registration details are not available yet.</p>
									{/if}

									<p class="training-audience">
										<strong>Target audience:</strong>
										{training.audience.join(', ')}
									</p>

									<div class="training-details">
										<div><strong>Format:</strong> {training.format}</div>
										{#if training.materialsLink}
											<div>
												<a href={training.materialsLink} target="_blank" rel="noreferrer">
													Course materials
												</a>
											</div>
										{/if}
									</div>
								</div>
								<div class="training-card__footer">
									<div class="training-tags">
										{#each training.tags.slice(0, 3) as tag}
											<span>{tag}</span>
										{/each}
									</div>
								</div>
							</article>
						{/each}
					</div>
				{:else}
					<div class="training-empty">
						<h2>No courses found</h2>
						<p>Try adjusting your search or selected level.</p>
					</div>
				{/if}

				{#if archivedTrainings.length > 0}
					<section class="training-archive">
						<h2>
							Archive ({archivedTrainings.length} training{archivedTrainings.length === 1 ? '' : 's'})
						</h2>
						<div class="training-archive__grid">
							{#each archivedTrainings as training (training.id)}
								<article class="training-archive__card">
									<h3>{training.title}</h3>
									<p>
										<strong>Dates:</strong>
										{formatSessionDates(training.sessions.map((session) => session.date))}
									</p>
									<p><strong>Organizer:</strong> {training.organizer}</p>
									{#if training.materialsLink}
										<a href={training.materialsLink} target="_blank" rel="noreferrer">
											Course materials
										</a>
									{/if}
								</article>
							{/each}
						</div>
					</section>
				{/if}
			</section>
		</section>
	</div>
</section>

<style>
	:global(body) {
		background: linear-gradient(180deg, #fff8f4 0%, #ffffff 45%, #fff2f2 100%);
	}

	.training-shell {
		width: min(100% - 2rem, 84rem);
		margin: 0 auto;
		padding: 1.5rem 0 4rem;
	}

	.training-hero {
		display: grid;
		gap: 1.25rem;
		padding: 1.2rem 0 2rem;
		border-bottom: 1px solid #e4e4e7;
	}

	.training-hero__eyebrow {
		margin: 0 0 0.7rem;
		font-size: 0.72rem;
		font-weight: 800;
		letter-spacing: 0.28em;
		text-transform: uppercase;
		color: #c81919;
	}

	.training-hero h1 {
		margin: 0;
		max-width: 14ch;
		font-size: clamp(2.4rem, 5vw, 4.4rem);
		font-weight: 900;
		line-height: 0.98;
		letter-spacing: -0.05em;
		color: #18181b;
	}

	.training-hero__copy p:last-child {
		margin: 1rem 0 0;
		max-width: 44rem;
		font-size: 1.02rem;
		line-height: 1.75;
		color: #52525b;
	}

	.training-links {
		display: grid;
		gap: 0.75rem;
	}

	.training-links p {
		margin: 0;
		font-size: 0.92rem;
		font-weight: 700;
		color: #3f3f46;
	}

	.training-links__grid {
		display: flex;
		flex-wrap: wrap;
		gap: 0.85rem;
	}

	.training-links__grid a {
		display: grid;
		gap: 0.45rem;
		min-width: 18rem;
		padding: 1.05rem 1.1rem;
		border: 1px solid rgba(200, 25, 25, 0.18);
		border-radius: 1rem;
		background: linear-gradient(180deg, #ffffff 0%, #fff8f6 100%);
		text-decoration: none;
		box-shadow: 0 18px 42px -36px rgba(24, 24, 27, 0.25);
		transition:
			transform 180ms ease,
			border-color 180ms ease,
			box-shadow 180ms ease,
			background-color 180ms ease;
	}

	.training-links__grid a:hover {
		transform: translateY(-2px);
		border-color: rgba(200, 25, 25, 0.34);
		box-shadow: 0 22px 46px -34px rgba(200, 25, 25, 0.22);
	}

	.training-links__grid strong {
		font-size: 1rem;
		color: #18181b;
	}

	.training-links__grid span {
		font-size: 0.86rem;
		line-height: 1.55;
		color: #52525b;
	}

	.training-layout {
		display: grid;
		gap: 1.5rem;
		padding-top: 1.75rem;
	}

	.training-sidebar {
		display: grid;
		gap: 1rem;
	}

	.training-filter-card {
		border: 1px solid rgba(228, 228, 231, 0.92);
		border-radius: 1.4rem;
		background: rgba(255, 255, 255, 0.88);
		padding: 1rem;
	}

	.training-label {
		display: block;
		margin: 0 0 0.45rem;
		font-size: 0.74rem;
		font-weight: 800;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: #71717a;
	}

	.training-filter-card input {
		width: 100%;
		border: 1px solid #d4d4d8;
		border-radius: 0.85rem;
		background: white;
		padding: 0.72rem 0.85rem;
		font-size: 0.95rem;
		color: #18181b;
		outline: none;
	}

	.training-levels {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.training-levels__button {
		border: 1px solid #d4d4d8;
		border-radius: 9999px;
		background: white;
		padding: 0.45rem 0.85rem;
		font-size: 0.76rem;
		font-weight: 700;
		color: #52525b;
		cursor: pointer;
	}

	.training-levels__button--active {
		border-color: #c81919;
		background: #c81919;
		color: white;
	}

	.training-count {
		margin: 0 0 1rem;
		font-size: 0.84rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: #71717a;
	}

	.training-grid {
		display: grid;
		gap: 1rem;
	}

	.training-card {
		overflow: hidden;
		border: 1px solid rgba(228, 228, 231, 0.92);
		border-radius: 1.7rem;
		background: rgba(255, 255, 255, 0.94);
		box-shadow: 0 24px 60px -44px rgba(24, 24, 27, 0.28);
	}

	.training-card__top {
		height: 0.4rem;
		background: linear-gradient(90deg, #c81919 0%, #ef4444 100%);
	}

	.training-card__content {
		display: flex;
		flex-direction: column;
		padding: 1.35rem;
	}

	.training-card h2 {
		margin: 0;
		font-size: 1.35rem;
		font-weight: 800;
		letter-spacing: -0.03em;
		color: #18181b;
	}

	.training-dates,
	.training-organizer,
	.training-description,
	.training-audience,
	.training-details,
	.training-archive__card p {
		margin: 0.8rem 0 0;
		font-size: 0.95rem;
		line-height: 1.7;
		color: #52525b;
	}

	.training-meta {
		display: flex;
		align-items: center;
		gap: 0.55rem;
		margin-top: 0.9rem;
		font-size: 0.82rem;
		font-weight: 700;
		color: #71717a;
	}

	.training-meta__dot {
		color: #a1a1aa;
	}

	.training-badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 9999px;
		padding: 0.3rem 0.65rem;
		font-size: 0.68rem;
		font-weight: 800;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.training-badge--beginner {
		background: #ecfdf5;
		color: #15803d;
	}

	.training-badge--intermediate {
		background: #eff6ff;
		color: #1d4ed8;
	}

	.training-badge--advanced {
		background: #fff1f2;
		color: #c81919;
	}

	.training-spacer {
		height: 1rem;
	}

	.training-button {
		display: inline-flex;
		width: fit-content;
		align-items: center;
		justify-content: center;
		border-radius: 0.95rem;
		background: #c81919;
		padding: 0.85rem 1.1rem;
		font-size: 0.74rem;
		font-weight: 800;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		text-decoration: none;
		color: white;
	}

	.training-unavailable {
		margin: 0;
		font-size: 0.88rem;
		font-weight: 700;
		color: #71717a;
	}

	.training-details {
		display: flex;
		flex-wrap: wrap;
		gap: 0.8rem 1.25rem;
	}

	.training-details a,
	.training-archive__card a {
		color: #c81919;
		text-decoration: none;
		font-weight: 700;
	}

	.training-card__footer {
		padding: 0 1.35rem 1.2rem;
	}

	.training-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
	}

	.training-tags span {
		border-radius: 9999px;
		background: #fff1f2;
		padding: 0.35rem 0.65rem;
		font-size: 0.68rem;
		font-weight: 800;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #c81919;
	}

	.training-empty {
		border: 1px dashed #d4d4d8;
		border-radius: 1.4rem;
		padding: 2rem 1.25rem;
		text-align: center;
		background: rgba(255, 255, 255, 0.86);
	}

	.training-empty h2,
	.training-archive h2,
	.training-archive__card h3 {
		margin: 0;
		color: #18181b;
		letter-spacing: -0.03em;
	}

	.training-empty p {
		margin: 0.7rem 0 0;
		color: #52525b;
	}

	.training-archive {
		margin-top: 2rem;
		padding-top: 1.5rem;
		border-top: 1px solid #e4e4e7;
	}

	.training-archive h2 {
		font-size: 1.4rem;
		font-weight: 800;
	}

	.training-archive__grid {
		display: grid;
		gap: 1rem;
		margin-top: 1rem;
	}

	.training-archive__card {
		border: 1px solid rgba(228, 228, 231, 0.9);
		border-radius: 1.3rem;
		background: rgba(255, 255, 255, 0.84);
		padding: 1.1rem;
	}

	@media (min-width: 960px) {
		.training-hero {
			grid-template-columns: minmax(0, 1.35fr) minmax(18rem, 0.8fr);
			align-items: end;
			column-gap: 2rem;
		}

		.training-layout {
			grid-template-columns: 18rem minmax(0, 1fr);
			align-items: start;
		}

		.training-sidebar {
			position: sticky;
			top: 1rem;
		}

		.training-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.training-archive__grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
</style>
