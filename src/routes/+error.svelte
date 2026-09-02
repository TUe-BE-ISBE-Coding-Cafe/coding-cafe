<script>
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status} | BE Coding Cafe</title>
</svelte:head>

<section class="mx-auto flex max-w-screen-xl flex-col items-start gap-6 px-8 py-24">
	<p class="text-sm font-semibold tracking-[0.32em] text-[#C81919] uppercase">
		Error {page.status}
	</p>
	<h1 class="text-5xl font-black tracking-tight text-zinc-900">
		{page.status === 404 ? 'Page not found' : 'Something went wrong'}
	</h1>
	<p class="max-w-2xl text-lg leading-8 text-zinc-600">
		{page.status === 404
			? 'The page you are looking for does not exist or may have been moved.'
			: (page.error?.message ?? 'An unexpected error occurred.')}
	</p>
	<a
		href="/"
		class="rounded-full bg-[#C81919] px-6 py-3 text-sm font-semibold tracking-[0.16em] text-white uppercase transition-transform hover:-translate-y-0.5"
	>
		Back to home
	</a>
</section>
