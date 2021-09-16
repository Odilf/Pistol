<script lang='ts'>
	import { selection, selectable_events, database } from "$lib/storage/time_db";
	import { Tabs, Tab } from 'svelte-materialify'
	import EventManager from "$lib/navigation/events/EventManager.svelte";

	let tab_value: number

	let editing = false

	// Navigation with arrows
	function handleKeydown(e) {
		if (e.code === 'ArrowLeft') {
			(tab_value == 0) || (tab_value -= 1)
		}
		if (e.code === 'ArrowRight') {
			tab_value < $selectable_events.length - 1 && (tab_value += 1)
		}
	}

	function handleChange() {

		if (tab_value < $selectable_events.length) {
			console.log('caca');
			$selection.event = $database.indexOf($selectable_events[tab_value])
		} else {
			// It seems it updates the tab value after handling change :(
			tab_value = $selection.event
		}
	}

	function addCustomEvent() {
		editing = false
		editing = true
		console.log('adding custom');
	}
	
</script>

<svelte:window on:keydown={handleKeydown} />

<Tabs centerActive bind:value={tab_value} on:change={handleChange}>
	<div slot='tabs'>
		{#each $selectable_events as event }
			<Tab>{event.name}</Tab>
		{/each}

		<Tab on:click={addCustomEvent}> Edit events...</Tab>
	</div>
</Tabs>

<EventManager bind:active={editing}/>

<style lang="scss">
	div {
		display: flex;
		justify-content: center;
	}
</style>