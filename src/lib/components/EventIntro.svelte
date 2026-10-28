<script>
	export let intro;
	export let detailHref = '';
	export let signup = '';
</script>

<details class="event-intro rounded-2xl border border-[#eab4b4] bg-[#fff5f5]">
	<summary class="flex cursor-pointer items-center justify-between gap-4 px-4 py-3">
		<div class="min-w-0">
			<p class="text-[11px] font-semibold tracking-[0.16em] text-[#C81919] uppercase">
				New to this?
			</p>
			<p class="text-sm font-semibold text-zinc-800">{intro.heading}</p>
		</div>
		<span
			class="event-intro__icon flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-zinc-500"
		>
			<svg viewBox="0 0 24 24" aria-hidden="true" class="h-4 w-4">
				<path
					d="M6 9l6 6 6-6"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</span>
	</summary>

	<div class="space-y-4 border-t border-[#eab4b4] px-4 pt-4 pb-5">
		{#if intro.summary}
			<p class="text-sm leading-6 text-zinc-700">{intro.summary}</p>
		{/if}

		{#if intro.points}
			<ul class="space-y-2 text-sm leading-6 text-zinc-700">
				{#each intro.points as point (point)}
					<li class="flex gap-2">
						<span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C81919]"></span>
						<span>{point}</span>
					</li>
				{/each}
			</ul>
		{/if}

		{#if signup}
			<p class="text-sm leading-6 text-zinc-700">
				Can't make it to the café? You can still join: sign up and we'll send you the starter repo
				and updates.
			</p>
		{/if}

		<div class="flex flex-wrap gap-3">
			{#if signup}
				<a
					href={signup}
					target="_blank"
					rel="noreferrer"
					class="rounded-full bg-[#C81919] px-4 py-2 text-xs font-semibold tracking-[0.16em] text-white uppercase transition-transform hover:-translate-y-0.5"
				>
					Join the challenge
				</a>
			{/if}
			{#if intro.link}
				<a
					href={intro.link}
					target="_blank"
					rel="noreferrer"
					class={signup
						? 'rounded-full border border-zinc-300 bg-white px-4 py-2 text-xs font-semibold tracking-[0.16em] text-zinc-700 uppercase transition-transform hover:-translate-y-0.5'
						: 'rounded-full bg-[#C81919] px-4 py-2 text-xs font-semibold tracking-[0.16em] text-white uppercase transition-transform hover:-translate-y-0.5'}
				>
					{intro.linkLabel ?? 'More info'}
				</a>
			{/if}
			{#if detailHref}
				<a
					href={detailHref}
					class="rounded-full border border-zinc-300 bg-white px-4 py-2 text-xs font-semibold tracking-[0.16em] text-zinc-700 uppercase transition-transform hover:-translate-y-0.5"
				>
					Session page
				</a>
			{/if}
		</div>
	</div>
</details>

<style>
	.event-intro summary {
		list-style: none;
	}

	.event-intro summary::-webkit-details-marker {
		display: none;
	}

	.event-intro__icon {
		transition:
			transform 180ms ease,
			background-color 180ms ease,
			color 180ms ease;
	}

	.event-intro[open] .event-intro__icon,
	.event-intro summary:hover .event-intro__icon {
		background-color: rgb(200 25 25);
		color: white;
	}

	.event-intro[open] .event-intro__icon {
		transform: rotate(180deg);
	}
</style>
