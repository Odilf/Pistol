<script lang=ts>
	import { getSettingByName } from '$lib/settings'
	import '../../app.css'

	export let time: number = 0
	export let decimals: number = undefined
	export let small_decimals = true
	export let penalty: 0 | 2 | 'DNF' = 0

	function format_time(time: number, penalty: 0 | 2 | 'DNF') {
		if (penalty === 2) time += 2
		const date = new Date(time * 1000)
		const hours = Math.floor(time / 3600)
		const minutes = Math.floor(time / 60)
		const seconds = Math.floor(time)
		
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
		
		if (decimals === undefined && !minutes) {
			decimals = parseInt(getSettingByName('Decimals')) 
		}

		return whole
	}

	$: whole = format_time(time, penalty)
	$: small = small_decimals && getSettingByName('Small decimals')
	$: decimals_value = time.toFixed(decimals).substr(-decimals)

</script>

<main>
	<slot/>{#if $$slots.default}&nbsp;{/if}
	<div class="timer {penalty === 'DNF' ? 'DNF' : ''}">
		{whole}
		{#if decimals}
			<div class:small={small}>.{decimals_value}{#if penalty===2} + {/if}</div>
		{/if}
	</div>
</main>

<style lang='scss'>
	main {
		display: flex;
	}
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