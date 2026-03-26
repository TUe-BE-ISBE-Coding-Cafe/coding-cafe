<script>
	const githubUrl = 'https://github.com/ISBE-TUe/coding-cafe';
	const zenodoUrl = 'https://zenodo.org/communities/tue_be_isbe_codingcafe';
	const teamsUrl =
		'https://teams.microsoft.com/l/team/19%3ATfehyuNclRvZxP_XBBLUaPcVK0L_aHdbfs7NNHqcsqQ1%40thread.tacv2/conversations?groupId=81d0985d-b794-4f0e-8003-f7265709d8ab&tenantId=cc7df247-60ce-4a0f-9d75-704cf60efc64';
	const email = 'o.balaban@tue.nl';
	const creatorUrl = 'https://www.ozgunbalaban.com';
</script>

<footer class="mt-auto w-full border-t border-black/10 bg-[#111111] text-white">
	<div class="mx-auto max-w-[92rem] px-6 pb-5 pt-4">
		<div class="flex flex-col items-center gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-5">
			<div class="space-y-2 text-center lg:text-left">
				<p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f87171]">
					BE Coding Cafe
				</p>
				<p class="max-w-xs text-sm leading-6 text-zinc-300">
					Research software talks, practical sessions, and shared materials for the Built
					Environment community.
				</p>
			</div>

			<a
				href="https://www.tue.nl"
				target="_blank"
				rel="noreferrer"
				aria-label="TU/e homepage"
				class="inline-flex w-fit max-w-max shrink-0 rounded-2xl bg-white px-3 py-2 shadow-[0_14px_30px_-18px_rgba(255,255,255,0.35)]"
			>
				<img src="/images/tuelogo.svg" alt="TU/e Logo" class="h-8 sm:h-10" />
			</a>

			<a
				href="https://isbe.bwk.tue.nl"
				target="_blank"
				rel="noreferrer"
				class="inline-block text-center text-[11px] font-semibold uppercase leading-[1.25] tracking-[0.14em] text-zinc-300 transition-colors hover:text-white sm:text-xs lg:text-left"
			>
				<span class="block">Information Systems</span>
				<span class="block">in the Built Environment</span>
			</a>

			<div class="flex flex-wrap items-center justify-center gap-x-2 gap-y-3 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300 lg:justify-start">
				<a
					href={teamsUrl}
					target="_blank"
					rel="noreferrer"
					aria-label="BE Coding Cafe Teams"
					class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 transition-colors hover:border-[#f87171]/50 hover:bg-white/10 hover:text-white"
				>
					<img src="/images/teams_logo.svg" alt="BE Coding Cafe Teams" class="h-5" />
					<span>Teams</span>
				</a>
				<a
					href={githubUrl}
					target="_blank"
					rel="noreferrer"
					aria-label="GitHub"
					class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 transition-colors hover:border-[#f87171]/50 hover:bg-white/10 hover:text-white"
				>
					<svg class="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
						<path
							d="M12 0.3a12 12 0 00-3.8 23.4c0.6 0.1 0.8-0.3 0.8-0.6v-2.2c-3.3 0.7-4-1.6-4-1.6-0.6-1.4-1.3-1.8-1.3-1.8-1-0.7 0.1-0.7 0.1-0.7 1.1 0.1 1.7 1.1 1.7 1.1 1 1.7 2.6 1.2 3.2 0.9 0.1-0.7 0.4-1.2 0.7-1.4-2.6-0.3-5.3-1.3-5.3-5.8 0-1.3 0.5-2.3 1.2-3.2-0.1-0.3-0.5-1.5 0.1-3.1 0 0 1-0.3 3.3 1.2a11.6 11.6 0 016 0c2.3-1.5 3.3-1.2 3.3-1.2 0.6 1.6 0.2 2.8 0.1 3.1 0.7 0.9 1.2 1.9 1.2 3.2 0 4.5-2.7 5.5-5.3 5.8 0.4 0.3 0.8 1 0.8 2v3c0 0.3 0.2 0.7 0.8 0.6A12 12 0 0012 0.3"
						/>
					</svg>
					<span>GitHub</span>
				</a>
				<a
					href={zenodoUrl}
					target="_blank"
					rel="noreferrer"
					aria-label="Zenodo Community"
					class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 transition-colors hover:border-[#f87171]/50 hover:bg-white/10 hover:text-white"
				>
					<img src="/images/zenodo-icon-blue.svg" alt="Zenodo" class="h-5" />
					<span>Zenodo</span>
				</a>
			</div>

			<div class="text-center text-xs leading-5 normal-case tracking-normal lg:text-left">
				<p class="font-medium text-white">Contact Özgün Balaban</p>
				<div class="flex flex-col items-center text-zinc-300 lg:items-start">
					<a href={'mailto:' + email} class="transition-colors hover:text-[#fca5a5]">
						{email}
					</a>
					<a
						href={creatorUrl}
						target="_blank"
						rel="noreferrer"
						class="transition-colors hover:text-white"
					>
						www.ozgunbalaban.com
					</a>
				</div>
			</div>
		</div>
	</div>
</footer>
