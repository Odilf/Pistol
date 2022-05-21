<script lang="ts">
	import { browser } from "$app/env";
	import type { Event, Session } from "$lib/data/architecture";
	import EventManager from "$lib/profile/EventManager.svelte";
	import Overlay from "$lib/UI/basic/Overlay.svelte";
	import { isOverflown } from "$lib/utils/overflow";
	import { afterUpdate } from "svelte";
	import { writable } from "svelte-local-storage-store";
	import { fly } from "svelte/transition";
	
	export let events: Event[]
	let selected = 0

	const selectedSessions = writable('sessionSelection', {})
	
	$: console.log($selectedSessions[editingEvent?.name]);
	
	// Initialize if empty
	if (Object.keys($selectedSessions).length < events.length) {
		events.forEach(event => {
			$selectedSessions[event.name] = event.sessions[0]
		})
	}
	
	export let selection: { event: Event; session: Session; }
	$: {
		const event = events[selected]
		const session = event.sessions[selectedSessions[event.name]] || event.sessions[0]
		selection = { event, session }
	}

	let container: HTMLDivElement
	$: buttons = browser && container && container.children
	$: buttons && buttons.item(selected).scrollIntoView({
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

	const decrease = () => (selected > 0) && (selected -= 1)
	const increase = () => (selected < events.length - 1) && (selected += 1)

	let overflowing = false
	$: afterUpdate(() => {
		overflowing = isOverflown(container)
	})

	let editingEvent = null
	function handleClick(index: number) {
		if (selected !== index) {
			selected = index
		} else {
			editingEvent = events[index]
		}
	}

	// For reactivity, apparently
	$: events[events.indexOf(editingEvent)] = editingEvent
</script>

<svelte:window on:keydown={handleKeydown} on:resize={() => overflowing = isOverflown(container)}/>

<div class='flex items-center w-full'>

{#if overflowing}
<button class='clickable transition h-10 disabled:opacity-50' on:click={() => decrease()} disabled={selected === 0}>
	<svg xmlns="http://www.w3.org/2000/svg" class="h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={4}>
		<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
	</svg>
</button>
{/if}

<div bind:this={container} class='flex rounded p-2 scrollbar-hide bg-secondary text-primary shadow box-content mx-auto overflow-x-scroll'>
	{#each events as event, i}
		<button class='p-2 rounded transition px-4 mx-1 hover:scale-105
		{selected === i ? 'bg-primary text-secondary shadow' : ''} flex flex-col items-center justify-center'
		on:click={() => handleClick(i)}>
			<div class='font-bold text-lg'>
				{event.abbreviation}
			</div>
			{#if $selectedSessions[event.name]?.name !== 'Main'}
				<div class='font-light'>
					{$selectedSessions[event.name].name}
				</div>
			{/if}
		</button>
	{/each}	
</div>

<Overlay enabled={editingEvent}>
	<EventManager bind:event={editingEvent} bind:selectedSession={$selectedSessions[editingEvent.name]}/>
</Overlay>

{#if overflowing}
<button class='clickable transition h-10 disabled:opacity-50' on:click={() => increase()} disabled={selected === events.length - 1}>
	<svg xmlns="http://www.w3.org/2000/svg" class="h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={4}>
		<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
	</svg>
</button>
{/if}
</div>