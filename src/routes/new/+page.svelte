<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<form use:enhance method="POST">
	{#if form?.message}
		<div role="alert" class="alert alert-error alert-soft">
			<span>{form.message}</span>
		</div>
	{/if}
	<div class="form-control w-full max-w-xs">
		<label class="">
			<span class="label-text">Title</span>
			<input
				id="title"
				type="text"
				name="title"
				placeholder="Type here"
				class="input input-bordered w-full max-w-xs"
			/>
		</label>
	</div>
	<div class="form-control w-full max-w-xs">
		<label>
			<span
				class="label-text
">Content</span
			>
			<textarea name="content" class="textarea textarea-bordered h-24" placeholder="Type here"
			></textarea>
		</label>
	</div>

	<button class="btn btn-primary mt-2">Submit</button>
</form>
