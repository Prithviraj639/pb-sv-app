import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { posts } from '$lib/server/db/schema';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const title = formData.get('title')?.toString() || '';
		const content = formData.get('content')?.toString() || '';

		if (!title || !content) {
			return fail(400, { message: 'Title and content are required' });
		}

		const [post] = await db
			.insert(posts)
			.values({
				title,
				content
			})
			.returning();

		if (!post) {
			return fail(500, { message: 'Failed to create post' });
		}

		// Redirect to the new post page (you can adjust the URL as needed)

		return redirect(303, `/posts`);
	}
};
