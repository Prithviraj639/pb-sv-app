<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div>
	<h1 class="text-3xl font-bold">Posts</h1>
	<p class="text-sm">Create a new post</p>
	<a href="/new" class="btn btn-primary">New</a>
</div>
<table class="table-striped table-bordered table-hover table-sm table">
	<thead>
		<tr>
			<th>Id</th>
			<th>Author</th>
			<th>Published Date</th>
		</tr>
	</thead>
	<tbody>
		{#each data.posts as post}
			<tr>
				<td><a href={`/posts/${post.id}`}>{post.id}</a></td>
				<td>{post.title}</td>
				<td
					><form use:enhance method="post" action="?/delete">
						<input type="hidden" name="id" value={post.id} />
						<button class="btn btn-xs btn-error">Delete</button>
					</form></td
				>
			</tr>
		{/each}
	</tbody>
</table>
