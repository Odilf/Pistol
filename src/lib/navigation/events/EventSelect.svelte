<script lang='ts'>
	import { selectable_events, database } from "$lib/storage/time_db";
	import { Tabs, Tab } from 'svelte-materialify'
	import EventManager from "$lib/navigation/events/EventManager.svelte";
	import { tick } from "svelte";
	
	let tab_value = $selectable_events.indexOf($database.events[$database.selected_event])
	if (tab_value === -1) tab_value = 0

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

	async function editEvent() {
		editing = true
		const temp_tab = tab_value
		await tick()
		tab_value = temp_tab
	}
	
</script>

<svelte:window on:keydown={handleKeydown} />

<Tabs centerActive bind:value={tab_value}>
	<div slot='tabs'>
		{#each $selectable_events as event}
		<Tab on:click={() => $database.selected_event = $database.events.indexOf(event)}>
			{event.name}
		</Tab>
		{/each}
		
		<Tab on:click={editEvent}> Edit events...</Tab>
	</div>
</Tabs>

<EventManager bind:active={editing} on:close={() => handleKeydown({code: 'ArrowLeft'})}/>

<style lang="scss">
	div {
		display: flex;
		justify-content: center;
	}
</style>