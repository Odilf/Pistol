<script lang='ts'>
	import type { Solve } from '$lib/storage/time_db'
	import { Card, CardText, CardActions, Button } from 'svelte-materialify'
	export let solve: Solve;

	let active: boolean;
	let open = () => active = true

	let penalty_name
	if (solve.penalty === 0) {
		penalty_name = 'None'
	} if (solve.penalty === 2) {
		penalty_name = '+2'
	} if (solve.penalty === 'DNF') {
		penalty_name = 'DNF'
	}

</script>

<div>
	<div class="d-flex justify-center mt-4 mb-4">
		<Card outlined style="max-width:300px;">
		  <div class="pl-4 pr-4 pt-3">
			  {#if solve.penalty !== 0}
				  
			  <span class="text-overline"> OVERLINE </span>
			  {/if}
			<br />
			<span class="text-h5 mb-2">{solve.time.toFixed(3)}</span>
			<br />
		  </div>
		</Card>
	  </div>
</div>

<style>
	div {
		cursor: pointer;
	}
</style>