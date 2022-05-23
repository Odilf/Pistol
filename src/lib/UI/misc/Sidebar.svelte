<script lang="ts">
	import { clickOutside } from "$lib/utils";
	import { onDestroy } from "svelte";

	export let enabled = false
	export let toggleButton: HTMLElement = null

	$: toggleButton?.addEventListener('click', e => {
		e.preventDefault()
		enabled = !enabled
	})

	onDestroy(() => {
		toggleButton.onclick = null
	})
</script>

<div class='absolute bg-secondary h-full w-72 flex flex-col text-primary
-translate-x-full md:translate-x-0 {enabled ? 'translate-x-0' : ''} h-full transition'
use:clickOutside={() => enabled = false}>
	<slot name='menu'/>
</div>

<main class='translate-x-0 md:ml-72 {enabled ? 'translate-x-72' : ''} transition w-full'>
	<slot/>
</main>