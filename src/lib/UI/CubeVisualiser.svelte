<script lang="ts">
	import { browser } from '$app/env';
	import { Alg } from 'cubing/alg';

	import { TwistyPlayer } from 'cubing/twisty'
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion'
	import { fade } from 'svelte/transition'
	
	let container: HTMLDivElement

	export let alg: string = ''
	export let move: number = null
	export let hintFacelets: 'floating' | 'none' | 'auto' = 'auto'
	// export let puzzle: string = '3x3'
	
	const twistyPlayer = browser && new TwistyPlayer({
		alg,
		// puzzle,
		background: 'none',
		controlPanel: 'none',
		hintFacelets
	})

	const caca = new Alg(alg)
	console.log(caca.units());

	// TODO: #99 Very much clunky. Surely there's a better way
	function getTimestamp(alg: string, moveNumber: number) {
		if (moveNumber == null) {
			return Infinity
		}
		const moves = alg.split(' ')
		let timestamp = 0
		for (const move of moves.slice(0, moveNumber + 1)) {
			if (move[1] == '2') timestamp += 1500
			else timestamp += 1000
		}

		return timestamp
	}
	

	const timestamp = spring(getTimestamp(alg, move), { stiffness: 0.1, damping: 0.8 })
	$: timestamp.set(getTimestamp(alg, move))

	$: twistyPlayer.alg = alg
	$: twistyPlayer && twistyPlayer.experimentalModel.timestampRequest.set($timestamp)

	onMount(() => container.appendChild(twistyPlayer))

</script>

<div bind:this={container} out:fade={{ duration: 100 }}/>