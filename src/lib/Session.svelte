<script lang="ts">
	import { defaultEvents, Solve, type Selection } from '$lib/data/architecture'
	import type { User } from 'firebase/auth'
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	// import { addSolve, getSolves } from './data/database';
	import Scrambler from './timing/Scrambler.svelte';
	import SolveList from './timing/SolveList.svelte';
	import Timer from './timing/Timer.svelte';
	import { fly } from 'svelte/transition'
	import { createFirebaseStore } from './data/database/store';

	export let selection: Selection = {
		event: defaultEvents[0],
		session: defaultEvents[0].sessions[0],
	}

	const selectionStore = writable(selection)
	setContext('selection', selectionStore)

	let requestNewScramble: () => void;
	let activeScramble: string

	$: path = `Solves/${selection.event.name}/${selection.session.name}` as const
	$: solvesStore = createFirebaseStore(path, [], { amount: 10 })
	

	async function handleTime(time: number) {
		// console.log('Made time', time);
		// const solve = new Solve(time, await activeScramble)
		// addSolve(solve, selection, user)
		// requestNewScramble()
	}

</script>

<button on:click={() => {
	$solvesStore = [
		'this', 'is', 'a', 'test',
		'this', 'is', 'twoo', 'test',
		'caca', 'culo', 'pedo', 'pis',
	]
}} class='clickable p-2 m-2'> Populate </button>

<button on:click={() => requestNewScramble()}>
	request new scramble
</button> 

<div class='flex flex-col h-full justify-center items-center'>
	<div class='my-6'>
		<Scrambler bind:requestNewScramble event={selection.event} bind:activeScramble />
	</div>

	<!-- <div class='flex-1 flex items-center'>
		<Timer pressDelay={300} on:time={e => handleTime(e.detail)}/>
	</div>

	{#key solves}
		<div class='flex-1 max-h-[17rem] overflow-hidden' in:fly={{ y: 20 }}>
			<SolveList solves={$solves}/>
		</div>
	{/key} -->
</div>