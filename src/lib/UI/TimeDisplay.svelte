<script lang="ts">
	import { snackbar } from "$lib/utils";

	export let time: number
	export let decimalScalar: number = 1
	export let numberOfDecimals: number = null
	$: realDecimals = numberOfDecimals | (time > 3600 ? 0 : 2)
	
	// $: realDecimals = 2

	$: decimals = (time % 1).toFixed(realDecimals).substring(2, 2 + realDecimals)
	$: seconds = Math.floor(time)

	function copyTime() {
		const text = time.toFixed(3)
		navigator.clipboard.writeText(text);
		snackbar(`Copied time to clipboard (${text}s)`)
	}

	function formatSeconds(seconds: number) {
		const hours = Math.floor(seconds / 3600)
		const minutes = Math.floor(seconds % 3600 / 60)
		seconds = seconds % 60

		if (hours) {
			return `${hours}:${addLead0(minutes)}:${addLead0(seconds)}`
		} else if (minutes) {
			return `${minutes}:${addLead0(seconds)}`
		} else {
			return seconds.toString()
		}
	}

	function addLead0(time: number) {
		return time < 10 ? `0${time}` : time.toString()
	}
</script>

<span class='text-[1em] font-mono' on:dblclick={copyTime}>
	{#if realDecimals}
		{formatSeconds(seconds)}.<span style:font-size='{decimalScalar}em'>{decimals}</span>
	{:else}
		{formatSeconds(seconds)}
	{/if}
</span>