<script lang='ts'>
	import { holdKeyboardShorcuts } from "$lib/data/stores";

	export let reconstructing = false
	export let value = ''
	
	$: if (reconstructing) {
		$holdKeyboardShorcuts = true
	} else {
		$holdKeyboardShorcuts = false
	}
</script>

<button class='clickable transition bg-primary text-secondary p-2 rounded shadow'
	on:click={() => reconstructing = !reconstructing}>
	{reconstructing ?  "Done" : "Add reconstrucion"}
</button>

{#if reconstructing}
	<input bind:value type='text' class='p-2 bg-primary text-secondary rounded w-full' 
	placeholder="Something like R U R' U'">
{/if}