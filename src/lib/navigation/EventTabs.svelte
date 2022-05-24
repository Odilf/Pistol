<script lang="ts">
	import { browser } from "$app/env";
	import type { Event, Selection } from "$lib/data/architecture";
import EventManager from "$lib/profile/EventManager.svelte";
import Overlay from "$lib/UI/basic/Overlay.svelte";
	import { isOverflown } from "$lib/utils/overflow";
	import { afterUpdate } from "svelte";
	import { writable } from "svelte-local-storage-store";
	
	export let events: Event[]
	export let selection: Selection = {
		event: events[0],
		session: events[0].sessions[0],
	}

	const selectedSessions = writable('sessionSelection', {})
	
	// Initialize if empty
	if (Object.keys($selectedSessions).length < events.length) {
		events.forEach(event => {
			$selectedSessions[event.abbreviation] = event.sessions[0]
		})
	}

	$: visibleEvents = events.filter(event => !event.options.hidden)

	let container: HTMLDivElement
	$: buttons = browser && container && container.children
	$: buttons && buttons.item(index)?.scrollIntoView({
		behavior: "smooth", 
		block: "center", 
		inline: "center"
	})

	function handleKeydown(e: KeyboardEvent) {
		if (e.altKey || e.shiftKey) {
			if (e.key === 'ArrowLeft') decrease()
			else if (e.key === 'ArrowRight') increase()
		}
	}

	$: index = visibleEvents.findIndex(event => event.name === selection.event.name)
	
	const decrease = () => { if (index > 0) { 
		selection.event = visibleEvents[index - 1] 
	} }
	const increase = () => { if (index < visibleEvents.length - 1) { 
		selection.event = visibleEvents[index + 1] 
	} }

	let overflowing = false
	$: afterUpdate(() => {
		overflowing = isOverflown(container)
	})

	let editingEvent = false
	function handleClick(event: Event) {
		if (selection.event !== event) {
			selection.event = event
		} else {
			editingEvent = true
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} on:resize={() => overflowing = isOverflown(container)}/>

<div class='flex items-center w-full'>

{#if overflowing}
<button class='clickable transition h-10 disabled:opacity-50' on:click={() => decrease()} disabled={selection.event === visibleEvents[0]}>
	<svg xmlns="http://www.w3.org/2000/svg" class="h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={4}>
		<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
	</svg>
</button>
{/if}

<div bind:this={container} class='flex rounded p-2 scrollbar-hide bg-secondary text-primary shadow box-content mx-auto overflow-x-scroll'>
	{#each visibleEvents as event}
		<button class='p-2 rounded transition px-4 mx-1 hover:scale-105
		{selection.event.name === event.name ? 'bg-primary text-secondary shadow' : ''} flex flex-col items-center justify-center'
		on:click={() => handleClick(event)}>
			<div class='font-bold text-lg'>
				{event.abbreviation}
			</div>
			{#if $selectedSessions[event.abbreviation] && $selectedSessions[event.abbreviation].name !== 'Main'}
				<div class='font-light'>
					{$selectedSessions[event.abbreviation].name}
				</div>
			{/if}
		</button>
	{/each}	
</div>

<Overlay bind:enabled={editingEvent}>
	<EventManager 
	bind:event={events[events.indexOf(selection.event)]} 
	bind:selectedSession={selection.session}
	/>
</Overlay>

{#if overflowing}
<button class='clickable transition h-10 disabled:opacity-50' on:click={() => increase()} disabled={selection.event === visibleEvents.at(-1)}>
	<svg xmlns="http://www.w3.org/2000/svg" class="h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={4}>
		<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
	</svg>
</button>
{/if}
</div>