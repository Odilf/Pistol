<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { getSettingByName } from '$lib/settings';
	import TimeDisplay from './TimeDisplay.svelte';

	const dispatch = createEventDispatcher();

	export let timerState = 'released';
	$: delay_time = parseFloat(getSettingByName('Timer delay'));
	let delay_interval: ReturnType<typeof setInterval>;
	let time = 0;
	let interval: ReturnType<typeof setInterval>;
	let startTime: Date;

	let refresh_rate: number;
	$: refresh_rate_option = getSettingByName('Refresh rate');
	$: switch (refresh_rate_option) {
		case '1ms':
			refresh_rate = 1;
			break;
		case '69ms':
			refresh_rate = 69;
			break;
		case '0.1s':
			refresh_rate = 100;
			break;
		case '0.5s':
			refresh_rate = 500;
			break;
		case '1s':
			refresh_rate = 1000;
			break;
		default:
			break;
	}

	let timer_stop_regex: RegExp
	$: stop_key_option = getSettingByName('Stop timer with')
	$: switch (stop_key_option) {
		case 'Any':
			timer_stop_regex = /.*/
			break;
		case 'Letters and space':
			timer_stop_regex = /^.$/
			break;
		case 'Only space':
			timer_stop_regex = /^ $/
			break;
		
		default:
			break;
	}

	function handleKeydown(e) {
		if (e.code === 'Space') {
			prepare()
		}
		if (timer_stop_regex.test(e.key)) {
			stop()
		}
	}

	function handleKeyup(e) {
		if (e.code === 'Space') {
			lift();
		}
	}

	function stop(cancel = false) {
		if (timerState === 'running') {
			time = getTime(startTime);

			timerState = 'pressed';
			clearInterval(interval);

			if (!cancel) {
				dispatch('timerEnd', { time: time });
			}
		}
	}

	function prepare() {
		if (timerState === 'released') {
			dispatch('timerReady', { time: time });
			timerState = 'pressed';
			if (delay_time === 0) {
				timerState = 'ready';
			} else {
				delay_interval = setInterval(() => (timerState = 'ready'), delay_time * 1000);
			}
		}
	}

	function lift() {
		if (timerState === 'ready') {
			dispatch('timerStart', { time: time });
			timerState = 'running';
			startTime = new Date();
			interval = setInterval(() => (time = getTime(startTime)), refresh_rate);
		} else {
			timerState = 'released';
		}
		clearInterval(delay_interval);
	}

	function getTime(start: Date, end = new Date()) {
		return (end.getTime() - start.getTime()) / 1000;
	}
</script>

<svelte:window on:keydown={handleKeydown} on:keyup={handleKeyup} />

<div class={timerState} on:touchstart={() => {prepare(); stop();}} on:touchend={() => lift()}>
	<TimeDisplay {time} />
</div>

<style lang="scss">
	.pressed {
		color: red;
	}
	.released {
		color: whitesmoke;
	}
	.running {
		color: lightblue;
	}
	.ready {
		color: greenyellow;
	}
	div {
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		font-weight: 100;

		-webkit-touch-callout: none; 
		user-select: none;
		-webkit-user-select: none; 
	}
</style>
