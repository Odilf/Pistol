<script lang="ts">
import { createEventDispatcher } from "svelte";


	export let options: string[]
	export let value: string = options[0]
	export let ressetable = true
	export let name: string = null

	const dispatch = createEventDispatcher<{ select: { value: string } }>()

	function click(option: string) {
		value = option
		dispatch('select', { value })
	}
</script>

{#each options as option}
	<button class='clickable transition p-2 m-1 shadow rounded
	bg-primary text-secondary {value === option ? 'font-bold' : 'opacity-70'}' 
	on:click={() => click(option)}>
		{option}
	</button>
{/each}