<script>
	let navItems = [
		{ name: 'Home', href: '/' },
		{ name: 'About', href: '/about' }
	];
</script>

<nav class=" w-full bg-[#C81919] text-white shadow-md">
	<div class="mx-auto flex max-w-7xl items-center">
		<!-- Left: Logo + Tagline -->
		<div class="flex flex-col items-center bg-[#fef4e9]">
			<img src="/images/logo_vector.png" alt="Logo" class="h-20 w-20" />
			<p class="text-xs font-light text-black italic">Code. Connect. Create.</p>
		</div>

		<!-- Center: Title -->
		<div class=" pl-2 text-center">
			<h1 class="sm:text-l text-left font-extralight text-white md:text-xl">
				TU/e BE <br /> Coding Café
			</h1>
		</div>

		<!-- Right: Navigation Links -->
		<div class="flex items-center space-x-4 sm:pl-12 md:pl-24">
			{#each navItems as item}
				<a
					href={item.href}
					class="sm:text-l font-extralight text-white hover:text-gray-200 md:text-xl">{item.name}</a
				>
			{/each}
		</div>
	</div>
</nav>
