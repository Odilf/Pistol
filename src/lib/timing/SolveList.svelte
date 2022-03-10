<script lang="ts">
	import type { Solve } from "$lib/data/architecture";
	import { flip } from "svelte/animate";	
	import TimeDisplay from "./TimeDisplay.svelte";

	export let solves: Solve[]

	$: length = Math.max(solves.length, 8)
</script>

<div class='flex flex-col items-center'>
	{#each solves.reverse() as solve, i (solve.date.getTime())}
	<div style:opacity={ 1 - ((i + 1)/length)} animate:flip class='transition'>
		<TimeDisplay time={solve.time} />
	</div>
	{/each}
</div>