<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import Reset from "../icons/Reset.svelte";

	interface Option {
		name: string,
		value: unknown
	}

	export let options: Option[]
	export let value: unknown = options[0].name
	export let ressetable = true

	const dispatch = createEventDispatcher<{ select: { value: unknown } }>()

	function click(option: Option) {
		value = option.value
		dispatch('select', { value })
	}
</script>

<menu class='flex w-full items-center'>
	{#each options as option}
		<button class='clickable transition-all p-2 mx-1 shadow rounded flex-1 font-bold h-full
		bg-primary text-secondary {value === option.value ? 'bg-secondary text-primary px-4' : 'opacity-70'}' 
		on:click={() => click(option)}>
			{option.name}
		</button>
	{/each}

	{#if ressetable}
		<button class="clickable transition m-2 ml-2 h-8" on:click={() => value = null}>
			<Reset/>
		</button>
	{/if}
</menu>