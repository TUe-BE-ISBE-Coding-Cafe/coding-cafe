<script>
	import events from '$lib/data/events.json';
	import trainings from '$lib/data/trainings.json';
	import { formatEventTime } from '$lib/utils/events.js';

	const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

	const now = new Date();
	let activeDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	let viewMode = 'month';
	let activeEvent = null;

	function getDaysInMonth(year, month) {
		return new Date(year, month + 1, 0).getDate();
	}

	function getFirstDayOfMonth(year, month) {
		const day = new Date(year, month, 1).getDay();
		return day === 0 ? 6 : day - 1;
	}

	function formatDateKey(date) {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	}

	function addDays(date, amount) {
		const next = new Date(date);
		next.setDate(next.getDate() + amount);
		return next;
	}

	function getStartOfWeek(date) {
		const day = date.getDay();
		const diff = day === 0 ? -6 : 1 - day;
		return addDays(date, diff);
	}

	function sameDay(left, right) {
		return formatDateKey(left) === formatDateKey(right);
	}

	const trainingEvents = trainings.flatMap((training) =>
		training.sessions.map((session) => ({
			id: `${training.id}-${session.id}`,
			title: training.title,
			date: session.date,
			startTime: session.startTime,
			endTime: session.endTime,
			time:
				session.startTime && session.endTime
					? `${session.startTime} - ${session.endTime}`
					: session.startTime || session.endTime || '',
			location: session.location,
			description: training.description,
			type: 'training',
			href: `/training#${training.id}`
		}))
	);

	const cafeEvents = events.map((event) => ({
		id: event.slug ?? event.title,
		title: event.subtitle ? `${event.title} ${event.subtitle}` : event.title,
		date: event.date,
		startTime: event.startTime,
		endTime: event.endTime,
		time: formatEventTime(event),
		location: event.location,
		description: event.description,
		type: 'cafe',
		href: event.slug ? `/events/${event.slug}` : '/agenda'
	}));

	const calendarEvents = [...trainingEvents, ...cafeEvents];

	function getEventsForDay(date) {
		return calendarEvents
			.filter((event) => event.date.slice(0, 10) === formatDateKey(date))
			.sort((a, b) => (a.time ?? '').localeCompare(b.time ?? ''));
	}

	function parseStartHour(time) {
		if (!time) return null;
		const match = time.match(/(\d{1,2}):(\d{2})/);
		if (!match) return null;
		const hours = Number(match[1]);
		const minutes = Number(match[2]);
		return hours + minutes / 60;
	}

	function parseHourMinute(time) {
		if (!time) return null;
		const match = time.match(/(\d{1,2}):(\d{2})/);
		if (!match) return null;
		return Number(match[1]) + Number(match[2]) / 60;
	}

	const timelineStartHour = 8;
	const timelineEndHour = 20;
	const timelineStepMinutes = 30;
	const timelineSlotHeight = 2.25;
	const timelineSlots = Array.from(
		{ length: (timelineEndHour - timelineStartHour) * 2 + 1 },
		(_, index) => timelineStartHour + index * 0.5
	);

	function formatHourLabel(value) {
		const hours = Math.floor(value);
		const minutes = value % 1 === 0 ? '00' : '30';
		return `${String(hours).padStart(2, '0')}:${minutes}`;
	}

	function getWeekTimedEvents(date) {
		const datedEvents = getEventsForDay(date);
		return datedEvents.map((event, index) => {
			const start = event.startTime ? parseHourMinute(event.startTime) : parseStartHour(event.time);
			const end = event.endTime ? parseHourMinute(event.endTime) : null;
			const duration = start !== null && end !== null && end > start ? end - start : 0.5;
			const top = start !== null ? (start - timelineStartHour) * (60 / timelineStepMinutes) * timelineSlotHeight : index * 4.75 + 0.5;
			const height = Math.max(duration * (60 / timelineStepMinutes) * timelineSlotHeight - 0.3, 2);
			return {
				...event,
				top,
				height,
				untimed: start === null
			};
		});
	}

	function getDayTimedEvents(date) {
		return getWeekTimedEvents(date);
	}

	function buildCalendarCells(year, month) {
		const daysInMonth = getDaysInMonth(year, month);
		const startingDayIndex = getFirstDayOfMonth(year, month);
		const daysInPrevMonth = getDaysInMonth(year, month - 1);
		const cells = [];

		for (let i = 0; i < startingDayIndex; i += 1) {
			const day = daysInPrevMonth - startingDayIndex + i + 1;
			cells.push({ day, type: 'prev', fullDate: new Date(year, month - 1, day) });
		}

		for (let i = 1; i <= daysInMonth; i += 1) {
			cells.push({ day: i, type: 'current', fullDate: new Date(year, month, i) });
		}

		const remainingCells = 42 - cells.length;
		for (let i = 1; i <= remainingCells; i += 1) {
			cells.push({ day: i, type: 'next', fullDate: new Date(year, month + 1, i) });
		}

		return cells;
	}

	$: calendarCells = buildCalendarCells(activeDate.getFullYear(), activeDate.getMonth());
	$: weekDays = Array.from({ length: 7 }, (_, index) => addDays(getStartOfWeek(activeDate), index));
	$: dayEvents = getEventsForDay(activeDate);
	$: periodLabel =
		viewMode === 'month'
			? new Date(activeDate.getFullYear(), activeDate.getMonth(), 1).toLocaleDateString('en-US', {
					month: 'long',
					year: 'numeric'
				})
			: viewMode === 'week'
				? `${weekDays[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekDays[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
				: activeDate.toLocaleDateString('en-US', {
						weekday: 'long',
						month: 'long',
						day: 'numeric',
						year: 'numeric'
					});

	function nextPeriod() {
		activeEvent = null;
		if (viewMode === 'month') {
			activeDate = new Date(activeDate.getFullYear(), activeDate.getMonth() + 1, 1);
			return;
		}
		if (viewMode === 'week') {
			activeDate = addDays(activeDate, 7);
			return;
		}
		activeDate = addDays(activeDate, 1);
	}

	function prevPeriod() {
		activeEvent = null;
		if (viewMode === 'month') {
			activeDate = new Date(activeDate.getFullYear(), activeDate.getMonth() - 1, 1);
			return;
		}
		if (viewMode === 'week') {
			activeDate = addDays(activeDate, -7);
			return;
		}
		activeDate = addDays(activeDate, -1);
	}

	function goToToday() {
		activeDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
		activeEvent = null;
	}

	function isToday(date) {
		return sameDay(new Date(), date);
	}

	function openEvent(event) {
		activeEvent = event;
	}

	function closeEvent() {
		activeEvent = null;
	}

	function setViewMode(mode) {
		viewMode = mode;
		activeEvent = null;
	}
</script>

<svelte:head>
	<title>Calendar | BE Coding Cafe</title>
</svelte:head>

<section class="calendar-page">
	<div class="calendar-shell">
		<section class="calendar-head">
			<div class="calendar-head__copy">
				<p class="calendar-head__eyebrow">Calendar</p>
				<h1>Calendar View</h1>
				<p>
					A shared calendar view of Coding Caf&#233; sessions and training activities across month,
					week, and day layouts.
				</p>
			</div>

			<div class="calendar-head__controls">
				<div class="calendar-view-toggle" role="tablist" aria-label="Calendar view">
					<button
						type="button"
						class:calendar-view-toggle__button--active={viewMode === 'month'}
						class="calendar-view-toggle__button"
						on:click={() => setViewMode('month')}
					>
						Month
					</button>
					<button
						type="button"
						class:calendar-view-toggle__button--active={viewMode === 'week'}
						class="calendar-view-toggle__button"
						on:click={() => setViewMode('week')}
					>
						Week
					</button>
					<button
						type="button"
						class:calendar-view-toggle__button--active={viewMode === 'day'}
						class="calendar-view-toggle__button"
						on:click={() => setViewMode('day')}
					>
						Day
					</button>
				</div>

				<div class="calendar-nav">
					<button type="button" on:click={prevPeriod}>Prev</button>
					<div class="calendar-nav__label">{periodLabel}</div>
					<button type="button" on:click={nextPeriod}>Next</button>
				</div>
				<button type="button" class="calendar-today" on:click={goToToday}>Today</button>
			</div>
		</section>

		<div class="calendar-legend">
			<span><i class="calendar-dot calendar-dot--training"></i>Training</span>
			<span><i class="calendar-dot calendar-dot--cafe"></i>Coding Caf&#233;</span>
		</div>

		<section class="calendar-board">
			{#if viewMode === 'month'}
				<div class="calendar-weekdays">
					{#each DAYS_OF_WEEK as day}
						<div>{day}</div>
					{/each}
				</div>

				<div class="calendar-grid">
					{#each calendarCells as cell, idx}
						<div
							class={`calendar-cell ${cell.type === 'current' ? 'calendar-cell--current' : 'calendar-cell--muted'}`}
							data-last-col={idx % 7 === 6}
						>
							<div class="calendar-day">
								<span class:calendar-day__today={isToday(cell.fullDate)}>{cell.day}</span>
							</div>

							<div class="calendar-events">
								{#each getEventsForDay(cell.fullDate) as event (event.id)}
									<div
										class={`calendar-event ${event.type === 'cafe' ? 'calendar-event--cafe' : 'calendar-event--training'}`}
									>
										<button
											type="button"
											aria-haspopup="dialog"
											class="calendar-event__button"
											on:click={() => openEvent(event)}
										>
											<div class="calendar-event__header">
												<div class="calendar-event__title">{event.title}</div>
												<span class="calendar-event__expand">+</span>
											</div>
											{#if event.time}
												<div class="calendar-event__time">{event.time}</div>
											{/if}
										</button>
									</div>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			{:else if viewMode === 'week'}
				<div class="calendar-week-timeline">
					<div class="calendar-week-timeline__hours">
						<div class="calendar-week-timeline__corner"></div>
						{#each timelineSlots as hour}
							<div class="calendar-week-timeline__hour">{formatHourLabel(hour)}</div>
						{/each}
					</div>

					<div class="calendar-week-timeline__days">
						{#each weekDays as day}
							<div class="calendar-week-timeline__day">
								<div class="calendar-week-timeline__dayhead">
									<p>{day.toLocaleDateString('en-US', { weekday: 'short' })}</p>
									<span class:calendar-day__today={isToday(day)}>
										{day.toLocaleDateString('en-US', { day: 'numeric' })}
									</span>
								</div>

								<div class="calendar-week-timeline__lane">
									{#each timelineSlots as hour}
										<div class="calendar-week-timeline__slot"></div>
									{/each}

									{#if getWeekTimedEvents(day).length}
										{#each getWeekTimedEvents(day) as event (event.id)}
											<div
												class={`calendar-event calendar-event--timeline ${event.type === 'cafe' ? 'calendar-event--cafe' : 'calendar-event--training'} ${event.untimed ? 'calendar-event--untimed' : ''}`}
												style={`top: ${event.top}rem; ${event.untimed ? '' : `height: ${event.height}rem;`}`}
											>
												<button
													type="button"
													aria-haspopup="dialog"
													class="calendar-event__button"
													on:click={() => openEvent(event)}
												>
													<div class="calendar-event__header">
														<div class="calendar-event__title">{event.title}</div>
														<span class="calendar-event__expand">+</span>
													</div>
													{#if event.time}
														<div class="calendar-event__time">{event.time}</div>
													{/if}
												</button>
											</div>
										{/each}
									{:else}
										<p class="calendar-empty-slot calendar-empty-slot--timeline">No events</p>
									{/if}
								</div>
							</div>
						{/each}
					</div>
				</div>
			{:else}
				<div class="calendar-day-view">
					<div class="calendar-day-view__header">
						<p>{activeDate.toLocaleDateString('en-US', { weekday: 'long' })}</p>
						<h2>{activeDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</h2>
					</div>

					<div class="calendar-day-timeline">
						<div class="calendar-day-timeline__hours">
							{#each timelineSlots as hour}
								<div class="calendar-week-timeline__hour">{formatHourLabel(hour)}</div>
							{/each}
						</div>

						<div class="calendar-day-timeline__lane">
							{#each timelineSlots as hour}
								<div class="calendar-week-timeline__slot"></div>
							{/each}

							{#if dayEvents.length}
								{#each getDayTimedEvents(activeDate) as event (event.id)}
									<div
										class={`calendar-event calendar-event--timeline calendar-event--day ${event.type === 'cafe' ? 'calendar-event--cafe' : 'calendar-event--training'} ${event.untimed ? 'calendar-event--untimed' : ''}`}
										style={`top: ${event.top}rem; ${event.untimed ? '' : `height: ${event.height}rem;`}`}
									>
										<button
											type="button"
											aria-haspopup="dialog"
											class="calendar-event__button"
											on:click={() => openEvent(event)}
										>
											<div class="calendar-event__header">
												<div class="calendar-event__title">{event.title}</div>
												<span class="calendar-event__expand">+</span>
											</div>
											{#if event.time}
												<div class="calendar-event__time">{event.time}</div>
											{/if}
											{#if event.location}
												<div class="calendar-event__time">{event.location}</div>
											{/if}
										</button>
									</div>
								{/each}
							{:else}
								<p class="calendar-empty-slot calendar-empty-slot--timeline">
									No events scheduled for this day.
								</p>
							{/if}
						</div>
					</div>
				</div>
			{/if}
		</section>
	</div>
</section>

{#if activeEvent}
	<div class="calendar-modal-backdrop" role="presentation" on:click={closeEvent}>
		<div
			class={`calendar-modal ${activeEvent.type === 'cafe' ? 'calendar-modal--cafe' : 'calendar-modal--training'}`}
			role="dialog"
			aria-modal="true"
			aria-label={activeEvent.title}
			on:click|stopPropagation
		>
			<div class="calendar-modal__top">
				<div>
					<p class="calendar-modal__eyebrow">
						{activeEvent.type === 'cafe' ? 'Coding Café' : 'Training'}
					</p>
					<h2>{activeEvent.title}</h2>
				</div>
				<button type="button" class="calendar-modal__close" aria-label="Close" on:click={closeEvent}>
					×
				</button>
			</div>

			<div class="calendar-modal__meta">
				{#if activeEvent.time}
					<p><strong>Time:</strong> {activeEvent.time}</p>
				{/if}
				{#if activeEvent.location}
					<p><strong>Location:</strong> {activeEvent.location}</p>
				{/if}
			</div>

			{#if activeEvent.description}
				<p class="calendar-modal__body">{activeEvent.description}</p>
			{/if}

			<a href={activeEvent.href} class="calendar-modal__link">Open details</a>
		</div>
	</div>
{/if}

<style>
	:global(body) {
		background: linear-gradient(180deg, #fff8f4 0%, #ffffff 45%, #fff2f2 100%);
	}

	.calendar-shell {
		width: min(100% - 2rem, 84rem);
		margin: 0 auto;
		padding: 1.5rem 0 4rem;
	}

	.calendar-head {
		display: grid;
		gap: 1.25rem;
		align-items: end;
		padding-bottom: 1.25rem;
		border-bottom: 1px solid #e4e4e7;
	}

	.calendar-head__eyebrow {
		margin: 0 0 0.65rem;
		font-size: 0.72rem;
		font-weight: 800;
		letter-spacing: 0.28em;
		text-transform: uppercase;
		color: #c81919;
	}

	.calendar-head h1 {
		margin: 0;
		max-width: 14ch;
		font-size: clamp(2.25rem, 4.8vw, 4rem);
		font-weight: 900;
		line-height: 0.98;
		letter-spacing: -0.05em;
		color: #18181b;
	}

	.calendar-head p:last-child {
		margin: 1rem 0 0;
		max-width: 42rem;
		font-size: 1rem;
		line-height: 1.75;
		color: #52525b;
	}

	.calendar-head__controls {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.calendar-view-toggle {
		display: inline-flex;
		gap: 0.3rem;
		border: 1px solid #e4e4e7;
		border-radius: 1rem;
		background: rgba(255, 255, 255, 0.88);
		padding: 0.3rem;
	}

	.calendar-view-toggle__button {
		border: 0;
		background: transparent;
		padding: 0.65rem 0.85rem;
		border-radius: 0.8rem;
		font-size: 0.78rem;
		font-weight: 800;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #52525b;
		cursor: pointer;
	}

	.calendar-view-toggle__button--active {
		background: #18181b;
		color: white;
	}

	.calendar-nav {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		border: 1px solid #e4e4e7;
		border-radius: 1rem;
		background: rgba(255, 255, 255, 0.88);
		padding: 0.3rem;
	}

	.calendar-nav button,
	.calendar-today {
		border: 0;
		background: transparent;
		padding: 0.65rem 0.85rem;
		border-radius: 0.8rem;
		font-size: 0.82rem;
		font-weight: 800;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #3f3f46;
		cursor: pointer;
	}

	.calendar-nav button:hover,
	.calendar-today:hover {
		background: #f4f4f5;
	}

	.calendar-nav__label {
		min-width: 11rem;
		padding: 0 0.5rem;
		text-align: center;
		font-size: 0.92rem;
		font-weight: 800;
		color: #18181b;
	}

	.calendar-today {
		border: 1px solid #e4e4e7;
		background: rgba(255, 255, 255, 0.88);
	}

	.calendar-legend {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin: 1rem 0;
		font-size: 0.84rem;
		font-weight: 700;
		color: #52525b;
	}

	.calendar-legend span {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
	}

	.calendar-dot {
		display: inline-block;
		width: 0.7rem;
		height: 0.7rem;
		border-radius: 999px;
	}

	.calendar-dot--training {
		background: #f97316;
	}

	.calendar-dot--cafe {
		background: #c81919;
	}

	.calendar-board {
		overflow: hidden;
		border: 1px solid #e4e4e7;
		border-radius: 1.6rem;
		background: rgba(255, 255, 255, 0.86);
		box-shadow: 0 28px 70px -46px rgba(24, 24, 27, 0.25);
	}

	.calendar-weekdays,
	.calendar-grid {
		display: grid;
		grid-template-columns: repeat(7, minmax(0, 1fr));
	}

	.calendar-weekdays {
		border-bottom: 1px solid #e4e4e7;
		background: #fff7f5;
	}

	.calendar-weekdays div {
		padding: 0.8rem;
		text-align: center;
		font-size: 0.72rem;
		font-weight: 800;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: #52525b;
	}

	.calendar-cell {
		display: flex;
		flex-direction: column;
		min-width: 0;
		height: 9.75rem;
		padding: 0.55rem;
		border-right: 1px solid #f1f5f9;
		border-bottom: 1px solid #f1f5f9;
	}

	.calendar-cell[data-last-col='true'] {
		border-right: 0;
	}

	.calendar-cell--muted {
		background: #fafafa;
	}

	.calendar-day {
		display: flex;
		align-items: center;
		min-height: 1.9rem;
		margin-bottom: 0.35rem;
	}

	.calendar-day span {
		display: grid;
		place-items: center;
		width: 1.95rem;
		height: 1.95rem;
		border-radius: 999px;
		font-size: 0.78rem;
		font-weight: 700;
		color: #3f3f46;
	}

	.calendar-day__today {
		background: #c81919;
		color: white !important;
	}

	.calendar-events {
		display: grid;
		gap: 0.35rem;
		flex: 1;
		overflow: auto;
		padding-right: 0.1rem;
	}

	.calendar-event {
		display: block;
		padding: 0.35rem 0.45rem;
		border-left: 3px solid;
		border-radius: 0.55rem;
		text-decoration: none;
		transition:
			transform 180ms ease,
			box-shadow 180ms ease,
			background-color 180ms ease;
	}

	.calendar-event:hover {
		transform: translateX(2px) translateY(-1px);
		box-shadow: 0 10px 20px -16px rgba(24, 24, 27, 0.28);
	}

	.calendar-event--training {
		border-left-color: #f97316;
		background: #fff7ed;
		color: #9a3412;
	}

	.calendar-event--cafe {
		border-left-color: #c81919;
		background: #fff1f2;
		color: #9f1239;
	}

	.calendar-event__header {
		display: flex;
		align-items: start;
		justify-content: space-between;
		gap: 0.35rem;
	}

	.calendar-event__button {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		border: 0;
		background: transparent;
		padding: 0;
		text-align: left;
		color: inherit;
		cursor: pointer;
	}

	.calendar-event__title {
		font-size: 0.68rem;
		font-weight: 800;
		line-height: 1.3;
		word-break: break-word;
	}

	.calendar-event__expand {
		flex: none;
		font-size: 0.9rem;
		font-weight: 700;
		line-height: 1;
		opacity: 0.7;
	}

	.calendar-event__time {
		margin-top: 0.12rem;
		font-size: 0.62rem;
		line-height: 1.25;
		opacity: 0.85;
	}

	.calendar-week-timeline {
		display: grid;
		grid-template-columns: 4.5rem minmax(0, 1fr);
	}

	.calendar-week-timeline__hours {
		border-right: 1px solid #e4e4e7;
		background: #fffaf9;
	}

	.calendar-week-timeline__corner {
		height: 3.5rem;
		border-bottom: 1px solid #f1f5f9;
	}

	.calendar-week-timeline__hour {
		height: 2.25rem;
		padding: 0.35rem 0.65rem 0 0;
		border-bottom: 1px solid #f1f5f9;
		text-align: right;
		font-size: 0.68rem;
		font-weight: 700;
		color: #71717a;
	}

	.calendar-week-timeline__days {
		display: grid;
		grid-template-columns: repeat(7, minmax(0, 1fr));
	}

	.calendar-week-timeline__day {
		border-right: 1px solid #f1f5f9;
	}

	.calendar-week-timeline__day:last-child {
		border-right: 0;
	}

	.calendar-week-timeline__dayhead {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		height: 3.5rem;
		padding: 0.75rem;
		border-bottom: 1px solid #f1f5f9;
		background: rgba(255, 255, 255, 0.65);
	}

	.calendar-week-timeline__dayhead p {
		margin: 0;
		font-size: 0.72rem;
		font-weight: 800;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: #71717a;
	}

	.calendar-week-timeline__dayhead span {
		display: grid;
		place-items: center;
		width: 2rem;
		height: 2rem;
		border-radius: 9999px;
		font-size: 0.8rem;
		font-weight: 800;
		color: #18181b;
	}

	.calendar-week-timeline__lane {
		position: relative;
		height: 58.5rem;
	}

	.calendar-week-timeline__slot {
		height: 2.25rem;
		border-bottom: 1px solid #f1f5f9;
	}

	.calendar-day-view {
		padding: 1rem;
	}

	.calendar-day-timeline {
		display: grid;
		grid-template-columns: 4.5rem minmax(0, 1fr);
		gap: 0;
		margin-top: 0.9rem;
		border-top: 1px solid #f1f5f9;
	}

	.calendar-day-timeline__hours {
		border-right: 1px solid #e4e4e7;
		background: #fffaf9;
	}

	.calendar-day-timeline__lane {
		position: relative;
		height: 58.5rem;
	}

	.calendar-day-view__header {
		padding-bottom: 0.9rem;
		border-bottom: 1px solid #f1f5f9;
	}

	.calendar-day-view__header p {
		margin: 0;
		font-size: 0.72rem;
		font-weight: 800;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: #71717a;
	}

	.calendar-day-view__header h2 {
		margin: 0.4rem 0 0;
		font-size: 1.8rem;
		font-weight: 800;
		letter-spacing: -0.03em;
		color: #18181b;
	}

	.calendar-event--day {
		padding: 0.65rem 0.75rem;
	}

	.calendar-event--timeline {
		position: absolute;
		left: 0.4rem;
		right: 0.4rem;
		z-index: 2;
		min-height: 2rem;
		pointer-events: auto;
	}

	.calendar-event--untimed {
		right: 1rem;
	}

	.calendar-empty-slot {
		margin: 0;
		padding: 0.75rem;
		border: 1px dashed #e4e4e7;
		border-radius: 0.9rem;
		font-size: 0.8rem;
		color: #71717a;
		background: rgba(250, 250, 250, 0.7);
	}

	.calendar-empty-slot--timeline {
		position: absolute;
		left: 0.4rem;
		right: 0.4rem;
		top: 0.5rem;
	}

	.calendar-modal-backdrop {
		position: fixed;
		inset: 0;
		z-index: 60;
		display: grid;
		place-items: center;
		padding: 1rem;
		background: rgba(24, 24, 27, 0.32);
		backdrop-filter: blur(4px);
	}

	.calendar-modal {
		width: min(100%, 28rem);
		border: 1px solid rgba(228, 228, 231, 0.95);
		border-radius: 1.4rem;
		background: rgba(255, 255, 255, 0.98);
		padding: 1.1rem;
		box-shadow: 0 32px 70px -36px rgba(24, 24, 27, 0.45);
		animation: calendar-modal-in 180ms ease;
	}

	.calendar-modal--training {
		border-top: 4px solid #f97316;
	}

	.calendar-modal--cafe {
		border-top: 4px solid #c81919;
	}

	.calendar-modal__top {
		display: flex;
		align-items: start;
		justify-content: space-between;
		gap: 1rem;
	}

	.calendar-modal__eyebrow {
		margin: 0 0 0.35rem;
		font-size: 0.68rem;
		font-weight: 800;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: #71717a;
	}

	.calendar-modal h2 {
		margin: 0;
		font-size: 1.25rem;
		font-weight: 800;
		line-height: 1.2;
		letter-spacing: -0.03em;
		color: #18181b;
	}

	.calendar-modal__close {
		border: 0;
		background: #f4f4f5;
		width: 2rem;
		height: 2rem;
		border-radius: 9999px;
		font-size: 1.1rem;
		line-height: 1;
		color: #3f3f46;
		cursor: pointer;
	}

	.calendar-modal__meta {
		display: grid;
		gap: 0.4rem;
		margin-top: 1rem;
	}

	.calendar-modal__meta p,
	.calendar-modal__body {
		margin: 0;
		font-size: 0.9rem;
		line-height: 1.65;
		color: #52525b;
	}

	.calendar-modal__body {
		margin-top: 0.9rem;
	}

	.calendar-modal__link {
		display: inline-flex;
		margin-top: 1rem;
		align-items: center;
		justify-content: center;
		border-radius: 0.9rem;
		background: #18181b;
		padding: 0.75rem 0.95rem;
		font-size: 0.7rem;
		font-weight: 800;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		text-decoration: none;
		color: white;
	}

	@keyframes calendar-modal-in {
		from {
			opacity: 0;
			transform: translateY(8px) scale(0.98);
		}

		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	@media (min-width: 900px) {
		.calendar-head {
			grid-template-columns: minmax(0, 1fr) auto;
		}
	}

	@media (max-width: 720px) {
		.calendar-shell {
			width: min(100% - 1rem, 84rem);
			padding-top: 1rem;
		}

		.calendar-board {
			overflow-x: auto;
		}

		.calendar-weekdays,
		.calendar-grid,
		.calendar-week-timeline {
			min-width: 48rem;
		}
	}
</style>
