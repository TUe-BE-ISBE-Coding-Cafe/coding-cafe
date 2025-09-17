<script>
	let navItems = [
		{ name: 'Home', href: '/' },
		{ name: 'Agenda', href: '/agenda' },
		{ name: 'About', href: '/about' }
	];
</script>

<nav class="w-full bg-[#C8102E] text-white shadow-md">
	<div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
		<!-- Left: Logo + Tagline -->
		<div class="flex flex-col items-start space-y-1">
			<img src="/images/logo.png" alt="Logo" class="h-20 w-20" />
			<p class="text-xs text-white italic">Code. Connect. Create.</p>
		</div>

		<!-- Center: Title -->
		<div class="flex-grow text-center">
			<h1 class="text-3xl font-semibold text-white">TU/e BE Coding Café</h1>
		</div>

		<!-- Right: Navigation Links -->
		<div class="flex items-center space-x-6">
			{#each navItems as item}
				<a href={item.href} class="text-l font-medium text-white hover:text-gray-200">{item.name}</a
				>
			{/each}
		</div>
	</div>
</nav>
