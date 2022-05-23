<script lang="ts">
	import type { Event } from "$lib/data/architecture";
	import { createFirebaseStore } from "$lib/data/firebase-store";
	import { eventTypes } from "$lib/utils";

	const events = createFirebaseStore('Events', [] as Event[])

	const sections = [
		{ name: 'Cubes', accessor: 'NxN'},
		{ name: 'Other shapes', accessor: 'shapes'},
		{ name: '3x3 variations', accessor: 'variations3x3'},
		{ name: 'Quiet events', accessor: 'quiet'},
	]

	function toggleVisibility(event: Event) {
		$events[$events.findIndex(ge => ge.name === event.name)].options.hidden =
			!$events[$events.findIndex(ge => ge.name === event.name)].options.hidden
	}
	
</script>

<h1 class='text-5xl text-center font-light'> Select your main events </h1>

<main class='flex flex-wrap w-full justify-evenly my-4'>
	{#each sections as { name, accessor }}
		<div class='my-2 mx-8 flex flex-col items-center flex-1	'>
			<h2 class='text-3xl font-bold text-center mb-2'> {name} </h2>
			<ul class='flex flex-col items-center'>
				{#each $events.filter(event => eventTypes[accessor].includes(event.abbreviation)) as event}
					<li> 
						<button class='text-xl clickable transition p-2 bg-secondary text-primary rounded shadow my-2 font-bold
						{event.options.hidden && 'opacity-50'}'
						on:click={() => toggleVisibility(event)}> 
							{event.name} 
						</button> 
					</li>
				{/each}
			</ul>
		</div>
	{/each}
</main>