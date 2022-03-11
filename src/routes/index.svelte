<script lang='ts'>
	import EventTabs from "$lib/UI/EventTabs.svelte";
	import Timer from "$lib/timing/Timer.svelte";
	import SolveList from "$lib/timing/SolveList.svelte";

	import { Solve } from "$lib/data/architecture";
	import { user } from "$lib/user";
	import { addSolve, deleteSolve, events, getSolves } from "$lib/data/database";

	import { fly, slide } from 'svelte/transition';
	import Scramble from "$lib/timing/Scramble.svelte";

	
	$: solves = getSolves(selection.event, selection.session, 12)

	function handleTime(time: number) {
		const solve = new Solve(time, "R U R' U'")
		addSolve(solve, selection.event, selection.session)

	}

	let selection = {
		event: $events[0],
		session: $events[0].sessions[0]
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.code === 'KeyZ' && e.altKey) {
			if ($solves.length) {
				deleteSolve($solves[0], selection.event, selection.session)
			}
		}
	}
</script>

<svelte:window on:keydown={handleKeydown}/>

<main class='w-full h-full max-h-full flex flex-col items-center justify-center'>
	<div class='flex-1 w-full flex-col items-center justify-center overflow-y-scroll'>

		User: {$user?.displayName}

		<!-- <button on:click={async() => $events = await getUserEvents()}> caca </button> -->

		<EventTabs events={$events} bind:selection/>

		<div class='m-4'>
			<Scramble scrambleType={selection.event.scrambleType}/>
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