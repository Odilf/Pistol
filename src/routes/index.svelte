<script lang='ts'>
	import EventTabs from "$lib/navigation/EventTabs.svelte";
	import Timer from "$lib/timing/Timer.svelte";
	import SolveList from "$lib/timing/SolveList.svelte";

	import { Solve } from "$lib/data/architecture";
	import { user } from "$lib/profile";
	import { addSolve, deleteSolve, events, getSolves } from "$lib/data/database";

	import { fly } from 'svelte/transition';
	import { onMount } from "svelte";
	import Scrambler from "$lib/timing/Scrambler.svelte";

	let requestNewScramble: { (): void; (): void; }
	$: solves = selection && getSolves(selection.event, selection.session, 12)
	onMount(() => {
			selection = {
			event: $events[0],
			session: $events[0].sessions[0],
		}

		solves = getSolves(selection.event, selection.session, 12)
	})

	function handleTime(time: number) {
		const solve = new Solve(time, "R U R' U'")
		addSolve(solve, selection.event, selection.session)
		requestNewScramble()
	}

	let selection = null

	function handleKeydown(e: KeyboardEvent) {
		if (e.code === 'KeyZ' && (e.altKey || e.metaKey)) {
			if ($solves.length) {
				deleteSolve($solves[0], selection.event, selection.session)
			}
		}
	}
</script>

<svelte:window on:keydown={handleKeydown}/>

<main class='w-full h-full max-h-full flex flex-col items-center justify-center'>
	<div class='flex-1 w-full flex-col items-center justify-center overflow-y-scroll'>

		User: {$user?.displayName}. 
		
		<button on:click={() => location.href = '/profile'}> Profile page </button>

		<EventTabs events={$events} bind:selection/>

		<div class='m-4'>
			<Scrambler bind:requestNewScramble {selection}/>
		</div>
	</div>

	<div class='overflow-y-scroll'>
		<Timer pressDelay={300} on:time={e => handleTime(e.detail)}/>
	</div>

	<div class='flex-1 w-full flex-col items-center justify-center overflow-y-scroll'>
		{#key selection}
			<div in:fly={{x: -20, duration: 400}}>
				<SolveList solves={$solves}/>
			</div>
		{/key}
	</div>
</main>