<script lang="ts">
	import type { Solve } from "$lib/data/architecture";
	import { flip } from "svelte/animate";	
	import { fly } from "svelte/transition";	
	import TimeDisplay from "./TimeDisplay.svelte";

	export let solves: Solve[]

	let duration = 400
	export { duration as transitionDuration }

	$: length = Math.max(solves.length, 8)
</script>

<div class='flex flex-col text-lg items-center'>
	{#if solves.length}
		{#each solves.reverse() as solve, i (solve.date.getTime())}
			<div style:opacity={ 1 - ((i)/length)} animate:flip={{ duration }} in:fly|local={{y: -20, duration }} class='transition'>
				<TimeDisplay time={solve.time} />
			</div>
		{/each}
	{:else}
		<p class='opacity-30'>
			No solves yet. 
			<br>
			Start solving!
		</p>
	{/if}
</div>