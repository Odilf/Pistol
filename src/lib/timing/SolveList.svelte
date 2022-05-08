<script lang="ts">
	import type { Solve, Selection } from "$lib/data/architecture";
	import { addSolve, deleteSolve } from "$lib/data/database";
	import Overlay from "$lib/UI/basic/Overlay.svelte";
	import SolveCard from "$lib/UI/solves/SolveCard.svelte";
	import SolveDisplay from "$lib/UI/solves/SolveDisplay.svelte";
	import { getContext } from "svelte";

	import { flip } from "svelte/animate";	
	import type { Writable } from "svelte/store";
	import { fly } from "svelte/transition";	

	export let solves: Solve[]
	const selection = getContext('selection') as Writable<Selection>

	$: if (!solves.includes(showingSolve)) {
		showingSolve = null
	}

	export { duration as transitionDuration }
	export const minSolveLength = 5
	let duration = 400

	$: length = Math.max(solves?.length, minSolveLength) || minSolveLength
	const getOpacity = (i: number) => 1 - (i/length)
	
	let showingSolve: Solve

	// Keyboard delete solve and undo
	let deletedSolves = []
	function handleKeydown(e: KeyboardEvent) {
		if (!$selection) return

		if (e.code === 'KeyZ' && (e.altKey || e.metaKey)) {
			console.log(deletedSolves);
			
			if (!e.shiftKey) {
				const solve = solves.at(-1)
				deleteSolve(solve, $selection)
				deletedSolves.push(solve)
			} else if (deletedSolves.length > 0) {
				addSolve(deletedSolves.at(-1), $selection)
				deletedSolves.pop()
			}
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<div class='flex flex-col text-lg items-center'>
	{#each [...solves || []].reverse() as solve, i (solve.date.getTime())}
		<button 
			style:opacity={getOpacity(i)} 
			animate:flip={{ duration }} 
			in:fly|local={{y: -20, duration }} 
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
	<SolveCard bind:solve={ showingSolve } />
</Overlay>