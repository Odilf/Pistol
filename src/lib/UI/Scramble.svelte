<script lang="ts">
	import { spring } from 'svelte/motion'
	import CubeVisualiser from "./CubeVisualiser.svelte";
	export let scramble: string

	$: moves = scramble?.split(' ') || ['']
	let hovering: number

	let x = spring(0, { stiffness: 0.1, damping: 0.5 })

	let container: HTMLDivElement
	let cubeWrapper: HTMLDivElement

	function getRects() {
		containerRect = container?.getBoundingClientRect()
		cubeWrapperRect = cubeWrapper?.getBoundingClientRect()
	}

	$: containerRect = container?.getBoundingClientRect()
	$: cubeWrapperRect = cubeWrapper?.getBoundingClientRect()

	$: if (hovering != null) {
		$x = containerRect?.width * hovering / moves.length
	}

	$: offset = containerRect?.x - cubeWrapperRect?.width/2
</script>

<svelte:window on:resize={getRects}/>

<div class='w-fit text-center mx-auto max-w-screen-md font-light {scramble.length > 100 ? 'text-lg' : 'text-2xl'} cursor-pointer'
	on:mouseleave={() => hovering = undefined} bind:this={container}>
	{#each moves as move, i}
		<span class='{hovering >= i ? 'text-blue-400' : ''} mx-[1.5px] rounded transition' on:mouseenter={() => hovering = i}>
			{move}
		</span>
	{/each}
	{#if hovering != null}
		<div class='absolute z-10 opacity-80' 
		style:left='{offset}px' style:transform='translateX({$x}px)'
		bind:this={cubeWrapper}
		>
			<CubeVisualiser alg={scramble} move={hovering}/>
		</div>	
	{/if}
</div>
