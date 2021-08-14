<script lang=ts>
	import { getSettingByName } from '$lib/settings'
	import '../../app.css'

	export let time: string
	export let decimals: string
	$: small = getSettingByName('Small decimals');
</script>

<div class="timer">
	<div class="seconds">{time}</div>
	{#if decimals}
	<div class:small={small}>.{decimals}</div>
	{/if}
</div>

<style lang='scss'>

	.timer {
		font-family: 'Roboto';
		font-weight: 100;
		font-size: 15vw;
		
		display: flex;
		align-items: baseline;
		.small {
			font-size: 0.69em;
		}
	}
</style>