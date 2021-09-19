<script lang='ts'>
	import { selectable_events, database } from "$lib/storage/database";
	import { Tabs, Tab } from 'svelte-materialify'
	import EventManager from "$lib/navigation/events/EventManager.svelte";
	import { tick } from "svelte";
	
	$: tab_value = $selectable_events.indexOf($database.events[$database.selected_event])
	$: if (tab_value === -1) tab_value = 0

	let editing = false

	// Navigation with arrows
	function handleKeydown(e) {
		let move = 0
		if (e.code === 'ArrowLeft') {
			move = -1
		}
		if (e.code === 'ArrowRight') {
			move = 1
		}
		const index = $database.events.indexOf($selectable_events[tab_value + move])
		if (index !== -1) $database.selected_event = index
	}

	async function editEvent() {
		editing = true
	}

	function handleClick(event) {
		if ('button' in event) {
			editEvent()
		} else {
			$database.selected_event = $database.events.indexOf(event)
		}
	}
	
</script>

<svelte:window on:keydown={handleKeydown} />

<Tabs centerActive bind:value={tab_value}>
	<div slot='tabs'>
		{#each [...$selectable_events, {name: 'Edit events...', button: true}] as event}
			<Tab on:click={() => handleClick(event)}>
				{event.name}
			</Tab>
		{/each}
	</div>
</Tabs>

<EventManager bind:active={editing} on:close={() => handleKeydown({code: 'ArrowLeft'})}/>

<style lang="scss">
	div {
		display: flex;
		justify-content: center;
	}
</style>