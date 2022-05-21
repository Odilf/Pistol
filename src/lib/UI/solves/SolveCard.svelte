<script lang="ts">
	import TrashCan from '$lib/UI/icons/TrashCan.svelte';
	import type { Solve, Selection } from "$lib/data/architecture";
	import SolveDisplay from "./SolveDisplay.svelte";
	import Scramble from "../scramble/Scramble.svelte";
	import CubeVisualiser from "$lib/UI/basic/CubeVisualiser.svelte";
	import AddReconstruction from "./AddReconstruction.svelte";
	import { getContext } from "svelte";
	import type { Writable } from "svelte/store";

	export let solve: Solve

	const selection = getContext('selection') as Writable<Selection>
	$: ({ event } = $selection || { event: null, session: null })
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

	{#if $selection}			
		<button class='absolute clickable top-0 right-0 m-6' on:click={() => {
			console.log('bleep bloop deleting solve');
			// deleteSolve(solve, $selection, $user)
		}}>
			<TrashCan/>
		</button>
	{/if}
</div>