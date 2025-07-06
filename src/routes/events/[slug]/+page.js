export async function load({ params }) {
	const modules = import.meta.glob('/src/lib/events/*.md');
	console.log(modules);
	const slug = params.slug;
	console.log(params);

	const match = Object.entries(modules).find(([path]) => path.includes(`${slug}.md`));

	if (!match) {
		throw new Error(`Post not found for slug: ${slug}`);
	}

	const post = await match[1]();
	console.log(post);
	return {
		content: post.default,
		metadata: post.metadata
	};
}
