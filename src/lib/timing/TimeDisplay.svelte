<script lang="ts">
	import { snackbar } from "$lib/utils";

	export let time: number
	export let decimalScalar: number = 1

	$: decimals = (time % 1).toFixed(2).substring(2)

	function copyTime() {
		const text = time.toFixed(3)
		navigator.clipboard.writeText(text);
		snackbar(`Copied time to clipboard (${text}s)`)
	}
</script>

<div class='text-[1em] font-mono' on:dblclick={copyTime}>
	{Math.floor(time)}.<span style:font-size='{decimalScalar}em'>{decimals}</span>
</div>