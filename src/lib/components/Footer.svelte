<script>
	const githubUrl = 'https://github.com/TUe-BE-ISBE-Coding-Cafe/coding-cafe/';
	const zenodoUrl = 'https://zenodo.org/communities/tue_be_isbe_codingcafe';
	const email = 'o.balaban@tue.nl';
</script>

<footer class="mt-auto w-full bg-[#C8102E] py-6 text-white">
	<div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row">
		<!-- Left: TU/e logo -->
		<div class="shrink-0 bg-[#FFFFFF]">
			<a href="https://www.tue.nl" target="_blank" aria-label="TU/e homepage">
				<img src="/images/tuelogo.svg" alt="TU/e Logo" class="h-10 sm:h-12" />
			</a>
		</div>

		<!-- Center: ISBE text -->
		<div class="text-center text-xl font-medium">
			<a href="https://isbe.bwk.tue.nl" class="block hover:underline">
				Information Systems in the Built Environment (ISBE)
			</a>
		</div>

		<!-- Right: Icons and Email -->
		<div class="flex items-center space-x-4 text-sm">
			<a href={githubUrl} target="_blank" aria-label="GitHub">
				<svg class="h-5 w-5 fill-white hover:fill-gray-300" viewBox="0 0 24 24">
					<path
						d="M12 0.3a12 12 0 00-3.8 23.4c0.6 0.1 0.8-0.3 0.8-0.6v-2.2c-3.3 0.7-4-1.6-4-1.6-0.6-1.4-1.3-1.8-1.3-1.8-1-0.7 0.1-0.7 0.1-0.7 1.1 0.1 1.7 1.1 1.7 1.1 1 1.7 2.6 1.2 3.2 0.9 0.1-0.7 0.4-1.2 0.7-1.4-2.6-0.3-5.3-1.3-5.3-5.8 0-1.3 0.5-2.3 1.2-3.2-0.1-0.3-0.5-1.5 0.1-3.1 0 0 1-0.3 3.3 1.2a11.6 11.6 0 016 0c2.3-1.5 3.3-1.2 3.3-1.2 0.6 1.6 0.2 2.8 0.1 3.1 0.7 0.9 1.2 1.9 1.2 3.2 0 4.5-2.7 5.5-5.3 5.8 0.4 0.3 0.8 1 0.8 2v3c0 0.3 0.2 0.7 0.8 0.6A12 12 0 0012 0.3"
					/>
				</svg>
			</a>
			<a href={zenodoUrl} target="_blank" aria-label="Zenodo Community">
				<img src="/images/zenodo-icon-blue.svg" alt="Zenodo" class="h-5" />
			</a>
			<a href={'mailto:' + email} class="underline hover:text-gray-300"> Contact </a>
		</div>
	</div>
</footer>
