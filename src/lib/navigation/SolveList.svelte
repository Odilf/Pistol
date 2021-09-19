<script lang='ts'>
	import { active_session, database, deleteSolve } from '$lib/storage/database'
	import type { Solve as SolveType } from '$lib/storage/database'
	import Solve from './Solve.svelte'
	import { getSettingByName } from '$lib/settings'
	import TimeDisplay from '$lib/timer/TimeDisplay.svelte'
	
	import { Button, Dialog, List } from 'svelte-materialify'
	import { fly, fade } from 'svelte/transition'
	import { flip } from 'svelte/animate'
	import { derived, readable } from 'svelte/store'
	import '../../app.css'

	let truncated = false
	const solves = derived(database, db => {
		const solves = db.events[db.selected_event].sessions[db.events[db.selected_event].selected_session].solves
		if (solves.length > 100) truncated = true
		return solves.slice().reverse().slice(0, 100)
	})
	const decimals = getSettingByName("Solve Decimals")

	let active_solve: SolveType
	let show_solves = true
	let show_solve = false
</script>

<main>
	{#if show_solves}
	<body class="rounded-bl-xl" transition:fly={{ x: 69, duration: 500 }} >

		{#if $solves.length === 0}
			<div class='grey-text pt-8' transition:fly={{ x: 69, duration: 500 }}>
				No solves yet <br>
				Start solving!
			</div>
		{:else}

		<List class="d-flex flex-column pb-0">
			{#each $solves as solve, i (i)}
				<div animate:flip in:fly={{y: -20, duration: 800}} out:fade
					on:auxclick={() => deleteSolve(solve)}
					on:click={e => { e.altKey && deleteSolve(solve)}}
				>
					<Button style='flex-grow:1' class='elevation-2'
						on:click={() => {active_solve = solve; show_solve = true}}
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

	<Dialog bind:active={show_solve} on:outroend={() => show_solve = false} class=red>
		{#if active_solve}
			<Solve bind:solve={active_solve} transition={fly}/>
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