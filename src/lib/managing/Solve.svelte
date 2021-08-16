<script lang='ts'>
	import { Card, CardText, CardActions, Button, TextField } from "svelte-materialify";
	import CubeVisualizer from "$lib/managing/CubeVisualizer.svelte";
	import { active_session, updateDatabase } from '$lib/storage/time_db';
	import type { Solve } from '$lib/storage/time_db'
	import TimeDisplay from "$lib/timer/TimeDisplay.svelte";
	import '../../app.css'
import SolveList from "./SolveList.svelte";

	export let solve: Solve;
	const penalties: Array<0 | 2 | 'DNF'> = [0, 2, 'DNF']
	
	// let dialog = false
	// let temp_reconstruction
	// function handleKeydown(e) {
	// 	if (e.key === 'Enter') {
	// 		solve.reconstruction = temp_reconstruction
	// 		temp_reconstruction = ''
	// 	}
	// }

	$: hasReconstruction = solve.reconstruction as unknown as boolean

	function deleteSolve(solve) {
		console.log('deleting solve');
		const i = $active_session.solves.indexOf(solve)
		$active_session.solves.splice(i)
		updateDatabase()
	}

</script>

<div>
	<div class="d-flex justify-center mt-4 mb-4">
		<Card style=height:fit-content>
			<CardText>
				{#if solve.penalty === 'DNF'}
				<div class='DNF'>{solve.time.toFixed(3)}</div>
				{/if} 
				
				<div class="text--primary text-h2">
					<header>
						<div class=time>
							<TimeDisplay time={solve.time} penalty={solve.penalty} decimals={3} small_decimals={false}/>
						</div>
						<Button fab on:click={() => deleteSolve(solve)}><img src='static/delete.svg' alt=delete/></Button>
					</header>
				</div>
				
				<div class="text--primary">
				Scramble: {solve.scramble} <br>
				
				{#if hasReconstruction}
				Reconstruction: {solve.reconstruction} <br>
				{/if}

				<div style=color:grey>
					Solved on: {new Date(solve.date).toDateString()}
				</div>
			</div>
			<CubeVisualizer {solve}/>
			
		</CardText>

		<CardActions class='d-flex ml-4'>
			{#each penalties as penalty_item}
				<Button disabled={penalty_item===solve.penalty} on:click={() => {solve.penalty = penalty_item; updateDatabase()}}>{penalty_item}</Button>
			{/each}
		</CardActions>

		<CardActions>
			<!-- TODO: #54 Add reconstruction support -->
			<!-- <Button disabled={hasReconstruction} text on:click={() => dialog = true}> Add reconstruction</Button> -->
			<!-- {#if dialog}
				<TextField disabled={hasReconstruction} on:keydown={handleKeydown} bind:value={temp_reconstruction} placeholder="Reconstruction" solo color=red clearable/>
			{/if} -->
			<Button disabled text> (Reconstructions coming soon!)</Button>
		</CardActions>
	</Card>
	</div>
</div>

<style>
	header {
		display: flex;
	}
	.time {
		flex-grow: 1;
	}
	.DNF {
		font-size: 2em;
		font-weight: 700;
		color: rgb(172, 101, 101);
	}
</style>