<script lang="ts">
	import type { Event, Session, Solve, Selection } from "$lib/data/architecture";
	import SolveDisplay from "./SolveDisplay.svelte";
	import Scramble from "../scramble/Scramble.svelte";
	import CubeVisualiser from "$lib/UI/basic/CubeVisualiser.svelte";
	import { deleteSolve } from "$lib/data/database";
	import AddReconstruction from "./AddReconstruction.svelte";
	import { getContext } from "svelte";
import type { Writable } from "svelte/store";
	// import Dropdown from "../basic/Dropdown.svelte";

	export let solve: Solve

	const selection = getContext('selection') as Writable<Selection>
	$: ({ event, session } = $selection || { event: null, session: null })
	let scrambleType = event?.scrambleType || '3x3'
</script>

<div class='p-6 bg-secondary text-primary rounded relative shadow overflow-visible'>
	<span class='text-6xl font-black'>
		<SolveDisplay {solve}/>
	</span>

	<div class='text-[0.6em]'>
		<Scramble scramble={solve.scramble} {scrambleType} center={false} disablePreview/>
	</div>

	<div class='flex justify-center'>
		<CubeVisualiser alg={solve.scramble} hintFacelets='none' {scrambleType}/>
	</div>

	<AddReconstruction/>

	<div class='font-normal text-xl opacity-50 mt-3'>
		Solved on {solve.date.toDateString()}
	</div>		

	{#if event && session}			
		<button class='absolute clickable top-0 right-0 m-6' on:click={() => {
			deleteSolve(solve, { event, session })
			solve = null
		}}>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="#FF1B1B">
				<path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
			</svg>
		</button>
	{/if}
</div>