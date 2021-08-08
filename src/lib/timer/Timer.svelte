<svelte:window on:keydown={handleKeydown} on:keyup={handleKeyup}/>

<script lang='ts'>
	import { createEventDispatcher } from 'svelte';
	import { addSolve, selection } from '$lib/storage/time_db'
	import type { Solve } from '$lib/storage/time_db'
	import RunningTime from './RunningTime.svelte';
	
	const dispatch = createEventDispatcher();
	
	let timerState = 'released'
	let time = 0
	let interval: ReturnType<typeof setInterval>
	let startTime: Date
	
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
	
	function getTime(start: Date, end: Date) {
		return (end.getTime() - start.getTime())/ 1000
	}
	
</script>


<body>
	<div class={timerState}>
		<RunningTime {time}/>
	</div>
</body>

<style lang='scss'>
	body {
		flex-grow: 1;
		cursor: default;
		width: 100%;

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