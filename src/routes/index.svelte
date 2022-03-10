<script lang='ts'>
	import EventCaroussel from "$lib/UI/EventCaroussel.svelte";
	import Timer from "$lib/timing/Timer.svelte";
	import SolveList from "$lib/timing/SolveList.svelte";

	import { Solve, Event, Session } from "$lib/data/architecture";
	import { user } from "$lib/user";
	import { addSolve, getSolves, getUserEvents } from "$lib/data/database";
	import { onMount } from "svelte";

	let selectedEvent = 0

	let events = [new Event('3x3')]

	onMount(() => {
		(async() => events = await getUserEvents())()
	})

	
	
	$: solves = getSolves(events[selectedEvent]?.sessions[0], events[selectedEvent], 12)

	function handleTime(time: number) {
		const solve = new Solve(time, "R U R' U'")
		addSolve(solve, events[selectedEvent]?.sessions[0], events[selectedEvent])
	}
</script>

<main class='w-full h-full max-h-full flex flex-col items-center justify-center'>
	<div class='flex-1 w-full flex-col items-center justify-center overflow-y-scroll'>>
		User: {$user?.displayName}
		<button on:click={async() => events = await getUserEvents()}> caca </button>
		<EventCaroussel {events} bind:selected={selectedEvent}/>
	</div>

	<div class='overflow-y-scroll'>
		<Timer pressDelay={300} on:time={e => handleTime(e.detail)}/>
	</div>

	<div class='flex-1 w-full flex-col items-center justify-center overflow-y-scroll'>
		<SolveList solves={$solves}/>
	</div>
</main>