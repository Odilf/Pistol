<script lang='ts'>
	import EventCaroussel from "$lib/sessions/EventCaroussel.svelte";
	import Timer from "$lib/timing/Timer.svelte";
	import SolveList from "$lib/timing/SolveList.svelte";

	import { Solve } from "$lib/database/architecture";
	import { user } from "$lib/firebase/user";

	let solves: Solve[] = []
</script>


<main class='w-full h-full flex flex-col items-center justify-center'>
	User: {$user?.displayName}
	<!-- <User/> -->

	<EventCaroussel/>
	<Timer pressDelay={300} on:time={e => {
		const time = e.detail
		console.log('Time is', time);
		solves = [new Solve(time, "R U R' U'"), ...solves]
	}}/>

	<SolveList {solves}/>
</main>