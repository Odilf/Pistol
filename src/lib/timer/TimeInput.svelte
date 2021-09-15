<svelte:window on:keydown={handleKeydown}/>

<script lang='ts'>
	import { getSettingByName } from '$lib/settings'
	import { addSolve, selection } from '$lib/storage/time_db'
	import type { Solve } from '$lib/storage/time_db'
	import { fade } from "svelte/transition";
	import '../../app.css'
	import TimeDisplay from './TimeDisplay.svelte';
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher();

	// $: time_format = getSettingByName('Time format')

	let value = ''

	let is_focused = false	

	$: time = makeTime(value).time
	$: penalty = makeTime(value).penalty
	

	let invalid = false

	
	function makeTime(str: string) {
		// const match = str.match(/^(\d{1,2}(?:[ :])?)?(\d{0,2}[ .,])?(\d{1,3})?$/)
		const match = str.match(/(\d{1,2}[: ](?=\d{1,2}[., ]))?(\d{1,2})([., ]\d{1,3})?(\+)?/)

		let minutes: number, seconds: number, decimals: number = 0
		let penalty: 0 | 2 | 'DNF' = 0		

		if (match) {
			//Seconds
			if (match[2]) {
				seconds = parseInt(match[2])
			} else { seconds = 0 }

			//Minutes
			if (match[1]) {
				if (match[1].length > 2) match[1] = match[1].substr(0, 2)
				minutes = parseInt(match[1])
			} else { minutes = 0}

			if (match[3]) {
				decimals = parseInt(match[3].substr(1)) / (10**match[3].substr(1).length)
			} else { decimals = 0 }

			if (match[4] && match[4] === '+') {
				penalty = 2
			}
		}

		const time = minutes * 60 + seconds + decimals
		return {time: time, penalty: penalty}
	}

	function handleKeydown(e) {
		if (is_focused && !e.key.match(/[^a-z]|../i)) {
			e.preventDefault()
			return
		}

		if (e.key === 'Enter') {
			dispatch('submit', {time: time, penalty: penalty})
			value = ''
		}
	}

</script>

<main>
	<input class:invalid type="text" transition:fade bind:value 
	on:focus={() => is_focused = true} on:blur={() => is_focused = false}>
	<p>Will be saved as 
		<div><TimeDisplay time={time} penalty={penalty} decimals={3}/></div>
	
	<!-- <TimeDisplay time={0.69}/> -->
</main>

<style lang='scss'>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		box-sizing: border-box;
	}
	input {
		background-color: var(--secondary-color);
		color: whitesmoke;
		width: 80%;
		text-align: center;
		font-size: 0.5em;
		border-radius: 20px;
	}
	input:focus {
		// background-color: var(--accent-color);
		outline:1000px solid white;
		border-left: 0.1em solid var(--accent-color);
		border-right: 0.1em solid var(--accent-color);
		outline: none;
	}
	p {
		font-size: 1rem;
		font-weight: 700;
		color: grey;

		display: flex;
	} 
	div {
		font-size: 4rem;
		font-weight: 400;
	}
	.invalid {
		background-color: red;
	}
</style>