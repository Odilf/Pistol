<script lang='ts'>
	import { selection, database } from '$lib/storage/time_db'
	import { Button, Dialog, List } from 'svelte-materialify'
	import Solve from './Solve.svelte'
	import { getSettingByName } from '$lib/settings'

	//TODO: #34 Maybe optimize this for hundreds of thousands of solves
	$: solves = $database[$selection.event].sessions[$selection.sessions[$selection.event]].solves

	let windowHeight: number;

	let active = false
	let active_solve

	// $: if (active_solve) { active_solve.reconstruction = 'L O S E R' }

	$: decimals = parseInt(getSettingByName('Solve decimals'))
</script>

<svelte:window bind:innerHeight={windowHeight}/>

<body>
	<List class="elevation-2" style="width:fit-content">
		{#each solves as solve }
			<div>
				<Button class='pd-8' on:click={() => {active = true; active_solve = solve}}>{solve.time.toFixed(decimals)}</Button>
			</div>
			{/each}
		</List>
	<Dialog bind:active><Solve bind:solve={active_solve}/></Dialog>
</body>

<style>
	body {
		overflow: scroll;
		flex-shrink: 1;
		/* TODO: #33 Make solves actually not go off screen according to parent size */
		height: 69vh;
	}
</style>