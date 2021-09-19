<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { fly } from 'svelte/transition'
	import TimeInput from '$lib/timer/TimeInput.svelte';
	import Timer from '$lib/timer/Timer.svelte';
	import { getSettingByName } from '$lib/settings'
	import { addSolve } from '$lib/storage/time_db'
	import type { Solve } from '$lib/storage/time_db';

	$: timer_type = getSettingByName('Input method')

	function submit(event) {
		
		let penalty: 0 | 2 | 'DNF' = 0
		if ('penalty' in event.detail) {
			penalty = event.detail.penalty
		}
		
		// const scramble = $scrambles[$selection.event][$scrambles[$selection.event].length - 1]
		const scramble = 'caca'
		
		const solve: Solve = {
			time: event.detail.time,
			penalty: penalty,
			date: new Date(),
			scramble: scramble,
			reconstruction: null,
		}
		addSolve(solve)
	}
</script>

<main>
	{#if timer_type === 'Typing'}
	<div transition:fly={{ y: 200}}>
		<TimeInput on:submit={submit}/>
	</div>
	{:else}
	<div transition:fly={{ y: -200}}>
		<Timer bind:this={timer_type} on:timerEnd={submit}/>
	</div>
	{/if}
</main>

<style lang="scss">
	main {
		flex-grow: 1;
		cursor: default;
		width: 100%;

		display: flex;
		justify-content: center;
		align-items: center;
	}
	div {
		font-size: max(15vw, 15vh);
		font-weight: 100;
		width: 100%;
	}
</style>

