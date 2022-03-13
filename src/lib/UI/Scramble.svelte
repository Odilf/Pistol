<script lang="ts">
	import type { ScrambleType } from '$lib/data/architecture';
import ScramblePreview from './ScramblePreview.svelte';

	export let scramble: string
	export let scrambleType: ScrambleType
	export let previewDelay = 800

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
	<div class='relative flex flex-wrap mx-auto justify-center w-fit max-w-screen-md font-light {scramble.length > 100 ? 'text-lg' : 'text-2xl'} cursor-pointer z-10'>
		{#each moves as move, i}
			<span id={(hovering === i) && 'hovering'} class='{hovering >= i ? 'text-blue-400' : ''} mx-[1.5px] transition' 
				on:mouseenter={e => { hovering = i; handleMouseenter(e)}}>
				{move}
			</span>
		{/each}
	</div>
	
	<ScramblePreview {showPreview} {hovering} {scramble} {scrambleType}/>
</div>