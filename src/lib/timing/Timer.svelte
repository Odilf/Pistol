<script lang="ts">
	import TimeDisplay from "./TimeDisplay.svelte"
	
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

	function handleKeydown(e: KeyboardEvent) {
		if (e.key !== " ") return

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

	function handleKeyup(e: KeyboardEvent) {
		if (e.key !== " ") return

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

</script>

<svelte:window on:keydown={handleKeydown} on:keyup={handleKeyup} />

<span class="{state} pointer-none select-none text-[10em] transition-all font-extralight">
	<TimeDisplay {time}/>
</span>

<style lang='postcss'>
	.pressed {
		color: red;
	}
	.ready {
		color: lightblue;
	}
	.finished {
		color: wheat;
	}
</style>