export async function load({ params }) {
	const modules = import.meta.glob('/src/lib/events/*.md');
	const slug = params.slug;
	const match = Object.entries(modules).find(([path]) => path.includes(`${slug}.md`));

	if (!match) throw new Error(`Post not found for slug: ${slug}`);
	const post = await match[1]();
	return {
		content: post.default,
		metadata: post.metadata
	};
}
