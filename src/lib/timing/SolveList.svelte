<script lang="ts">
	import type { Solve } from "$lib/data/architecture";
	import { flip } from "svelte/animate";	
import TimeDisplay from "./TimeDisplay.svelte";

	export let solves: Solve[]
</script>


<div>
	{#each solves.reverse() as solve, i (solve.date.getTime())}
		<div style:opacity={ 1 - (i/solves.length)} animate:flip>
			<TimeDisplay time={solve.time} />
		</div>
	{/each}
</div>