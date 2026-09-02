<script>
	import { page } from '$app/state';

	const navItems = [
		{ name: 'Home', href: '/', isActive: (url) => url.pathname === '/' && !url.hash },
		{ name: 'Agenda', href: '/agenda', isActive: (url) => url.pathname === '/agenda' },
		{ name: 'Resources', href: '/resources', isActive: (url) => url.pathname === '/resources' },
		{ name: 'Training', href: '/training', isActive: (url) => url.pathname === '/training' },
		{ name: 'Calendar', href: '/calendar', isActive: (url) => url.pathname === '/calendar' },
		{ name: 'About', href: '/about', isActive: (url) => url.pathname === '/about' }
	];

	let menuOpen = false;

	function isActive(item) {
		return item.isActive(page.url);
	}

	function linkClass(item) {
		return isActive(item)
			? 'border-b-2 border-[#c81919] pb-1 text-sm font-semibold tracking-[0.01em] text-[#c81919] transition hover:text-[#c81919] sm:text-base'
			: 'border-b-2 border-transparent pb-1 text-sm font-semibold tracking-[0.01em] text-zinc-600 transition hover:border-[#c81919]/50 hover:text-[#c81919] sm:text-base';
	}
</script>

<nav class="w-full border-b border-zinc-200/80 bg-white/88 text-zinc-900 backdrop-blur">
	<div
		class="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-2 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-4 lg:px-8 lg:py-3"
	>
		<div class="flex items-center justify-between gap-4">
			<div class="flex min-w-0 items-center gap-3 lg:gap-7">
				<img
					src="/images/logo_wotext.png"
					alt="BE Coding Cafe logo"
					class="h-9 w-9 shrink-0 object-contain lg:-mt-1 lg:h-14 lg:w-14"
				/>

				<div class="min-w-0 lg:pt-1 lg:pl-1">
					<a
						href="/"
						class="block truncate text-[1.1rem] font-black tracking-[-0.04em] text-zinc-950 sm:text-[1.35rem] lg:text-[1.55rem]"
					>
						BE Coding Caf&#233;
					</a>
				</div>
			</div>

			<button
				type="button"
				class="-mr-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-zinc-700 transition hover:bg-zinc-100 hover:text-[#c81919] lg:hidden"
				aria-expanded={menuOpen}
				aria-controls="primary-navigation"
				aria-label={menuOpen ? 'Close menu' : 'Open menu'}
				on:click={() => (menuOpen = !menuOpen)}
			>
				<svg viewBox="0 0 24 24" aria-hidden="true" class="h-6 w-6">
					{#if menuOpen}
						<path
							d="M6 6l12 12M18 6L6 18"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
						/>
					{:else}
						<path
							d="M4 7h16M4 12h16M4 17h16"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
						/>
					{/if}
				</svg>
			</button>
		</div>

		<div
			id="primary-navigation"
			class="flex-wrap items-center gap-x-8 gap-y-3 pb-2 lg:flex lg:justify-end lg:pb-0 {menuOpen
				? 'flex'
				: 'hidden'}"
		>
			{#each navItems as item (item.href)}
				<a
					href={item.href}
					aria-current={isActive(item) ? 'page' : undefined}
					class={linkClass(item)}
					on:click={() => (menuOpen = false)}
				>
					{item.name}
				</a>
			{/each}
		</div>
	</div>
</nav>
