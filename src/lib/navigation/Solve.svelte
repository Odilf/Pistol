<script lang='ts'>
	import CubeVisualizer from "$lib/navigation/CubeVisualizer.svelte"
	import TimeDisplay from "$lib/timer/TimeDisplay.svelte"
	
	import { database, deleteSolve } from '$lib/storage/database'
	import type { Solve } from '$lib/storage/database'

	import { Card, CardText, CardActions, Button, TextField } from "svelte-materialify"
	import '../../app.css'

	export let solve: Solve
	export let puzzle: string
	
	const penalties: Array<0 | 2 | 'DNF'> = [0, 2, 'DNF']

	let reconstruction_dialog = false

</script>

	<Card style='height:fit-content width:80%'>
		<CardText class='pa-4'>
			
			<div class="text--primary text-h2">
				<header>
					<div class='time {solve.penalty === 'DNF' ? 'red-text darken-4' : ''}'>
						<TimeDisplay time={solve.time} penalty={solve.penalty} decimals={3} small_decimals={false}/>
					</div>
					<Button size=small class='red' fab on:click={() => deleteSolve(solve)}>
						<!-- Delete icon svg -->
						<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg>
					</Button>
				</header>
			</div>
			
			<div class="text--primary">
			Scramble: {solve.scramble} <br>
			
			{#if solve.reconstruction}
				Reconstruction: {solve.reconstruction} <br>
			{/if}

			<div style=color:grey>
				Solved on: {new Date(solve.date).toDateString()}
				{#if solve.imported}
					<br>
					Imported from {solve.imported}
				{/if}
			</div>
		</div>
		<CubeVisualizer {solve} {puzzle}/>
		
	</CardText>

	<CardActions class='d-flex ml-4'>
		{#each penalties as penalty_item}
			<Button class={penalty_item===solve.penalty && 'red'} on:click={() => {solve.penalty = penalty_item; database.update(db => db)}}>{penalty_item}</Button>
		{/each}
	</CardActions>

	<CardActions>
		{#if !reconstruction_dialog}
			<Button text on:click={() => reconstruction_dialog = true}> {#if solve.reconstruction} Change reconstruction {:else} Add reconstruction {/if}</Button>
		{:else}
			<TextField bind:value={solve.reconstruction} placeholder="Reconstruction" color=red clearable/>
			<Button fab size='small' class='ml-2' on:click={() => reconstruction_dialog = false}>
				<!-- Check svg -->
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="whitesmoke"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
			</Button>
		{/if}
	</CardActions>
</Card>

<style>
	header {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.time {
		flex-grow: 1;
	}
</style>