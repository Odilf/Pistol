<svelte:window on:keydown={handleKeydown} on:keyup={handleKeyup}/>

<script lang='ts'>
	import { createEventDispatcher } from 'svelte';
	import { addSolve, selection } from '$lib/storage/time_db'
	import type { Solve } from '$lib/storage/time_db'
	// import Solve from '$lib/managing/Solve.svelte';
	
	const dispatch = createEventDispatcher();
	
	let timerState = 'released'
	let time = 0
	let interval
	let startTime		
	
	function handleKeydown(e) {
		
		//Pressed to prepare timer
		if (timerState === 'released' && e.code === 'Space') { 
			dispatch('timerReady', { time: time });
			timerState = 'pressed'
			
		//Pressed to stop timer
		} else if (timerState === 'running') {
			time = getTime(startTime, new Date())
			dispatch('timerEnd', { time: time });
			
			timerState = 'released'
			clearInterval(interval)

			let solve: Solve = {time: time, penalty: 0, date: null, scramble: 'I h8 our l1f3', reconstruction: null}
			// $database[0].sessions[0].solves.push(solve)
			//TODO: #6 Is the selection store a good idea?
			addSolve(solve, $selection.event, $selection.sessions[$selection.event])
		}
	}
	
	function handleKeyup(e) {
		
		//Released to start timer
		if (e.code === 'Space') {
			if (timerState === 'pressed') {
				dispatch('timerStart', { time: time });
				timerState = 'running'
				startTime = new Date()
				//TODO: #5 Add option to change timer refresh rate
				interval = setInterval(() => time = getTime(startTime, new Date()), 42)
			}
		}
	}
	
	function getTime(start, end) {
		return (end - start) / 1000
	}
	
</script>

<div class="timer">
	<div class={timerState} >
		<!-- TODO: #1 Add optionally more decimals -->
		{time.toFixed(2)} 
	</div>

</div>

<head>
	<link rel="preconnect" href="https://fonts.gstatic.com">
	<link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@100&display=swap" rel="stylesheet">
</head>

<style>
	.timer {
		font-family: 'Roboto Mono', monospace;
		font-weight: 300;
		font-size: 15vw;

		cursor:default ;

		/* Text centering */
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.pressed {
			color: red; 
		}
		.released {
			color: whitesmoke; 
		}
		.running {
			color: lightblue; 
		}
</style>