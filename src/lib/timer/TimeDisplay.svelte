<script lang=ts>
	import { getSettingByName } from '$lib/settings'
	import '../../app.css'

	export let time: number = 0
	export let decimals: number = undefined
	export let small_decimals = true
	export let penalty: 0 | 2 | 'DNF' = 0

	
	const small = small_decimals && getSettingByName('Small decimals')
	if (penalty === 2) time += 2
	
	// let date = new Date(time * 1000)
	$: date = new Date(time * 1000)

	$: hours = date.getHours() - 1
	$: minutes = date.getMinutes()
	$: seconds = date.getSeconds()
	
	if (decimals === undefined && !minutes) {
		decimals = parseInt(getSettingByName('Decimals')) 
	}
	$: decimals_value = time.toFixed(decimals).substr(-decimals)
	
	$: whole = format_wholes(hours, minutes, seconds)
	function format_wholes(hours: number, minutes: number, seconds: number): string {
		whole = ''
		if (hours) {
			hours < 10 && (whole += '0')
			whole += hours
			whole += ':'
		}
		if (whole || minutes) {
			whole && minutes < 10 && (whole += '0')
			whole += minutes
			whole += ':'
		}
		if (whole) {
			seconds < 10 && (whole += '0')
		}
		whole += seconds
	return whole
	}

</script>

<!-- {time} -->

<div class="timer {penalty === 'DNF' ? 'DNF' : ''}">
	{whole}
		{#if decimals}
			<div class:small={small}>.{decimals_value}{#if penalty===2} + {/if}</div>
		{/if}
	<!-- {/if} -->
</div>

<style lang='scss'>
	.timer {
		font-family: 'Roboto';
		font-weight: inherit;
		font-size: inherit;
		font-style: inherit;
		
		display: flex;
		align-items: baseline;
		.small {
			font-size: 0.69em;
		}
	}

	.DNF::before {
		content: 'DNF (';
	}
	.DNF::after {
		content: ')';
	}
</style>