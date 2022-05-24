<script lang="ts">
	import { preferences } from "$lib/data/preferences";
	import { holdKeyboardShorcuts, isOverlayActive } from "$lib/data/stores";
	import TimeDisplay from "$lib/UI/solves/TimeDisplay.svelte"
	
	export let pressDelay: number = $preferences.pressDelay
	export let refreshRate: number = $preferences.refreshRate 
	export let stopWith = $preferences.stopTimerWith
	let time = 0

	enum State {
		Idle = "idle", // Idle
		Pressed = "pressed", // After pressing space
		Ready = "ready", // After the press delay
		Running = "running", // After releasing space
		Finished = "finished" // After stopping timer but before releasing it again
	}

	let state: State = State.Idle
	let stateTimeout: NodeJS.Timeout

	function isValidKey(e: KeyboardEvent, state: State) {
		const canStop = stopWith === 'space' ? e.key === ' '
		: stopWith === 'alphanumeric' ? /^[a-z0-9]$/i.test(e.key) || e.key === ' '
		: stopWith === 'anything' ? true : console.error('what did i recieve??? check `<Timer/>`')

		if ([State.Running, State.Finished].includes(state)) {

			return canStop
		} else {
			return e.key === ' '
		}
	}

	function press() {
		if (state === State.Idle) {
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
			state = State.Idle
		}

		if (state === State.Ready) {
			state = State.Running
			startTimer()
		}

		if (state === State.Finished) {
			state = State.Idle
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if ($isOverlayActive || $holdKeyboardShorcuts) return
		if (!isValidKey(e, state)) return
		e.preventDefault()
		
		press()
	}

	function handleKeyup(e: KeyboardEvent) {
		if ($isOverlayActive) return
		if (!isValidKey(e, state)) return
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

<div class="{state} pointer-none select-none text-[8em] md:text-[10em] transition-all duration-200 font-thin w-full h-full
grid place-items-center"
on:touchstart={handelTouchstart} on:touchend={handleTouchend}
>
		<TimeDisplay {time} decimalScalar={$preferences.mainTimerDecimalScalar}/>
</div>

<style lang='postcss'>
	.pressed {
		color: red;
	}
	.ready {
		color: darkblue;
		transform: scale(1.02);
	}
	.finished {
		color: burlywood;
	}
</style>