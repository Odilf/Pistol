<script lang='ts'>
	import { selection, database } from '$lib/storage/time_db'
	import { List } from 'svelte-materialify'
	import Solve from './Solve.svelte'
	import { getSettingByName } from '$lib/settings'

	//TODO: #34 Maybe optimize this for hundreds of thousands of solves
	$: solves = $database[$selection.event].sessions[$selection.sessions[$selection.event]].solves.slice().reverse()
	// $: id_solves = solves.map( (v, i) => { return {id: i, solve: v} } )

	let windowHeight: number;

	$: decimals = parseInt(getSettingByName('Solve decimals'))
</script>

<svelte:window bind:innerHeight={windowHeight}/>

<body>
	<List class="elevation-2" style="width:fit-content">
		{#each solves as solve }
			<div>
				<Solve solve={solve} {decimals}/>
			</div>
		{/each}
	</List>
</body>

<style>
	body {
		overflow: scroll;
		flex-shrink: 1;
		/* TODO: #33 Make solves actually not go off screen according to parent size */
		height: 69vh;
	}
</style>