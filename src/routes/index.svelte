<script lang='ts'>
	import EventCaroussel from "$lib/UI/EventCaroussel.svelte";
	import Timer from "$lib/timing/Timer.svelte";
	import SolveList from "$lib/timing/SolveList.svelte";

	import { Solve, Event, Session } from "$lib/data/architecture";
	import { user } from "$lib/user";
	import { addSolve, getSolves, solves } from "$lib/data/database";


	const events: Event[] = [
		new Event('3x3'),
		new Event('2x2'),
		new Event('6x6'),
	]

	let selectedEvent = 0
	
	// $: console.log($solves);
	
	// $: selectedEvent && getSolves(events[selectedEvent].sessions[0], events[selectedEvent])

	function handleChange(e: { detail: { event: Event; session: Session; }; }): void {
		console.log('Changing event or session');
		
		const selection = e.detail
		getSolves(selection.session, selection.event)
	}
</script>


<main class='w-full h-full max-h-full flex flex-col items-center justify-center'>
	<div class='flex-1 overflow-scroll'>
		<hr>
		User: {$user?.displayName}
		<EventCaroussel {events} on:change={handleChange}/>
	</div>
	<div class='overflow-scroll'>
		<Timer pressDelay={0} on:time={e => {
			const time = e.detail
			// console.log('Time is', time);
			const solve = new Solve(time, "R U R' U'")
			// solves = [new Solve(time, "R U R' U'"), ...solves]
			addSolve(solve, events[selectedEvent].sessions[0], events[selectedEvent])
		}}/>
	</div>
	<div class='flex-1 overflow-scroll'>
		<SolveList solves={$solves}/>
	</div>
</main>