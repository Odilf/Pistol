<script>
	// import "../../app.css";
	import { active_session, database } from '$lib/storage/database'
	import { onDestroy } from "svelte";

	
	let average
	const unsubscribe = database.subscribe(() => 
		average = active_session().solves.map(v => v.time).reduce((a, b) => a + b, 0) / active_session().solves.length
	)
	onDestroy(unsubscribe)

</script>

<p>
	{#if average}
		Average: {average.toFixed(3)}	
	{:else}
		Yee-haaaaaaa going fast :sungals:
	{/if}
</p>

<style lang="scss">
	p {
		font-size: 1.2em;
		margin-top: 0;
		margin-bottom: 1em;

		color: var(--tertiary-color)
	}
</style>