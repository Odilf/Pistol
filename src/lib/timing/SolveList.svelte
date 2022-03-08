<script lang="ts">
	import type { Solve } from "$lib/database/architecture";	

	export let solves: Solve[]
	export let length = 10

	$: slice = solves.slice(0, length)
</script>


<div>
	{#each slice as solve, i}
	<div style:opacity={1 - i/length}>
		{solve.time}	
	</div>
	{/each}
</div>