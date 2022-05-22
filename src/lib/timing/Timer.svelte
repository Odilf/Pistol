<script lang="ts">
	import { preferences } from "$lib/data/preferences";
	import { holdKeyboardShorcuts, isOverlayActive } from "$lib/data/stores";
	import TimeDisplay from "$lib/UI/solves/TimeDisplay.svelte"
	
	export let pressDelay: number = $preferences.pressDelay
	export let refreshRate: number = $preferences.refreshRate 
	export let stopTimerWith = $preferences.stopTimerWith
	let time = 0

	enum State {
		Released = "released",
		Pressed = "pressed",
		Ready = "ready",
		Running = "running",
		Finished = "finished"
	}

	let state: State = State.Released
	let stateTimeout: NodeJS.Timeout

	function press() {
		if (state === State.Released) {
			state = State.Pressed

			stateTimeout = setTimeout(() => {
				state = State.Ready;
				time = 0
			}, pressDelay);
		}

		if (state === State.Running) {
			state = State.Finished
			stopTimer()
		}
	}

	function release() {
		if (state === State.Pressed) {
			clearTimeout(stateTimeout)
			state = State.Released
		}

		if (state === State.Ready) {
			state = State.Running
			startTimer()
		}

		if (state === State.Finished) {
			state = State.Released
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if ($isOverlayActive || $holdKeyboardShorcuts) return
		if (e.key !== ' ') return
		e.preventDefault()
		
		press()
	}

	function handleKeyup(e: KeyboardEvent) {
		if ($isOverlayActive) return
		if (e.key !== ' ') return
		release()
	}

	let start: Date
	let end: Date
	let timerInterval: NodeJS.Timeout

	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher()

	function startTimer(): void {
		start = new Date()
		timerInterval = setInterval(() => time = (new Date().getTime() - start.getTime())/1000, refreshRate)
	}

	function stopTimer(): void {
		end = new Date()
		time = (end.getTime() - start.getTime())/1000
		clearInterval(timerInterval)
		dispatch('time', time)
	}

	function handelTouchstart() {
		press()
	}

	function handleTouchend() {
		release()
	}

</script>

<svelte:window on:keydown={handleKeydown} on:keyup={handleKeyup}/>

<div class="{state} pointer-none select-none text-[8em] md:text-[10em] transition-all duration-200 font-thin"
on:touchstart={handelTouchstart} on:touchend={handleTouchend}
>
		<TimeDisplay {time} decimalScalar={0.75}/>
</div>

<style lang='postcss'>
	.pressed {
		color: red;
	}
	.ready {
		color: darkblue;
	}
	.finished {
		color: wheat;
	}
</style>