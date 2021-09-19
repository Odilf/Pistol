<script lang='ts'>
	import { Card, CardActions, Button, Divider, Menu, List, ListItem } from 'svelte-materialify'
	import { slide } from 'svelte/transition'
	import TimeDisplay from '$lib/timer/TimeDisplay.svelte';
	import type { Event, Solve } from '$lib/storage/time_db'
	import { database } from '$lib/storage/time_db'
	import SessionSelect from '$lib/navigation/SessionSelect.svelte';

	export let csSession: {name: string, solves: Solve[], scramble_type: string, event: Event }

	let active = false
</script>

<Card>
	<div class="d-flex align-center flex-column">
	Imported session "{csSession.name}" <br>

		<Menu>
		<div slot="activator">
			<Button> will go to event {csSession.event ? csSession.event.name : '...'}</Button>
		</div>
		<List>
			{#each $database.events as event}
				<ListItem on:click={() => csSession.event = event}>
					{event.name}
				</ListItem>
			{/each}
		</List>
		</Menu>

		<SessionSelect event={csSession.event}/>

		<!-- <Menu>
			<div slot="activator">
				<Button> in session {csSession ? csSession.event[csSession.event.selected_session] : ''}</Button>
			</div>
			<List>
				{#each csSession.event.sessions as session, i}
					<ListItem on:click={() => csSession.event.selected_session = i}>
						{session.name}
					</ListItem>
				{/each}
			</List>
		</Menu> -->
	</div>
	<br>

	<CardActions>
		<!-- <Button text>Button</Button> -->
		<Button size="small" on:click={() => active = !active}>
			Session times
		</Button>
	</CardActions>
		{#if active}
			<div transition:slide>
				<Divider />
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