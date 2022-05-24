<script lang="ts">
	import TrashCan from '$lib/UI/icons/TrashCan.svelte';
	import type { Solve, Selection, ScrambleType, Penalty } from "$lib/data/architecture";
	import SolveDisplay from "./SolveDisplay.svelte";
	import Scramble from "../scramble/Scramble.svelte";
	import CubeVisualiser from "$lib/UI/basic/CubeVisualiser.svelte";
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import Select from '$lib/UI/preferences/Select.svelte';
	import { scale } from 'svelte/transition';

	export let solve: Solve
	export let scrambleType: ScrambleType = null
	export let editable = false

	$: showScramble = solve.scramble.length < 140

	const selection = getContext('selection') as Writable<Selection>
	$: scrambleType = scrambleType || $selection?.event?.scrambleType

	const dispatch = createEventDispatcher<{ 
		delete: { solve: Solve }, 
		edit: { solve: Solve }
	}>()
</script>

<div class='p-6 bg-secondary text-primary rounded relative shadow overflow-visible max-w-[90vw]'>
	{#key solve}
		<div class='text-6xl font-black w-fit' in:scale={{ start: 0.8 }}> 
			<SolveDisplay {solve}/>
		</div>
	{/key}

	<div class='text-[1em]'>
		{#if showScramble}
			<Scramble scramble={solve.scramble} center={false} disablePreview {scrambleType}/>
		{:else}
			<button class='clickable transition opacity-70 bg-primary text-secondary p-2 my-2 rounded'
			on:click={() => showScramble = true}>
				Show scramble
			</button>
		{/if}
	</div>

	<div class='flex justify-center'>
		<CubeVisualiser alg={solve.scramble} hintFacelets='none' {scrambleType}/>
	</div>

	{#if editable}
	<div class='font-extrabold'>
		<div> PENALTY: </div>
		<Select options={['none', '+2', 'DNF']} ressetable={false} on:select={() => dispatch('edit', { solve })} bind:value={solve.penalty}/>
	</div>
	{/if}

	<div class='font-light text-xl opacity-50 mt-3'>
		Solved on {solve.date.toDateString()}
	</div>		

	{#if editable}			
		<button class='absolute clickable transition top-0 right-0 m-6' 
		on:click={() => dispatch('delete', { solve })}>
			<TrashCan/>
		</button>
	{/if}
</div>