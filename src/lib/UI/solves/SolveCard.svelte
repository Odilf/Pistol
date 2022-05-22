<script lang="ts">
	import TrashCan from '$lib/UI/icons/TrashCan.svelte';
	import type { Solve, Selection, Event } from "$lib/data/architecture";
	import SolveDisplay from "./SolveDisplay.svelte";
	import Scramble from "../scramble/Scramble.svelte";
	import CubeVisualiser from "$lib/UI/basic/CubeVisualiser.svelte";
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	export let solve: Solve
	export let solves: {
		[date: string]: Solve 
	} = null

	const selection = getContext('selection') as Writable<Selection>
	$: scrambleType = $selection?.event?.scrambleType
</script>

<div class='p-6 bg-secondary text-primary rounded relative shadow overflow-visible'>
	<span class='text-6xl font-black'>
		<SolveDisplay {solve}/>
	</span>

	<div class='text-[0.6em]'>
		<Scramble scramble={solve.scramble} center={false} disablePreview {scrambleType}/>
	</div>

	<div class='flex justify-center'>
		<CubeVisualiser alg={solve.scramble} hintFacelets='none' {scrambleType}/>
	</div>

	<div class='font-normal text-xl opacity-50 mt-3'>
		Solved on {solve.date.toDateString()}
	</div>		

	{#if solves}			
		<button class='absolute clickable transition top-0 right-0 m-6' on:click={() => {
			solves[solve.date.getTime()] = null
			console.log('deleting', solve);
			
		}}>
			<TrashCan/>
		</button>
	{/if}
</div>