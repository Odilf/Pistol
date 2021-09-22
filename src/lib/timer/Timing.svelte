<script lang="ts">
	import { fly } from 'svelte/transition'
	import TimeInput from '$lib/timer/TimeInput.svelte';
	import Timer from '$lib/timer/Timer.svelte';
	import { getSettingByName } from '$lib/settings'
	import { database, active_session, addSolve, active_event  } from '$lib/storage/database'
	import type { Solve } from '$lib/storage/database';
	import { onDestroy } from 'svelte';

	$: timer_type = getSettingByName('Input method')

	let scramble
	const unsubscribe = database.subscribe(() => scramble = active_session().scrambles[active_session().scrambles.length - 1])
	onDestroy(unsubscribe)

	async function submit(event) {
		
		let penalty: 0 | 2 | 'DNF' = 0
		if ('penalty' in event.detail) {
			penalty = event.detail.penalty
		}
		
		const solve: Solve = {
			time: event.detail.time,
			penalty: penalty,
			date: new Date(),
			scramble: await scramble,
			reconstruction: null,
		}
		addSolve(solve, active_event())
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

