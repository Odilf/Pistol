<script lang='ts'>
	import type { Event } from '$lib/storage/database'
	import { addSession } from '$lib/storage/database'
	import { Menu, List, ListItem, Button, Dialog, Card, CardTitle, CardText, CardActions } from 'svelte-materialify'

	export let event: Event
	let adding_session: boolean
	let new_session_name: string
</script>

<Menu disabled={!event} >
	<div slot="activator">
		<Button class='ma-2' disabled={!event}>{event ? event.sessions[event.selected_session].name : ''}</Button>
	</div>

	<List>
		{#if event}
			{#each event.sessions as session, i}
				<ListItem on:click={() => event.selected_session = i}> {session.name} </ListItem> 
			{/each}
		{/if}
		<ListItem class='red darken-4' on:click={() => adding_session = true}> New session </ListItem>
	</List>
</Menu>

<Dialog bind:active={adding_session}>
	<Card>
		<CardTitle>
			Enter session name
		</CardTitle>

		<CardText>
			<!-- svelte-ignore a11y-autofocus -->
			<input bind:value={new_session_name} autofocus/>
		</CardText>

		<CardActions>
			<Button color=red> Cancel </Button>
			<Button color='blue justify-right' on:click={() => {
				addSession(new_session_name, event);
				adding_session = false;
				event.selected_session = event.sessions.length
			}}> Done </Button>
		</CardActions>
	</Card>
</Dialog>

<style lang='scss'>
	div {
		flex-grow: 1;
		display: flex;
	}
	input {
		background-color: var(--secondary-color);
		color: whitesmoke;
		width: 80%;
		padding: 0.3em;
		font-size: 2em;
		border-radius: 5px;
	}
	input:focus {
		// background-color: var(--accent-color);
		outline:1000px solid white;
		outline: none;
	}
</style>