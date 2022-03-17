<script lang='ts'>
	import EventTabs from "$lib/navigation/EventTabs.svelte";
	import Timer from "$lib/timing/Timer.svelte";
	import SolveList from "$lib/timing/SolveList.svelte";

	import { Solve } from "$lib/data/architecture";
	import { addSolve, deleteSolve, events, getSolves as getDBSolves } from "$lib/data/database";

	import { fly } from 'svelte/transition';
	import { onMount } from "svelte";
	import Scrambler from "$lib/timing/Scrambler.svelte";
	import Header from "$lib/UI/misc/Header.svelte";
import { holdKeyboardShorcuts } from "$lib/data/stores";

	$: getSolves = () => getDBSolves(selection.event, selection.session, 12)

	let requestNewScramble: () => void;
	$: solves = selection && getSolves()
	onMount(() => {
		selection = {
			event: $events[0],
			session: $events[0].sessions[0],
		}

		solves = getSolves()
	})

	let activeScramble: Promise<string>

	async function handleTime(time: number) {
		const solve = new Solve(time, await activeScramble)
		addSolve(solve, selection.event, selection.session)
		requestNewScramble()
	}

	let selection = null

	function handleKeydown(e: KeyboardEvent) {
		if (!$holdKeyboardShorcuts && e.code === 'KeyZ' && (e.altKey || e.metaKey)) {
			if ($solves.length) {
				deleteSolve($solves[$solves.length - 1], selection.event, selection.session)
				solves = getSolves()
			}
		}
	}

	$: console.log($solves);
	
</script>

<svelte:window on:keydown={handleKeydown}/>

<main class='w-full h-full max-h-full flex flex-col items-center justify-center'>
	<div class='flex-1 w-full flex-col items-center justify-center overflow-y-scroll'>
		<Header/>

		<EventTabs events={$events} bind:selection/>

		<div class='m-4'>
			<Scrambler bind:requestNewScramble {selection} bind:activeScramble/>
		</div>
	</div>

	<div class='overflow-y-scroll'>
		<Timer pressDelay={300} on:time={e => handleTime(e.detail)}/>
	</div>

	<div class='flex-1 w-full flex-col items-center justify-center overflow-y-scroll'>
		{#key selection}
			<div in:fly|local={{x: -20, duration: 400}}>
				<SolveList solves={$solves} {selection}/>
			</div>
		{/key}
	</div>
</main>