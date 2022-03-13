<script lang="ts">
	import { spring } from 'svelte/motion'
	import type { ScrambleType } from '$lib/data/architecture';
	import CubeVisualiser from "$lib/UI/CubeVisualiser.svelte";
	import { cursorPosition } from '$lib/utils';

	export let scramble: string
	export let scrambleType: ScrambleType

	$: moves = scramble?.split(' ') || ['']
	let hovering: number

	let x = spring(0, { stiffness: 0.1, damping: 0.5 })
	let y = spring(0, { stiffness: 0.1, damping: 0.5 })

	let container: HTMLDivElement
	let cubeWrapper: HTMLDivElement

	function getRects() {
		cubeWrapperRect = cubeWrapper?.getBoundingClientRect()
	}

	$: cubeWrapperRect = cubeWrapper?.getBoundingClientRect()

	$: if (hovering != null) {
		$x = decimate($cursorPosition.x, 30) - cubeWrapperRect?.width/2
		$y = decimate($cursorPosition.y, 20)
	}

	function decimate(value: number, factor: number) {
		return Math.round(value / factor) * factor
	}

</script>

<svelte:window on:resize={getRects}/>

<div class='flex flex-wrap mx-auto justify-center w-fit max-w-screen-md font-light {scramble.length > 100 ? 'text-lg' : 'text-2xl'} cursor-pointer'
	on:mouseleave={() => hovering = undefined} bind:this={container}>
	{#each moves as move, i}
		<span class='{hovering >= i ? 'text-blue-400' : ''} mx-[1.5px] transition' on:mouseenter={() => hovering = i}>
			{move}
		</span>
	{/each}
	{#if hovering != null}
		<div class='absolute z-10 opacity-80 my-10' 
		style:left='{$x}px'
		style:top='{$y}px'
		bind:this={cubeWrapper}
		>
			<CubeVisualiser alg={scramble} move={hovering} {scrambleType}/>
		</div>	
	{/if}
</div>
