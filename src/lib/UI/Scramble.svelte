<script lang="ts">
	import Hoverable from "$lib/utils/Hoverable.svelte";
	import CubeVisualiser from "./CubeVisualiser.svelte";
	export let scramble: string

	$: moves = scramble?.split(' ') || ['']

	$: partialScramble = moves.slice(0, hovering).join(' ')

	let hovering: number
</script>

{hovering}
<div class='w-fit text-center mx-auto max-w-screen-md font-light {scramble.length > 100 ? 'text-lg' : 'text-2xl'} cursor-pointer'
	on:mouseleave={() => hovering = undefined}>
	{#each moves as move, i}
		<span class='{hovering >= i ? 'bg-slate-400' : ''} px-[1px]' on:mouseenter={() => hovering = i}>
			{move}
		</span>
	{/each}

	{#if hovering != null}
		<div class='absolute z-10'>
			<CubeVisualiser alg={partialScramble}/>
		</div>	
	{/if}
</div>