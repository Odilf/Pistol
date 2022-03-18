<script lang="ts">
	import { clickOutside } from "$lib/utils";
	import { fly } from "svelte/transition";
	import Menu from "./Menu.svelte";

	export let items: string[]
	export let selected: string = items && items[0]
	export let active = false

	let button: HTMLButtonElement
	$: buttonRect = button?.getBoundingClientRect()
</script>

<div class='relative'>
	<button class='bg-primary text-secondary p-2 rounded clickable' on:click={() => active = !active} bind:this={button}>
		{selected}
	</button>

	{#if active}
		<div class='bg-secondary rounded shadow fixed z-10' use:clickOutside={() => active = false}
		transition:fly={{ y: 10, duration: 300 }}
		style:bottom={buttonRect.bottom}
		>
			<Menu {items} bind:selected on:click/>
		</div>
	{/if}
</div>