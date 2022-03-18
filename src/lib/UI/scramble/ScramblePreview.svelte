<script lang="ts">
	import CubeVisualiser from "$lib/UI/basic/CubeVisualiser.svelte";
	import { spring } from 'svelte/motion'
	import { pressedKeys } from '$lib/utils';
	import type { ScrambleType } from "$lib/data/architecture";

	export let hovering: number
	export let scramble: string
	export let scrambleType: ScrambleType
	export let showPreview: boolean

	let x = spring(0, { stiffness: 0.1, damping: 0.5 })
	let y = spring(0, { stiffness: 0.1, damping: 0.5 })

	let cubeWrapper: HTMLDivElement
	let moveElement: HTMLSpanElement
	let moveRect: DOMRect

	function getRects() {
		cubeWrapperRect = cubeWrapper?.getBoundingClientRect()
		moveRect = moveElement?.getBoundingClientRect()
	}

	$: cubeWrapperRect = cubeWrapper?.getBoundingClientRect()

	$: hovering && setTimeout(() => moveElement = document.getElementById('hovering'), 0)
	$: moveRect = moveElement?.getBoundingClientRect()

	$: if (hovering != null) {
		$x = Math.max(moveRect?.x - cubeWrapperRect?.width/2 | 0, 0)
		$y = moveRect?.y | 0
	}
</script>

<svelte:window on:resize={getRects}/>

{#if hovering != null && (pressedKeys.meta || showPreview)}
	<div class='fixed opacity-80 mt-2'
	style:left='{$x}px'
	style:top='{$y}px'>
		<CubeVisualiser bind:container={cubeWrapper} alg={scramble} move={hovering} {scrambleType}/>
	</div>	
{/if}