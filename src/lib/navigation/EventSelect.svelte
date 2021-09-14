<script lang='ts'>
	import { selection, wca_events } from "$lib/storage/time_db";
	import { Tabs, Tab } from 'svelte-materialify'

	//Get events and add a option for a custom one
	//TODO: #4 Add custom events
	// let selectable_events: String[] = [...wca_events, 'Add custom...']
	let selectable_events: String[] = [...wca_events]

	// Navigation with arrows
	function handleKeydown(e) {
		if (e.code === 'ArrowLeft') {
			($selection.event == 0) || ($selection.event -= 1)
		}
		if (e.code === 'ArrowRight') {
			$selection.event < selectable_events.length - 1 && ($selection.event += 1)
		}
	}

</script>

<svelte:window on:keydown={handleKeydown} />

<Tabs centerActive bind:value={$selection.event}>
	<div slot='tabs'>
		{#each selectable_events as event }
		<Tab>{event}</Tab>
		{/each}
	</div>
</Tabs>