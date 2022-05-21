<script lang='ts'>
	import EventTabs from "$lib/navigation/EventTabs.svelte";
	import Header from "$lib/UI/misc/Header.svelte";
	import Session from "$lib/Session.svelte";
	import { defaultEvents, type Event } from "$lib/data/architecture";
	import { createFirebaseStore } from "$lib/data/firebase-store"

	
	const events = createFirebaseStore<Event[]>('Events', defaultEvents)

	let	selection = {
		event: $events[0],
		session: $events[0].sessions[0]
	}
</script>

<main class='absolute inset-0 flex flex-col justify-center items-center bg-primary overflow-scroll'>
	<Header />
	
	<EventTabs bind:events={$events} bind:selection />
	
	<Session {selection}/>
</main>