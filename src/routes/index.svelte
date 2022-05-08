<script lang='ts'>

	import EventTabs from "$lib/navigation/EventTabs.svelte";
	import Timer from "$lib/timing/Timer.svelte";
	import SolveList from "$lib/timing/SolveList.svelte";

	import { Solve, type Selection } from "$lib/data/architecture";
	import { addSolve, deleteSolve, events, getSolves as getDBSolves, updateSolvePenalty } from "$lib/data/database";

	import { fly } from 'svelte/transition';
	import { onMount } from "svelte";
	import Scrambler from "$lib/timing/Scrambler.svelte";
	import Header from "$lib/UI/misc/Header.svelte";
	import { holdKeyboardShorcuts } from "$lib/data/stores";
	// import { user } from "$lib/profile";
	import Session from "$lib/Session.svelte";
	import SolveCard from "$lib/UI/solves/SolveCard.svelte";

	let selection: Selection

	
</script>

<main class='absolute inset-0 flex flex-col justify-center items-center bg-primary overflow-scroll'>
	<Header />
	
	<EventTabs events={$events} bind:selection />
	
	<Session {selection} user={null}>
		
	</Session>

	<SolveCard solve={new Solve(0.69, "R U R' U'")} /> 
</main>