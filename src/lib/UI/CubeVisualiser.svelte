<script lang="ts">
	// import { browser } from '$app/env';
	import type { ScrambleType } from '$lib/data/architecture';
	import { getPuzzleIDFromScrambleType } from '$lib/utils/cubingjsBridge';

	// import { TwistyPlayer,  } from 'cubing/twisty'
	import type { PuzzleID, TwistyPlayerConfig } from 'cubing/twisty'
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion'
	import { fade } from 'svelte/transition'
	import { browser } from '$app/env';
	
	let container: HTMLDivElement

	export let alg: string = ''
	export let move: number = null
	export let hintFacelets: 'floating' | 'none' | 'auto' = 'auto'

	export let puzzle: PuzzleID = null
	export let scrambleType: ScrambleType = '3x3'

	let twistyPlayer = null
	// const twistyPlayer = browser && new TwistyPlayer({
	// 	alg,
	// 	background: 'none',
	// 	controlPanel: 'none',
	// })

	async function getTwistyPlayer(settings: TwistyPlayerConfig) {
		const { TwistyPlayer } = await import('cubing/twisty')
		return new TwistyPlayer(settings)
	}

	if (browser) {
		twistyPlayer = getTwistyPlayer({
		alg,
		background: 'none',
		controlPanel: 'none',
		})
	}

	// TODO: #99 Very much clunky. Surely there's a better way
	function getTimestamp(alg: string, moveNumber: number) {
		const moves = alg.split(' ')
		if (moveNumber == null) moveNumber = moves.length

		let timestamp = 0
		for (const move of moves.slice(0, moveNumber + 1)) {
			if (move[move.length - 1] == '2') timestamp += 1500
			else timestamp += 1000
		}

		return timestamp
	}
	

	const timestamp = spring(getTimestamp(alg, move), { stiffness: 0.1, damping: 0.8 })
	$: $timestamp = getTimestamp(alg, move)
	
	$: twistyPlayer.alg = alg
	$: twistyPlayer && twistyPlayer.experimentalModel.timestampRequest.set($timestamp)

	$: twistyPlayer.hintFacelets = hintFacelets

	$: twistyPlayer.puzzle = puzzle || getPuzzleIDFromScrambleType(scrambleType)

	onMount(() => container.appendChild(twistyPlayer))

</script>

<div bind:this={container} out:fade={{ duration: 100 }}/>