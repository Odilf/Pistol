<script lang='ts'>
	// import { scrambles } from '$lib/scramble/scrambler'
	import { database, active_session } from '$lib/storage/database'
	import { onDestroy } from 'svelte';

	let scrambles
	const unsubscribe = database.subscribe(() => scrambles = active_session().scrambles)
	onDestroy(unsubscribe)
</script>

<p>
	{#if scrambles}
	{scrambles[scrambles.length - 1]}
	{/if}
</p>

<style lang="scss">
	p {
		height: 3em;
		font-size: 1.2em;
		// margin: 200px, 100px, 0;
		margin-top: 1em;
		margin-bottom: 0;
		margin-left: 1em;
		margin-right: 1em;

		// Text centering
		display: flex;
		justify-content: center;
	}
</style>