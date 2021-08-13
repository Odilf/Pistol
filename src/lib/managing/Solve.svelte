<script lang='ts'>
	import { Card, CardText, CardActions, Button, TextField } from "svelte-materialify";
	import CubeVisualizer from "$lib/managing/CubeVisualizer.svelte";
	import type { Solve } from '$lib/storage/time_db';

	export let solve: Solve;
	let dialog = false

	let penalty_name
	if (solve.penalty === 2) {
		penalty_name = '+2'
	} if (solve.penalty === 'DNF') {
		penalty_name = 'DNF'
	}

	let temp_reconstruction

	function handleKeydown(e) {
		if (e.key === 'Enter') {
			solve.reconstruction = temp_reconstruction
			temp_reconstruction = ''
		}
	}

	$: hasReconstruction = solve.reconstruction as unknown as boolean

</script>

<div>
	<div class="d-flex justify-center mt-4 mb-4">
		<Card style=height:fit-content>
			<CardText>
				{#if penalty_name}
					<div class='text-h4'>{penalty_name}</div>
				{/if}
			<div class="text--primary text-h2">{solve.time.toFixed(3)}</div>
			<div class="text--primary">
				Scramble: {solve.scramble} <br>
				{#if hasReconstruction}
					Reconstruction: {solve.reconstruction} <br>
				{/if}
				<!-- <hr> -->

				Solved on: {new Date(solve.date).toDateString()}
			</div>
			<CubeVisualizer {solve}/>
			
		</CardText>
		<CardActions>
			<!-- <Button disabled={hasReconstruction} text on:click={() => dialog = true}> Add reconstruction</Button> -->
			<Button disabled text on:click={() => dialog = true}> (Reconstructions coming soon!)</Button>
			{#if dialog}
				<TextField disabled={hasReconstruction} on:keydown={handleKeydown} bind:value={temp_reconstruction} placeholder="Reconstruction" solo color=red clearable/>
			{/if}
		</CardActions>
	</Card>
	</div>
</div>