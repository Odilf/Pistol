<script lang='ts'>
	import EventTabs from "$lib/navigation/EventTabs.svelte";
	import Header from "$lib/UI/misc/Header.svelte";
	import Session from "$lib/Session.svelte";
	import { defaultEvents, type Event, type Selection } from "$lib/data/architecture";
	import { createFirebaseStore } from "$lib/data/firebase-store"
	import Welcome from "$lib/UI/misc/Welcome.svelte";

	const events = createFirebaseStore<Event[]>('Events', [...defaultEvents])
	console.log($events);

	let selection: Selection = {
		event: $events[0],
		session: $events[0].sessions[0]
	}

	let hasVisitedBefore: boolean
</script>

<svelte:head>
	<title> Pistol </title>
</svelte:head>

<main class='absolute inset-0 flex flex-col justify-center items-center bg-primary overflow-scroll'>
	{#if hasVisitedBefore}	
		<Header />
	
		<EventTabs events={$events} bind:selection/>
	
		<Session {selection}/>
	{:else}
		<Welcome bind:hasVisitedBefore bind:events={$events}/>
	{/if}
</main>