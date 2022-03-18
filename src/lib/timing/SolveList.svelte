<script lang="ts">
	import type { Event, Session, Solve } from "$lib/data/architecture";
	import SolveCard from "$lib/UI/solves/SolveCard.svelte";
	import SolveDisplay from "$lib/UI/solves/SolveDisplay.svelte";

	import { flip } from "svelte/animate";	
	import { fly } from "svelte/transition";	

	export let solves: Solve[]
	export let selection: { session: Session, event: Event }

	let duration = 400
	export { duration as transitionDuration }
	export const minSolveLength = 5

	$: length = Math.max(solves?.length, minSolveLength) || minSolveLength
	
	let showingSolve: Solve
</script>

<div class='flex flex-col text-lg items-center'>
	{#if solves?.length}
		{#each [...solves].reverse() as solve, i (solve.date.getTime())}
			<button style:opacity={ 1 - ((i)/length)} animate:flip={{ duration }} in:fly|local={{y: -20, duration }} class='transition clickable'
			on:click={() => showingSolve = solve}>
				<SolveDisplay {solve}/>
			</button>
		{/each}
	{:else}
		<p class='opacity-30'>
			No solves yet. 
			<br>
			Start solving!
		</p>
	{/if}
</div>

<SolveCard solve={showingSolve} editable belongs={selection}/>