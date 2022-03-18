<script lang="ts">
	import type { ScrambleType } from '$lib/data/architecture';
	import ScramblePreview from './ScramblePreview.svelte';

	export let scramble: string
	export let scrambleType: ScrambleType
	export let previewDelay = 800
	export let center = true

	$: moves = scramble?.split(' ') || ['']
	let hovering: number


	
	let unhoverTimeout: NodeJS.Timeout
	let previewTimeout: NodeJS.Timeout
	let showPreview = false

	function handleMouseenter(e: MouseEvent) {
		previewTimeout = setTimeout(() => showPreview = true, previewDelay)
		clearTimeout(unhoverTimeout)
	}

	function handleMouseleave(e: MouseEvent) {
		unhoverTimeout = setTimeout(() => hovering = undefined, 0)
		clearTimeout(previewTimeout)
		showPreview = false
	}
</script>

<div on:mouseleave={handleMouseleave}>
	<div class='relative flex flex-wrap w-fit max-w-screen-md font-light 
	{scramble.length > 120 ? 'text-[1em]' : 'text-[1.5em]'} cursor-pointer z-10
	{center ? 'mx-auto justify-center' : ''}'>
		{#each moves as move, i}
			<span id={(hovering === i) && 'hovering'} class='{hovering >= i ? 'text-blue-400' : ''} mx-[1.5px] transition' 
				on:mouseenter={e => { hovering = i; handleMouseenter(e)}}>
				{move}
			</span>
		{/each}
	</div>
	
	<ScramblePreview {showPreview} {hovering} {scramble} {scrambleType}/>
</div>