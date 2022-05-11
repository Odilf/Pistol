<script lang="ts">
	import { browser } from "$app/env";
	import type { Event, Session } from "$lib/data/architecture";
	import { holdKeyboardShorcuts } from "$lib/data/stores";
	import { isOverflown } from "$lib/utils/overflow";
	import { afterUpdate } from "svelte";
	
	export let events: Event[]
	let selected = 0

	export let selection: { event: Event; session: Session; }
	$: selection = getSelection(selected, 0)

	let container: HTMLDivElement
	$: buttons = browser && container && container.children
	$: buttons && buttons.item(selected).scrollIntoView({
		behavior: "smooth", 
		block: "center", 
		inline: "center"
	})

	function getSelection(selectedEvent: number, selectedSession: number) {
		const event = events[selectedEvent]
		const session = event.sessions[selectedSession]
		return { event, session }
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.altKey || e.shiftKey) {
			if (e.key === 'ArrowLeft') decrease()
			else if (e.key === 'ArrowRight') increase()
		}

		// !$holdKeyboardShorcuts && e.preventDefault()
	}

	function decrease() {
		if (selected > 0) selected -= 1
	}

	function increase() {
		if (selected < events.length - 1) selected += 1
	}

	let overflowing = false
	$: afterUpdate(() => {
		overflowing = isOverflown(container)
	})
</script>

<svelte:window on:keydown={handleKeydown} on:resize={() => overflowing = isOverflown(container)}/>

<div class='flex items-center w-full'>

{#if overflowing}
<button class='clickable h-10' on:click={() => decrease()} disabled={container.scrollLeft === 0}>
	<svg xmlns="http://www.w3.org/2000/svg" class="h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={4}>
		<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
	</svg>
</button>
{/if}

<div bind:this={container} class='flex rounded p-2 scrollbar-hide bg-secondary text-primary shadow box-content mx-auto overflow-x-scroll'>
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

{#if overflowing}
<button class='clickable h-10' on:click={() => increase()}>
	<svg xmlns="http://www.w3.org/2000/svg" class="h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={4}>
		<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
	</svg>
</button>
{/if}
</div>