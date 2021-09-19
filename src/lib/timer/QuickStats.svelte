<script>
	import "../../app.css";
	// import { $solve_database } from '$lib/storage/database'

	// $: average = $active_session.solves.map(v => v.time).reduce((a, b) => a + b, 0) / $active_session.solves.length
</script>

<p>
	<!-- {#if average}
		Average: {average.toFixed(3)}	
	{:else}
		Yee-haaaaaaa going fast :sungals:
	{/if} -->
</p>

<style lang="scss">
	p {
		font-size: 1.2em;
		margin-top: 0;
		margin-bottom: 1em;

		color: var(--tertiary-color)
	}
</style>