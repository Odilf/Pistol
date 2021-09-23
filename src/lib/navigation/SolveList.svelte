<script lang='ts'>
	import { active_event, active_session, database, deleteSolve } from '$lib/storage/database'
	import type { Solve as SolveType } from '$lib/storage/database'
	import { getSettingByName } from '$lib/settings'
	
	import Solve from './Solve.svelte'
	import TimeDisplay from '$lib/timer/TimeDisplay.svelte'
	
	import { Button, Dialog, List } from 'svelte-materialify'
	import { fly } from 'svelte/transition'
	import { flip } from 'svelte/animate'
	import { derived } from 'svelte/store'
	import '../../app.css'

	let uid = 0

	const list_length = 25
	let truncated = false
	const db_solves = derived(database, db => {
		const solves = db.events[db.selected_event].sessions[db.events[db.selected_event].selected_session].solves
		solves.length > list_length ? truncated = true : truncated = false 
		return solves.slice(-list_length).reverse()
	})

	let uid_solves: {solve: SolveType, uid: number}[]
	$: uid_solves = $db_solves.map(solve => {
			const index = uid_solves ? uid_solves.map(v => v.solve).indexOf(solve) : -1
			if (index === -1) {
				return {solve: solve, uid: uid}
			}
			return uid_solves[index]
		})

	let solves: SolveType[]
	$: solves = uid_solves.map(v => v.solve)

	const decimals = getSettingByName("Solve Decimals")

	let active_solve: SolveType
	let show_solves = true
	let showing_solve = false

	function handleKeydown(e): void {
		let index = solves.indexOf(active_solve)
		if (index === -1) return
		if (e.key === 'ArrowDown') index += 1
		if (e.key === 'ArrowUp')   index -= 1
		solves[index] && (active_solve = solves[index])
	}
</script>

<svelte:window on:keydown={handleKeydown}/>

<main>
	{#if show_solves}
	<body class="rounded-bl-xl" transition:fly={{ x: 69, duration: 500 }} >

		{#if solves.length === 0}
			<div class='grey-text pt-8' in:fly={{ x: 69, duration: 500 }}>
				No solves yet <br>
				Start solving!
			</div>
		{:else}

		<List class="d-flex flex-column pb-0">
				
			{#each solves as solve (solve.date)}
			<div animate:flip in:fly={{y: -20, duration: 800}}
				
				on:auxclick={() => deleteSolve(solve)}
				on:click={e => { e.altKey && deleteSolve(solve)}}
				>
				<Button style='flex-grow:1' class='elevation-2'
				on:click={() => { active_solve = solve; showing_solve = true }}
				>
				
				<TimeDisplay time={solve.time} small_decimals={false} penalty={solve.penalty} {decimals}/>
			</Button>
			
			</div>
			{/each}

			{#if truncated}
				<div class='d-inline-flex justify-center align-center mt-2'>
					More solves in the dashboard!
				</div>
			{/if}
		</List>

		{/if}
	</body>
	{/if}

	<Dialog bind:active={showing_solve} on:outroend={() => showing_solve = false} class=red>
		{#if active_solve}
			<Solve bind:solve={active_solve} puzzle={active_event().scramble}/>
		{/if}
	</Dialog>

	<footer>
		<Button class='red darken-2' on:click={() => show_solves=!show_solves}>
		{#if show_solves} <div>
			Hide solves
		</div>
		{:else} <div>
			Show solves
		</div> {/if}
		</Button>
	</footer>
</main>

<style lang='scss'>
	main {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
		align-items: center;
	}
	body {
		overflow-y: scroll;
		width: 90%;
		flex-grow: 9;
		padding: 1em;
		padding-top: 0em;
		background-color: var(--secondary-color);
	}
	div {
		margin-top: 0;
		padding-top: 0;

		display: flex;
		justify-content: center;
		flex-grow: 1;
	}
	footer {
		flex-grow: 10;
		padding: 1em;
	}

</style>