<script lang='ts'>
	// import { scrambles } from '$lib/scramble/scrambler'
	import { database, active_session } from '$lib/storage/database'
	import { onDestroy } from 'svelte';

	let scrambles: Promise<string>[]
	const unsubscribe = database.subscribe(() => scrambles = active_session().scrambles)
	$: scramble_promise = scrambles[scrambles.length - 1]
	onDestroy(unsubscribe)
</script>

<p>
	{#await scramble_promise}
		Loading
	{:then scramble}
	{#if typeof scramble === 'string'}
		{#each scramble.split('\n') as line}
			{line}
			<br>
		{/each}
		{/if}
	{/await}
</p>

<style lang="scss">
	p {
		// height: 3em;
		max-height: 8em;
		overflow-y: scroll;

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