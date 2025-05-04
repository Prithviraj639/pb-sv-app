import { db } from '$lib/server/db';
import { posts } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const posts = await db.query.posts.findMany({});
	return {
		posts
	};
}) satisfies PageServerLoad;

export const actions = {
	delete: async (event) => {
		const formData = await event.request.formData();
		const id = formData.get('id')?.toString() || '';

		if (!id) {
			return { status: 400, message: 'ID is required' };
		}

		const post = await db
			.delete(posts)
			.where(eq(posts.id, Number(id)))
			.returning();

		if (!post) {
			return { status: 500, message: 'Failed to delete post' };
		}

		return { status: 200, message: 'Post deleted successfully' };
	}
};
