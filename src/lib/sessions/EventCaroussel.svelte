<script lang="ts">
	import { TabGroup, TabList, Tab, TabPanel, TabPanels } from '@rgossiaux/svelte-headlessui'
	
	export let events: string[] = [
		'3x3',
		'2x2',
		'4x4',
		'OH',
	]

	let selected = 0

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowLeft') {
			if (selected > 0) selected -= 1
		}
		if (e.key === 'ArrowRight') {
			if (selected < events.length - 1) selected += 1
		}
	}
</script>

<svelte:window on:keydown={handleKeydown}/>

<div class='flex rounded p-2 bg-secondary text-primary'>
	{#each events as event, i}
	<button class='p-2 rounded transition px-4 mx-1
	{selected === i ? 'bg-primary text-secondary shadow' : ''}'
	on:click={() => selected = i}
	>
		{event}
	</button>
	{/each}

	<button on:click={() => console.log("Editing")}> Edit </button>
</div>