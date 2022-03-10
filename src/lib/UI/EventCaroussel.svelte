<script lang="ts">
	import type { Event, Session } from "$lib/data/architecture";
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher()
	
	export let events: Event[]
	export let selected = 0

	function sendClick(selected: number) {
		const event = events[selected]
		dispatch('change', {
			event, 
			session: event.sessions[0]
		})
	}

	$: sendClick(selected)

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowLeft') {
			if (selected > 0) selected -= 1
		}
		if (e.key === 'ArrowRight') {
			if (selected < events.length - 1) selected += 1
		}
	}
</script>

<svelte:window on:keydown={handleKeydown}/>

<div class='flex rounded p-2 bg-secondary text-primary shadow-xl w-fit mx-auto'>
	{#each events as event, i}
	<button class='p-2 rounded transition px-4 mx-1 clickable
	{selected === i ? 'bg-primary text-secondary shadow' : ''}'
	on:click={() => selected = i}>
		<div>
			{event.abbreviation}
		</div>
	</button>
	{/each}

	<button on:click={() => console.log("Editing")}> Edit </button>
</div>