<script lang=ts>
	import { getSettingByName } from "$lib/settings";
	import TimeDisplay from '$lib/timer/TimeDisplay.svelte'
	export let time: number

	$: decimals = parseInt(getSettingByName('Decimals')) 

	$: seconds = Math.floor(time).toString()
	$: decimals_value = time.toFixed(decimals).substr(-decimals)
</script>

<TimeDisplay time={seconds} decimals={decimals_value}/>