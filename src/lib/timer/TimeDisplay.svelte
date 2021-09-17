<script lang=ts>
	import { getSettingByName } from '$lib/settings'
	import '../../app.css'

	export let time: number
	export let decimals: number = undefined
	export let small_decimals = true
	export let penalty: 0 | 2 | 'DNF' = 0

	$: small = small_decimals && getSettingByName('Small decimals')
	$: if (decimals === undefined) {
		decimals = parseInt(getSettingByName('Decimals')) 
	}

	let seconds: string
	$: if (penalty === 2) {
		seconds = Math.floor(time + 2).toString()
	} else {
		seconds = Math.floor(time).toString()
	}

	let decimals_value: string|number
	$: if (!time) {
		time = 0
		decimals_value = 0
	} else {
		decimals_value = time.toFixed(decimals).substr(-decimals) 
	}

</script>

<div class="timer">
	{#if penalty === 'DNF'} 
		DNF
	{:else}
	<div class="seconds">{seconds}</div>
		{#if decimals}
			<div class:small={small}>.{decimals_value}{#if penalty===2} + {/if}</div>
		{/if}
	{/if}
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
</style>