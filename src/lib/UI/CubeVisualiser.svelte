<script lang="ts">
	import { TwistyPlayer } from 'cubing/twisty'
	import { onMount } from 'svelte';
	
	let container: HTMLDivElement

	const twistyPlayer = new TwistyPlayer({
		alg: "R U R' U'",
		background: 'none',
		controlPanel: 'none',
	})

	onMount(() => container.appendChild(twistyPlayer))

</script>

<div bind:this={container}/>