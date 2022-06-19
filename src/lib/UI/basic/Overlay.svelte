<script lang="ts">
	import { isOverlayActive } from "$lib/data/stores";
	import { createEventDispatcher } from "svelte";
	import { cubicInOut } from "svelte/easing";

	import { fade } from "svelte/transition";
	export let enabled = true
	export let fragile = true

	const dispatch = createEventDispatcher<{ close: null }>()

	function handleClick(e: MouseEvent) {
		if (fragile && e.target === e.currentTarget) {
			close()
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (fragile && e.key === 'Escape') {
			close()
		}
	}

	export function close() {
		enabled = false
		dispatch('close')
		$isOverlayActive = false
	}

	$: enabled && ($isOverlayActive = true)
	$: enabled || ($isOverlayActive = false)
</script>

<svelte:window on:keydown={handleKeydown}/>

{#if enabled}

<div class='fixed inset-0 bg-primary/50 backdrop-blur-lg flex flex-col justify-center items-center z-10'
class:enabled={'bg-black/0'}
transition:fade={{ duration: 300, easing: cubicInOut }}
on:click={handleClick}>
	<slot/>
</div>

{/if}