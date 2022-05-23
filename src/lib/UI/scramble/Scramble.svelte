<script lang="ts">
	import type { ScrambleType } from '$lib/data/architecture';
	import { inferTypeFromAlg } from '$lib/scramble/inferer';
	import { mod } from '$lib/utils';
	import ScramblePreview from './ScramblePreview.svelte';

	export let scramble: string
	export let scrambleType: ScrambleType = null
	export let previewDelay = 800
	export let disablePreview = false
	export let center = true

	$: if (!scrambleType) {
		scrambleType = inferTypeFromAlg(scramble)
	}

	$: moves = scramble?.split(' ') || ['']
	let hovering: number
	
	let unhoverTimeout: NodeJS.Timeout
	let previewTimeout: NodeJS.Timeout
	let showPreview = false

	function handleMouseenter(_: MouseEvent) {
		if (disablePreview) return
		previewTimeout = setTimeout(() => showPreview = true, previewDelay)
		clearTimeout(unhoverTimeout)
	}

	function handleMouseleave(_: MouseEvent) {
		unhoverTimeout = setTimeout(() => hovering = undefined, 0)
		clearTimeout(previewTimeout)
		showPreview = false
	}

	function handleKeydown(e: KeyboardEvent) {
		if (hovering == null) return 

		if (e.key === 'ArrowLeft') {
			hovering = mod(hovering - 1, moves.length)
		}

		if (e.key === 'ArrowRight') {
			hovering = mod(hovering + 1, moves.length)
		}
	}
</script>

<svelte:window on:keydown={handleKeydown}/>

<div on:mouseleave={handleMouseleave} class='relative z-0 max-w-md'>
	<div class='flex flex-wrap font-light
	{scramble.length > 120 ? 'text-[1em]' : 'text-[1.5em]'} cursor-pointer
	{center ? 'mx-auto justify-center' : ''}'>
		{#each moves as move, i}
			<span id={(hovering === i) && 'hovering'} class='{hovering >= i ? 'text-tertiary' : ''} mx-[1.5px] transition z-10' 
				on:mouseenter={e => { hovering = i; handleMouseenter(e)}}>
				{move}
			</span>
		{/each}
	</div>
	
	<ScramblePreview {showPreview} {hovering} {scramble} {scrambleType}/>
</div>