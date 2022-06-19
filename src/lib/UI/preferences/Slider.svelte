<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import Reset from "../icons/Reset.svelte"
	
	export let value: number 
	export let range: [number, number]
	export let name: string = '' 
	export let ressetable = true
	export let step = 0
	export let strict = true

	export let snap: {
		marks: number[],
		strength?: number
	} | null = null

	const dispatch = createEventDispatcher<{ reset: null }>()

	$: totalRange = range[1] - range[0]

	// Clamp value between range
	$: if (strict) { value = Math.max(range[0], Math.min(value, range[1])) }

	function doSnap() {
		if (snap && snap.strength) {
			snap.marks.forEach(mark => {
				if (Math.abs(value - mark) < (snap?.strength || totalRange/20)) {
					value = mark
				}
			})
		}
	}

	let slider: HTMLDivElement
	$: rect = slider?.getBoundingClientRect()
	$: displacement = rect?.left + value/totalRange * rect?.width
	
</script>

<svelte:window on:resize={() => rect = slider.getBoundingClientRect()}/>

<div class='flex w-full items-center justify-center'>
	<slider class='p-2 bg-secondary rounded h-1 w-full relative hover:bg-tertiary transition' bind:this={slider}>
		<input type='range' class='absolute w-full inset-0 opacity-0 cursor-pointer' bind:value
		min={range[0]} max={range[1]} {step} {name}
		on:input={() => doSnap()}>
	</slider>

	<button id="sliderHead" class='p-2 bg-primary absolute shadow rounded h-10 border-2 border-secondary translate-x-[-50%] pointer-events-none
	clickable transition'
	style:left='{displacement}px'>
		{value}
	</button>

	

	
	
	{#if ressetable}
		<button class='m-2 ml-8 clickable transition h-8' on:click={() => value = null}>
			<Reset/>
		</button>
	{/if}
</div>

<style lang='postcss'>
	slider:hover + button {
		@apply scale-105;
	}

	slider:active + button {
		@apply scale-95 rotate-2 odd:-rotate-2;
	}
</style>