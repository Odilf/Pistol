<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { fly } from 'svelte/transition'
	import TimeInput from '$lib/timer/TimeInput.svelte';
	import Timer from '$lib/timer/Timer.svelte';
	import { getSettingByName } from '$lib/settings'
	import { addSolve, selection } from '$lib/storage/time_db'

	import { update_scramble } from '$lib/scramble/scrambler'

	$: timer_type = getSettingByName('Input method')

	function submit(event) {
		update_scramble($selection.event)
		addSolve(event.detail.solve, $selection.event, $selection.sessions[$selection.event])
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

		font-size: max(15vw, 15vh);
		font-weight: 100;
	}
	div {
		width: 100%;
	}
</style>

