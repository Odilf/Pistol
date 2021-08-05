<script>
	import { ListItem } from 'svelte-materialify'
	import { selection, database } from '$lib/storage/time_db'
	import Solve from './Solve.svelte'

	$: solves = $database[$selection.event].sessions[$selection.sessions[$selection.event]].solves.slice().reverse()
</script>

<div>
	{#each solves as solve}
		<Solve solve={solve}/> <br>
	{/each}
</div>

<style>
	div {
		overflow: scroll;
		height: 20em;
	}
</style>