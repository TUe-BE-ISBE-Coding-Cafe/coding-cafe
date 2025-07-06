import devtoolsJson from 'vite-plugin-devtools-json';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	base: '/coding-cafe/',
	assetsInclude: ['**/*.md'],
	plugins: [tailwindcss(), sveltekit(), devtoolsJson()]
});
