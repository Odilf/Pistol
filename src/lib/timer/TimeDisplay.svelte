<script lang=ts>
	import { getSettingByName } from '$lib/settings'
	import '../../app.css'

	export let time: number
	export let decimals: number = undefined
	export let small_decimals = true
	export let penalty: 0 | 2 | 'DNF' = 0

	
	const small = small_decimals && getSettingByName('Small decimals')
	if (penalty === 2) time += 2
	
	const date = new Date(time * 1000)

	const hours = date.getHours() - 1
	const minutes = date.getMinutes()
	const seconds = date.getSeconds()
	
	if (decimals === undefined && !minutes) {
		decimals = parseInt(getSettingByName('Decimals')) 
	}
	const decimals_value = Math.round((time % 1) * 10**(decimals))
	
	let whole = ''
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