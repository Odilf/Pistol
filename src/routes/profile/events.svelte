<script lang="ts">
	import type { Event } from "$lib/data/architecture";
	import { createFirebaseStore } from "$lib/data/firebase-store";
	import EventManager from "$lib/profile/EventManager.svelte";
	import Overlay from "$lib/UI/basic/Overlay.svelte";
	import { eventTypes } from "$lib/utils";

	const events = createFirebaseStore('Events', [] as Event[])

	const sections = [
		{ name: 'Cubes (NxN)', accessor: 'NxN'},
		{ name: 'Other shapes', accessor: 'shapes'},
		{ name: '3x3 variations', accessor: 'variations3x3'},
		{ name: 'Quiet events', accessor: 'quiet'},
	]

	function toggleVisibility(event: Event) {
		$events[$events.findIndex(ge => ge.name === event.name)].options.hidden =
			!$events[$events.findIndex(ge => ge.name === event.name)].options.hidden
	}

	let editingEvent: Event = null
	function edit(event: Event) {
		editingEvent = event
	}
	
</script>

<h1 class='text-5xl text-center font-bold'> Select your main events </h1>

<main class='flex flex-wrap w-full justify-evenly my-4'>
	{#each sections as { name, accessor }}
		<div class='my-2 mx-8 flex flex-col items-center flex-1	'>
			<h2 class='text-3xl font-light text-center mb-2'> {name} </h2>
			<ul class='flex flex-col items-center'>
				{#each $events.filter(event => eventTypes[accessor].includes(event.abbreviation)) as event}
					<li class='flex items-center'> 
						<button class='text-xl clickable transition p-2 bg-secondary text-primary rounded shadow my-2 font-bold
						{event.options.hidden && 'opacity-50'}'
						on:click={() => toggleVisibility(event)}> 
							{event.name} 
						</button> 
						<button class='clickable transition p-2 ml-2 drop-shadow
						{event.options.hidden && 'opacity-50'}'
						on:click={() => edit(event)}> 
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}>
								<path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
							</svg>
						</button> 
					</li>
				{/each}
			</ul>
		</div>
	{/each}
</main>

<Overlay enabled={!!editingEvent}>
	<EventManager bind:event={$events[$events.indexOf(editingEvent)]}/>
</Overlay>