<script lang='ts'>
	import type { Solve } from '$lib/storage/time_db'

	export let solve: Solve;
</script>

<div>
	Time is {solve.time.toFixed(2)}, date is {solve.date.getDate()}th, {solve.date.getMonth()} {solve.date.getFullYear()}, scrmable is {solve.scramble}
</div>

<style>
	div {
		cursor: pointer;
	}
</style>