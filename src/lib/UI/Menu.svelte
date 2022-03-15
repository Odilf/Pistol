<script lang="ts">
	export let items: string[]
	export let selected: string = null

	selected = items && items[0]
</script>

<div class='flex flex-col my-4'>
	{#each items as item, i}
		<button class='rounded p-2 mx-4 my-1 font-bold clickable transition'
		class:selected={selected === item}
		on:click={() => selected = items[i]}> {item} </button>
	{/each}	
</div>

<style lang='postcss'>
	.selected {
		@apply bg-primary/20;
	}
</style>