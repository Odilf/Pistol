<script lang='ts'>
	import { active_session, deleteSolve } from '$lib/storage/time_db'
	import { Button, Dialog, List } from 'svelte-materialify'
	import Solve from './Solve.svelte'
	import { getSettingByName } from '$lib/settings'
	import TimeDisplay from '$lib/timer/TimeDisplay.svelte'

	import { fly, fade } from 'svelte/transition'
	import { flip } from 'svelte/animate'
	import '../../app.css'
import { loop_guard } from 'svelte/internal';

	//TODO: #34 Maybe optimize this for hundreds of thousands of solves
	$: solves = $active_session.solves.slice().reverse()
	$: decimals = getSettingByName("Solve Decimals")

	let windowHeight: number;

	// let active = false
	let active_solve
	let show_solves = true
</script>

<svelte:window bind:innerHeight={windowHeight}/>

<main>
	{#if show_solves}
	<body class="rounded-bl-xl" transition:fly={{ x: 69, duration: 500 }}>

		{#if solves.length === 0}
			<div class='grey-text pt-8'>
				No solves yet <br>
				Start solving!
			</div>
		{:else}

		<List class="d-flex flex-column pb-0">
			{#each solves as solve (solve.date) }
				<div animate:flip={{duration:200}} in:fly={{y: -20, duration: 800}} out:fade on:auxclick={() => deleteSolve(solve)}>	
					<Button style='flex-grow:1' class='elevation-24' 
						on:click={() => active_solve = solve} 
						
					>
						<TimeDisplay time={solve.time} small_decimals={false} penalty={solve.penalty} {decimals}/>
					</Button>
					<Dialog transition={fly} active={active_solve === solve} on:outroend={() => active_solve = null}><Solve bind:solve/></Dialog>
				</div>
			{/each}
		</List>

		{/if}
	</body>
	{/if}


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