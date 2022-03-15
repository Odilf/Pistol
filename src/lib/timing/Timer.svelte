<script lang="ts">
	import TimeDisplay from "$lib/UI/TimeDisplay.svelte"
	
	export let pressDelay: number
	export let refreshRate: number = 69
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

	function down() {
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

	function up() {
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
		if (e.key !== " ") return
		e.preventDefault()

		down()
	}

	function handleKeyup(e: KeyboardEvent) {
		if (e.key !== " ") return
		up()
	}

	let start: Date
	let end: Date
	let timerInterval: NodeJS.Timeout

	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher()

	function startTimer(): void {
		start = new Date()
		timerInterval = setInterval(() => time += refreshRate/1000, refreshRate)
	}

	function stopTimer(): void {
		end = new Date()
		time = (end.getTime() - start.getTime())/1000
		clearInterval(timerInterval)
		dispatch('time', time)
	}

	function handelTouchstart() {
		down()
	}

	function handleTouchend() {
		up()
	}

</script>

<svelte:window on:keydown={handleKeydown} on:keyup={handleKeyup}/>

<div class="{state} pointer-none select-none text-[8em] md:text-[10em] transition-all duration-200 font-thin"
on:touchstart={handelTouchstart} on:touchend={handleTouchend}>
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