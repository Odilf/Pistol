<script>
	// import "../../app.css";
	import { active_session, database } from '$lib/storage/database'
	import { onDestroy } from "svelte";
import TimeDisplay from './TimeDisplay.svelte';

	
	let average
	const unsubscribe = database.subscribe(() => {
		const solves = active_session().solves.slice(-100)
		average = solves.map(v => v.time).reduce((a, b) => a + b, 0) / solves.length
	})
	onDestroy(unsubscribe)

</script>

<p>
	{#if average}
		Ao100:&nbsp;<TimeDisplay time={average} small_decimals={false}/>
	{:else}
		<!-- Yee-haaaaaaa going fast :sungals: -->
	{/if}
</p>

<style lang="scss">
	p {
		font-size: 1.2em;
		margin-top: 0;
		margin-bottom: 1em;

		display: flex;

		// color: var(--tertiary-color)
	}
</style>