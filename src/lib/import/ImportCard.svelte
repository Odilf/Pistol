<script lang='ts'>
	import { Card, CardActions, Button, Divider, Menu, List, ListItem, CardTitle } from 'svelte-materialify'
	import { slide } from 'svelte/transition'

	import type { csSession } from './importer';
	// import type { Event, Solve } from '$lib/storage/database'
	import { database } from '$lib/storage/database'

	import TimeDisplay from '$lib/timer/TimeDisplay.svelte';
	import SessionSelect from '$lib/navigation/SessionSelect.svelte';

	export let csSession: csSession

	let active = false
</script>

<Card class='pb-4'>
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

		<!-- <Button size="small" on:click={() => active = !active}>
			Session times
		</Button> -->
		
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

<style>
	h1 {
		font-size: 2em;
	}
</style>