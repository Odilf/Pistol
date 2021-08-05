<svelte:window on:keydown={handleKeydown} on:keyup={handleKeyup}/>

<script>
	import { createEventDispatcher } from 'svelte';
	
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
			//TODO: #2 Add time to array
			// times_store.update(n => [...n, {id: n.length + 1, time: time, penalty: 0}])
			
		}
	}
	
	function handleKeyup(e) {
		
		//Released to start timer
		if (e.code === 'Space') {
			if (timerState === 'pressed') {
				dispatch('timerStart', { time: time });
				timerState = 'running'
				startTime = new Date()
				interval = setInterval(() => time = getTime(startTime, new Date()), 42) //Change here for updating timer refresh rate
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