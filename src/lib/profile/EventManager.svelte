<script lang="ts">
	import { defaultEvents, type Event } from "$lib/data/architecture";
	import { deleteEvent as deleteEventFromDB, addEvent } from "$lib/data/database";
	import { user } from ".";
	
	export let userEvents: Event[]

	function isActive(event: Event, events: Event[]) {
		return events?.some(userEvent => userEvent.name === event.name)
	}

	function handleClick(event: Event) {
		if (isActive(event, userEvents)) {
			deleteEventFromDB(event, defaultEvents, $user)
		} else {
			addEvent(event, defaultEvents, $user)
		}
	}

	// $: console.log(userEvents);
	

</script>

<div class='flex flex-col items-center'>
	<span class='text-xl'> Toggle your main events </span>

	{#each defaultEvents as event}
		<button class='bg-secondary p-2 m-2 rounded text-primary text-lg clickable'
		class:disabled={!isActive(event, userEvents)}
		on:click={() => handleClick(event)}>
			<span class='font-bold'> {event.name} </span>
			({event.abbreviation})
		</button>
	{/each}
</div>

<style lang="postcss">
	.disabled {
		@apply bg-black opacity-50;
	}
</style>