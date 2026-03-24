<script>
	import { onMount } from 'svelte';
	import events from '$lib/data/events.json';
	import { formatEventTime, groupEvents } from '$lib/utils/events.js';

	const teamsUrl =
		'https://teams.microsoft.com/l/team/19%3ATfehyuNclRvZxP_XBBLUaPcVK0L_aHdbfs7NNHqcsqQ1%40thread.tacv2/conversations?groupId=81d0985d-b794-4f0e-8003-f7265709d8ab&tenantId=cc7df247-60ce-4a0f-9d75-704cf60efc64';
	const githubUrl = 'https://github.com/ISBE-TUe/coding-cafe';

	const sessionParts = [
		{
			label: 'PART 1 · 30 - 45 MIN',
			title: 'Short introduction',
			body: 'A 30-minute talk introducing a tool, concept, or workflow relevant to research coding.'
		},
		{
			label: 'PART 2 · 60 - 45 MIN',
			title: 'Coding session',
			body: 'Work on your own code, try things out, or help others with their problems.'
		}
	];

	const checkItems = [
		"You don't need to be an expert",
		'You can bring your own problem',
		'You can just come and observe',
		'You can leave anytime'
	];

	const communityPoints = ['Learn from others', 'Share your work', 'Ask questions freely'];

	const screens = [
		{ id: 'identity', label: 'Identity' },
		{ id: 'structure', label: 'How it works' },
		{ id: 'not-a-course', label: "Let's be clear" },
		{ id: 'events', label: 'Upcoming' },
		{ id: 'community', label: 'Community' }
	];

	const { upcoming } = groupEvents(events);
	const nextEvent = upcoming[0] ?? null;
	const nextEventTime = nextEvent ? formatEventTime(nextEvent) : '';

	function formatMonthYear(dateString) {
		return new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' }).format(
			new Date(dateString)
		);
	}

	function formatDay(dateString) {
		return new Intl.DateTimeFormat('en', { day: 'numeric' }).format(new Date(dateString));
	}

	function formatMonth(dateString) {
		return new Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(dateString));
	}

	let activeScreen = 0;
	let identityEl;
	let structureEl;
	let clarityEl;
	let eventsEl;
	let communityEl;

	function scrollToScreen(index) {
		const screenEls = [identityEl, structureEl, clarityEl, eventsEl, communityEl];
		screenEls[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	onMount(() => {
		const screenEls = [identityEl, structureEl, clarityEl, eventsEl, communityEl];

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					const index = Number(entry.target.getAttribute('data-screen-index'));
					if (!Number.isNaN(index)) activeScreen = index;
				}
			},
			{
				threshold: 0.6
			}
		);

		for (const section of screenEls) {
			if (section) observer.observe(section);
		}

		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<title>BE Coding Cafe</title>
</svelte:head>

<div class="hero-shell">
	<div class="hero-viewport">
		<div class="hero-progress">
			<div class="hero-progress__rail">
				{#each screens as screen, index}
					<button
						type="button"
						class:hero-progress__dot--active={index === activeScreen}
						class="hero-progress__dot"
						aria-label={`Go to ${screen.label}`}
						on:click={() => scrollToScreen(index)}
					></button>
				{/each}
			</div>
			<p class="hero-progress__count">{String(activeScreen + 1).padStart(2, '0')} / 05</p>
		</div>

		<div class="hero-scroll">
			<section
				bind:this={identityEl}
				data-screen-index="0"
				id="identity"
				class="hero-screen hero-screen--identity"
			>
				<div class:hero-content--active={activeScreen === 0} class="hero-content">
					<div class="hero-copy">
						<p class="hero-eyebrow">BE Coding Cafe</p>
						<h1 class="hero-title">BE Coding Caf&#233;</h1>
						<p class="hero-body">
							A place where researchers learn, experiment, and solve coding problems together.
						</p>
						<p class="hero-tagline">SHORT TALKS · HANDS-ON CODING · PEER SUPPORT</p>

						<div class="hero-actions">
							<button
								type="button"
								class="hero-btn hero-btn--primary"
								on:click={() => scrollToScreen(3)}
							>
								Explore future and past sessions
							</button>
						</div>
					</div>

					<div class="hero-card hero-card--identity">
						<div class="hero-card__header"></div>

						<div class="hero-mini-grid">
							<div class="hero-mini-card">
								<p class="hero-mini-card__eyebrow">What it is</p>
								<p class="hero-mini-card__text">An open, practical space for research coding.</p>
							</div>
							<div class="hero-mini-card">
								<p class="hero-mini-card__eyebrow">How it feels</p>
								<p class="hero-mini-card__text">Relaxed enough to ask, focused enough to build.</p>
							</div>
						</div>
					</div>
				</div>

				<div class="hero-scroll-indicator hero-scroll-indicator--bottom" aria-hidden="true">
					<span class="hero-scroll-indicator__text">Scroll</span>
					<span class="hero-scroll-indicator__track">
						<span class="hero-scroll-indicator__segment"></span>
					</span>
				</div>
			</section>

			<section
				bind:this={structureEl}
				data-screen-index="1"
				id="structure"
				class="hero-screen hero-screen--structure"
			>
				<div
					class:hero-content--active={activeScreen === 1}
					class="hero-content hero-content--stack"
				>
					<div class="hero-copy hero-copy--wide">
						<p class="hero-eyebrow">How it works</p>
						<h2 class="hero-title hero-title--section">What happens at a session?</h2>
					</div>

					<div class="hero-grid hero-grid--split">
						{#each sessionParts as part}
							<article class="hero-card hero-card--soft">
								<p class="hero-card__label">{part.label}</p>
								<h3 class="hero-card__title">{part.title}</h3>
								<p class="hero-card__body">{part.body}</p>
							</article>
						{/each}
					</div>

					<div class="hero-banner">
						<p>☕ Bring your laptop. Work on real problems.</p>
						<button type="button" class="hero-link" on:click={() => scrollToScreen(2)}>
							Next ↓
						</button>
					</div>
				</div>

				<div class="hero-scroll-indicator hero-scroll-indicator--bottom" aria-hidden="true">
					<span class="hero-scroll-indicator__text">Scroll</span>
					<span class="hero-scroll-indicator__track">
						<span class="hero-scroll-indicator__segment"></span>
					</span>
				</div>
			</section>

			<section
				bind:this={clarityEl}
				data-screen-index="2"
				id="not-a-course"
				class="hero-screen hero-screen--clarity"
			>
				<div class:hero-content--active={activeScreen === 2} class="hero-content">
					<div class="hero-copy">
						<p class="hero-eyebrow">Let's be clear</p>
						<h2 class="hero-title hero-title--section">
							This is not a course / workshop / training.
						</h2>
						<p class="hero-body">
							The format is intentionally lightweight, flexible, and welcoming to different levels
							of experience.
						</p>
					</div>

					<div class="hero-card">
						<div class="hero-grid hero-grid--checks">
							{#each checkItems as item}
								<div class="hero-check">
									<span class="hero-check__mark">✓</span>
									<p>{item}</p>
								</div>
							{/each}
						</div>
						<p class="hero-footer-line">Everyone is welcome. Every level.</p>
					</div>
				</div>

				<div class="hero-scroll-indicator hero-scroll-indicator--bottom" aria-hidden="true">
					<span class="hero-scroll-indicator__text">Scroll</span>
					<span class="hero-scroll-indicator__track">
						<span class="hero-scroll-indicator__segment"></span>
					</span>
				</div>
			</section>

			<section
				bind:this={eventsEl}
				data-screen-index="3"
				id="events"
				class="hero-screen hero-screen--events"
			>
				<div class:hero-content--active={activeScreen === 3} class="hero-content">
					<div class="hero-copy">
						<p class="hero-eyebrow">Upcoming</p>
						<h2 class="hero-title hero-title--section">Next Coding Caf&#233;</h2>
						<p class="hero-body">Join even if the topic is new to you</p>
					</div>

					{#if nextEvent}
						<div class="hero-card hero-card--event">
							<div class="hero-event-top">
								<p class="hero-badge">{formatMonthYear(nextEvent.date)}</p>
								<p class="hero-supporting">Monthly session</p>
							</div>

							<div class="hero-event-main">
								<div>
									<p class="hero-info-label">Date</p>
									<div class="hero-date-stack">
										<p class="hero-date">{formatDay(nextEvent.date)}</p>
										<p class="hero-date hero-date--month">{formatMonth(nextEvent.date)}</p>
									</div>
								</div>
								<div>
									<p class="hero-info-label">Topic</p>
									<h3 class="hero-card__title">
										{nextEvent.title}{#if nextEvent.subtitle}: {nextEvent.subtitle}{/if}
									</h3>
								</div>
							</div>

							<div class="hero-grid hero-grid--meta">
								<div class="hero-mini-card">
									<p class="hero-mini-card__eyebrow">Location</p>
									<p class="hero-mini-card__text">{nextEvent.location ?? 'To be announced'}</p>
								</div>
								<div class="hero-mini-card">
									<p class="hero-mini-card__eyebrow">Time</p>
									<p class="hero-mini-card__text">{nextEventTime || 'Time to be announced'}</p>
								</div>
							</div>

							{#if nextEvent.speaker}
								<div class="hero-speaker-card">
									<div class="hero-speaker-card__inner">
										{#if nextEvent.speakerImage}
											<img
												src={nextEvent.speakerImage}
												alt={nextEvent.speaker}
												class="hero-speaker-card__image"
											/>
										{/if}
										<div>
											<p class="hero-mini-card__eyebrow">Speaker</p>
											<p class="hero-mini-card__text">{nextEvent.speaker}</p>
											{#if nextEvent.speaker_link}
												<a
													href={nextEvent.speaker_link}
													target="_blank"
													rel="noreferrer"
													class="hero-speaker-card__link"
												>
													View profile ↗
												</a>
											{/if}
										</div>
									</div>
								</div>
							{/if}

							<div class="hero-actions">
								<a href="/agenda" class="hero-btn hero-btn--primary">Join the next session</a>
								<a href="/agenda" class="hero-btn hero-btn--secondary">See all events</a>
							</div>
						</div>
					{:else}
						<div class="hero-card hero-card--event">
							<div class="hero-event-top">
								<p class="hero-badge">Upcoming</p>
								<p class="hero-supporting">Monthly session</p>
							</div>

							<div class="hero-event-main">
								<div>
									<p class="hero-info-label">Status</p>
									<p class="hero-date">Soon</p>
								</div>
								<div>
									<p class="hero-info-label">Update</p>
									<h3 class="hero-card__title">
										The next Coding Café will appear here once published.
									</h3>
								</div>
							</div>

							<div class="hero-actions">
								<a href="/agenda" class="hero-btn hero-btn--secondary">See all events</a>
							</div>
						</div>
					{/if}
				</div>

				<div class="hero-scroll-indicator hero-scroll-indicator--bottom" aria-hidden="true">
					<span class="hero-scroll-indicator__text">Scroll</span>
					<span class="hero-scroll-indicator__track">
						<span class="hero-scroll-indicator__segment"></span>
					</span>
				</div>
			</section>

			<section
				bind:this={communityEl}
				data-screen-index="4"
				id="community"
				class="hero-screen hero-screen--community"
			>
				<div class:hero-content--active={activeScreen === 4} class="hero-content">
					<div class="hero-copy">
						<p class="hero-eyebrow">Community</p>
						<h2 class="hero-title hero-title--section">A growing community of researchers</h2>
					</div>

					<div class="hero-card">
						<div class="hero-list">
							{#each communityPoints as point}
								<div class="hero-list__item">
									<span class="hero-list__dot"></span>
									<p>{point}</p>
								</div>
							{/each}
						</div>

						<div class="hero-community-footer">
							<div>
								<a
									href={teamsUrl}
									target="_blank"
									rel="noreferrer"
									class="hero-link hero-link--large"
								>
									Join the community ↗
								</a>
								<p class="hero-sub-label">via Microsoft Teams</p>
							</div>
							<a href="/resources" class="hero-link">Resources ↗</a>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>
</div>
