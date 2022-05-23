<script lang="ts">
	import type { Solve } from "$lib/data/architecture";
	import Overlay from "$lib/UI/basic/Overlay.svelte";
	import SolveCard from "$lib/UI/solves/SolveCard.svelte";
	import SolveDisplay from "$lib/UI/solves/SolveDisplay.svelte";

	import { flip } from "svelte/animate";	
	import { fly } from "svelte/transition";	

	export let solves: Solve[]

	$: if (!solves.includes(showingSolve)) {
		showingSolve = null
	}

	export { duration as transitionDuration }
	export const minSolveLength = 5
	let duration = 400

	$: length = Math.max(solves?.length, minSolveLength) || minSolveLength
	const getOpacity = (i: number) => 1 - (i/length)
	
	let showingSolve: Solve
</script>

<div class='flex flex-col text-lg items-center'>
	{#each [...solves].reverse() as solve, i (solve.date.getTime())}
		<button 
			style:opacity={getOpacity(i)} 
			in:fly|local={{y: -20, duration }} 
			animate:flip={{ duration: 400 }}
			class='transition clickable'
			on:click={() => showingSolve = solve}>
			<SolveDisplay {solve}/>
		</button>
	{:else}
		<p class='opacity-30'>
			No solves yet. 
			<br>
			Start solving!
		</p>
	{/each}
</div>

<Overlay on:close={ () => showingSolve = null } enabled={ !!showingSolve }>
	<SolveCard solve={ showingSolve } editable on:delete on:edit />
</Overlay>