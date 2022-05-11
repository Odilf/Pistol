<script lang='ts'>
	import EventTabs from "$lib/navigation/EventTabs.svelte";

	import type { Selection } from "$lib/data/architecture";
	import { events } from "$lib/data/database";
	import Header from "$lib/UI/misc/Header.svelte";
	import Session from "$lib/Session.svelte";
	import { onMount } from "svelte";
	import { user } from "$lib/profile";

	let selection: Selection
	onMount(() => selection = {
		event: $events[0],
		session: $events[0].sessions[0]
	})

	$: console.log(selection);
</script>

<main class='absolute inset-0 flex flex-col justify-center items-center bg-primary overflow-scroll'>
	<Header />
	
	<EventTabs events={$events} bind:selection />
	
	<Session {selection} user={$user} />
</main>