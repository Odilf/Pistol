<script lang="ts">
import { browser } from "$app/env";

	import type { Event, Session } from "$lib/data/architecture";
	
	export let events: Event[]
	let selected = 0

	export let selection: { event: Event; session: Session; }
	$: selection = getSelection(selected, 0)

	$: buttons = browser && container && container.children
	// let container = browser && document.getElementById('container')
	let container: HTMLDivElement

	$: container && console.log(container)

	$: buttons && buttons.item(selected).scrollIntoView({behavior: "smooth", block: "center", inline: "center"})

	container && container.scrollTo(200, 0)
	
	// console.log(container.scrollLeft);
	

	function getSelection(selectedEvent: number, selectedSession: number) {
		const event = events[selectedEvent]
		const session = event.sessions[selectedSession]
		return { event, session }
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowLeft') decrease()
		else if (e.key === 'ArrowRight') increase()
		else return

		e.preventDefault()
	}

	function decrease() {
		if (selected > 0) selected -= 1
	}

	function increase() {
		if (selected < events.length - 1) selected += 1
	}
</script>

<svelte:window on:keydown={handleKeydown}/>

<button on:click={() => container.scrollLeft = 200 }> Caca </button>

<div class='flex items-center'>

<button class='clickable h-10' on:click={() => decrease()}>
	<svg xmlns="http://www.w3.org/2000/svg" class="h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={4}>
		<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
	</svg>
</button>

<div bind:this={container} class='flex rounded p-2 bg-secondary text-primary shadow-lg w-fit box-content m-3 max-w-full mx-auto overflow-x-scroll'>

	{#each events as event, i}
		<button class='p-2 rounded transition px-4 mx-1 clickable
		{selected === i ? 'bg-primary text-secondary shadow' : ''}'
		on:click={() => selected = i}>
			<div class='font-bold text-lg'>
				{event.abbreviation}
			</div>
		</button>
	{/each}	
</div>

<button class='clickable h-10' on:click={() => increase()}>
	<svg xmlns="http://www.w3.org/2000/svg" class="h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={4}>
		<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
	</svg>
</button>

</div>