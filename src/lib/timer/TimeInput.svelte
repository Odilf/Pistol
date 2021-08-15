<svelte:window on:keydown={handleKeydown}/>

<script lang='ts'>
	import { getSettingByName } from '$lib/settings'
	import TimeDisplay from '$lib/timer/TimeDisplay.svelte'
import Time from './Time.svelte';

	let input: string = ''

	const keys = {
		special: ['.', '.', ' ', ':'],
		clear: ['Clear', 'Delete'],
		back: ['Backspace'],
		enter: ['Enter']
	}

	$: time_format = getSettingByName('Time format')

	let placeholder = ''
	let has_decimals = true

	$: if (time_format === 'ss.dd') { placeholder = '_.__'; has_decimals = true
	} else if ( time_format === 'mm:ss') { placeholder = '_:__'; has_decimals = false
	} else if (time_format === 'mm:ss.dd') { placeholder = '_:__.__'; has_decimals = true
	} else { console.warn('Uknown time format', time_format) }
	
	function handleKeydown(e) {
		if (!isNaN(parseInt(e.key))) {
			input += e.key
		}

		if (keys.special.includes(e.key) && input.length % 2 !== 0) {
			input = input.slice(0, -1) + '0' + input.slice(-1)
		}
		
		if (keys.enter.includes(e.key)) {
			console.log('bleep bloop appending time')
			input = ''
		}
		
		if (keys.clear.includes(e.key)) {
			input = ''
		}
		
		if (keys.back.includes(e.key)) {
			if (e.shiftKey) { input = ''}
			else { input = input.slice(0, -1) }
		}
	}
</script>

<TimeDisplay time={0.69}/>