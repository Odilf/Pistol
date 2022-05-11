<script lang="ts">
	import { defaultEvents, Solve, type Selection } from '$lib/data/architecture'
	import type { User } from 'firebase/auth'
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	import { addSolve, getSolves } from './data/database';
	import Scrambler from './timing/Scrambler.svelte';
	import SolveList from './timing/SolveList.svelte';
	import Timer from './timing/Timer.svelte';

	export let selection: Selection = {
		event: defaultEvents[0],
		session: defaultEvents[0].sessions[0],
	}

	export let user: User

	const selectionStore = writable(selection)
	setContext('selection', selectionStore)

	let requestNewScramble: () => void;
	let activeScramble: Promise<string>

	$: solves = getSolves(selection, user, 10)

	async function handleTime(time: number) {
		console.log('Made time', time);
		const solve = new Solve(time, await activeScramble)
		addSolve(solve, selection, user)
	}

</script>

<div class='flex flex-col h-full justify-center items-center'>
	<div class='my-6'>
		<Scrambler bind:requestNewScramble {selection} bind:activeScramble />
	</div>

	<div class='flex-1 flex items-center'>
		<Timer pressDelay={300} on:time={e => handleTime(e.detail)}/>
	</div>

	<div class='flex-1 max-h-[17rem] overflow-hidden'>
		<SolveList solves={$solves}/>
	</div>
</div>