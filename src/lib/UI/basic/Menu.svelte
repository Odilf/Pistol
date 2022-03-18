<script lang="ts">
import { createEventDispatcher } from "svelte";


	export let items: string[]
	export let selected: string = null

	selected = items && items[0]

	const dispatch = createEventDispatcher()

	function handleClick(e: MouseEvent) {
		dispatch('click', selected)
	}
</script>

<div class='flex flex-col my-4'>
	{#each items as item}
		<button class='rounded p-2 mx-4 my-1 font-light clickable transition'
		class:selected={selected === item}
		on:click={e => {
			selected = item
			handleClick(e)
		}}> {item} </button>
	{/each}	
</div>

<style lang='postcss'>
	.selected {
		@apply bg-primary/20;
	}
</style>