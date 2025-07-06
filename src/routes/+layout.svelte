<script>
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	// This enables full prerendering for static site generation
</script>

<div class="flex min-h-screen flex-col">
	<Navbar />

	<main class="flex-1">
		<slot />
	</main>

	<Footer />
</div>
