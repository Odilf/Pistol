<script lang="ts">
	import type { Event, Session } from "$lib/data/architecture";
	
	export let events: Event[]
	let selected = 0

	export let selection: { event: Event; session: Session; }
	$: selection = getSelection(selected, 0)

	function getSelection(selectedEvent, selectedSession) {
		const event = events[selectedEvent]
		const session = event.sessions[selectedSession]
		return { event, session }
	}

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

<div class='flex rounded p-2 bg-secondary text-primary shadow-lg w-fit mx-auto max-w-full overflow-x-scroll'>
	{#each events as event, i}
	<button class='p-2 rounded transition px-4 mx-1 clickable
	{selected === i ? 'bg-primary text-secondary shadow' : ''}'
	on:click={() => selected = i}>
		<div class='font-bold text-lg'>
			{event.abbreviation}
		</div>
	</button>
	{/each}

	<button on:click={() => console.log("Editing")}> Edit </button>
</div>