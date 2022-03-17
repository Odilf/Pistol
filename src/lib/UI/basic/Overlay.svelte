<!-- <script context='module'>
</script> -->

<script lang="ts">
import { isOverlayActive } from "$lib/data/stores";

import { createEventDispatcher } from "svelte";

	import { fade } from "svelte/transition";
	export let enabled = true
	export let fragile = true

	const dispatch = createEventDispatcher()

	function handleClick(e: MouseEvent) {
		if (fragile && e.target === e.currentTarget) {
			enabled = false
			dispatch('close')
		}
	}

	$: $isOverlayActive = enabled
</script>

{#if enabled}

<div class='absolute inset-0 bg-primary/20 backdrop-blur-lg flex flex-row justify-center items-center z-10'
class:enabled={'bg-black/0'}
transition:fade={{ duration: 200 }}
on:click={handleClick}>
	<slot/>
</div>

{/if}