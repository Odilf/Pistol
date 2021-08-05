<script lang='ts'>
	import type { Solve } from '$lib/storage/time_db'

	export let solve: Solve;
</script>

Id is {solve.id}, time is {solve.time.toFixed(2)}, date is {solve.date.getTime()}, scrmable is {solve.scramble}