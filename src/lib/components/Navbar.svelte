<script>
	import { page } from '$app/state';

	const navItems = [
		{ name: 'Home', href: '/', isActive: (url) => url.pathname === '/' && !url.hash },
		{ name: 'Agenda', href: '/agenda', isActive: (url) => url.pathname === '/agenda' },
		{ name: 'Resources', href: '/resources', isActive: (url) => url.pathname === '/resources' },
		{ name: 'Training', href: '/training', isActive: (url) => url.pathname === '/training' },
		{ name: 'Calendar', href: '/calendar', isActive: (url) => url.pathname === '/calendar' }
	];

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
		class="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-3 lg:flex-row lg:items-center lg:justify-between lg:px-8"
	>
		<div class="flex items-center gap-6 lg:gap-7">
			<img
				src="/images/logo_wotext.png"
				alt="BE Coding Cafe logo"
				class="-mt-1 h-14 w-14 shrink-0 object-contain"
			/>

			<div class="min-w-0 pt-1 lg:pl-1">
				<a
					href="/"
					class="block text-[1.35rem] font-black tracking-[-0.04em] text-zinc-950 sm:text-[1.55rem]"
				>
					BE Coding Caf&#233;
				</a>
			</div>
		</div>

		<div class="flex flex-wrap items-center gap-x-8 gap-y-3 lg:justify-end">
			{#each navItems as item}
				<a
					href={item.href}
					aria-current={isActive(item) ? 'page' : undefined}
					class={linkClass(item)}
				>
					{item.name}
				</a>
			{/each}
		</div>
	</div>
</nav>
