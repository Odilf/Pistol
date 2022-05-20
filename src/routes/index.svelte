<script lang='ts'>
	import EventTabs from "$lib/navigation/EventTabs.svelte";

	import { defaultEvents, type Event } from "$lib/data/architecture";
	import Header from "$lib/UI/misc/Header.svelte";
	import Session from "$lib/Session.svelte";
	import { createFirebaseStore } from "$lib/data/database/store";

	let events = createFirebaseStore<Event[]>('Events', defaultEvents)
	
	let	selection = {
		event: $events[0],
		session: $events[0].sessions[0]
	}

	// $: console.log($events);
</script>

<main class='absolute inset-0 flex flex-col justify-center items-center bg-primary overflow-scroll'>
	<Header />
	
	<EventTabs events={$events} bind:selection />
	
	<Session {selection}/>

	<!-- <button on:click={() => $settings.refreshRate = Math.random()}>
		Change stuff!!!!111!1
	</button>
	<button on:click={() => $settings.decimals = Math.random()}>
		Change other!!!!111!1
	</button> -->
</main>