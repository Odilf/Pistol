<script lang='ts'>
	import { Card, CardActions, Button, Tooltip, Menu, List, ListItem, CardTitle, Switch } from 'svelte-materialify'
	import { slide } from 'svelte/transition'

	import type { csSession } from './importer';
	// import type { Event, Solve } from '$lib/storage/database'
	import { database } from '$lib/storage/database'

	import TimeDisplay from '$lib/timer/TimeDisplay.svelte';
	import SessionSelect from '$lib/navigation/SessionSelect.svelte';

	export let csSession: csSession

	let active = false
</script>

<Card class='pb-4 elevation-0' style='background-color: inherit'>
	<CardTitle style='white-space:pre-wrap; word-break:break-word;' class='pa-0'>
	{csSession.scramble_type} session named "{csSession.name}" will go to
	</CardTitle>
	
	<CardActions>
		<Menu>
			<div slot="activator">
				<Button size=x-large>{csSession.event ? csSession.event.name : '...'}</Button>
			</div>
			<List>
				{#each $database.events as event}
				<ListItem on:click={() => csSession.event = {...event}}>
					{event.name}
				</ListItem>
				{/each}
			</List>
		</Menu>
		
		<SessionSelect size=x-large bind:event={csSession.event}/>

		<spacer class='flex-grow-1'/>

		<Tooltip top>
			<span slot='tip'>{csSession.import ? 'Importing' : 'Ignoring'} session</span>
			<Switch color=red bind:checked={csSession.import}/>
		</Tooltip>
		
	</CardActions>
		{#if active}
			<div transition:slide>
				<!-- <Divider /> -->
				{#if csSession.solves.length !== 0}
					{#each csSession.solves.length < 20 ? csSession.solves : csSession.solves.slice(-20, -1) as solve}
						<TimeDisplay time={solve.time} small_decimals={false} penalty={solve.penalty}/>
					{/each}
				{:else}
					No times in imported session
				{/if}
			</div>
		{/if}
</Card>