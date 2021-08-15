<script lang='ts'>
	import { selection, database, active_session } from '$lib/storage/time_db'
	import { Button, Dialog, List } from 'svelte-materialify'
	import Solve from './Solve.svelte'
	import { getSettingByName } from '$lib/settings'
import TimeDisplay from '$lib/timer/TimeDisplay.svelte'
import '../../app.css'

	//TODO: #34 Maybe optimize this for hundreds of thousands of solves
	// $: solves = $database[$selection.event].sessions[$selection.sessions[$selection.event]].solves
	$: solves = $active_session.solves

	let windowHeight: number;

	let active = false
	let active_solve

	$: decimals = parseInt(getSettingByName('Solve decimals'))
</script>

<svelte:window bind:innerHeight={windowHeight}/>

<body class="rounded-bl-xl">
	<List class="elevation-24 d-flex flex-column pb-0">
		{#if solves.length === 0}
			No solves yet <br>
			Start solving!
		{/if}
		{#each solves as solve }
			<div>	
				<Button style='flex-grow:1' class='rounded-0' on:click={() => active_solve = solve}>
					<TimeDisplay time={solve.time} small_decimals={false} penalty={solve.penalty}/>
				</Button>
				<Dialog active={active_solve === solve} on:outroend={() => active_solve = null}><Solve bind:solve/></Dialog>
			</div>
		{/each}
	</List>
</body>

<style lang='scss'>
	body {
		overflow: scroll;
		/* flex-shrink: 1; */
		width: 90%;
		/* TODO: #33 Make solves actually not go off screen according to parent size */
		height: 90%;
		padding: 1em;
		padding-top: 0em;
		background-color: var(--secondary-color);
	}
	div {
		margin-top: 0;
		padding-top: 0;
		/* background-color: aqua; */

		display: flex;
		justify-content: center;
		flex-grow: 1;
	}
	
</style>