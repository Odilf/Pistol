<script lang='ts'>
	import type { Event } from '$lib/storage/database'
	import { get_random_scramble } from '$lib/scramble/scrambler';
	import { addSession } from '$lib/storage/database'
	import { Menu, List, ListItem, Button, Dialog, Card, CardTitle, CardText, CardActions } from 'svelte-materialify'

	export let event: Event
	export let size: 'x-small' | 'small' | 'default' | 'large' | 'x-large' = 'default'
	let adding_session: boolean
	let new_session_name: string

	$: active_session = event ? event.sessions[event.selected_session] : null

	function check_scrambles() {
		if (active_session && !active_session.scrambles) {
			active_session.scrambles.push(get_random_scramble(event))
		}
	}

	function handleClick() {
		adding_session = true
		check_scrambles()
	}

</script>

<Menu disabled={!event} >
	<div slot="activator">
		<Button {size} class='ma-2' disabled={!event}>{event ? active_session.name : ''}</Button>
	</div>

	<List>
		{#if event}
			{#each event.sessions as session, i}
				<ListItem on:click={() => event.selected_session = i}> {session.name} </ListItem> 
			{/each}
		{/if}
		<ListItem class='red darken-4' on:click={handleClick}> New session </ListItem>
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
			<Button color=red on:click={() => adding_session = false}> Cancel </Button>
			<Button color='blue justify-right' on:click={() => {
				event.sessions = [...event.sessions, {
					name: new_session_name,
					solves: [],
					scrambles: [],
				}]
				// addSession(new_session_name, event);
				adding_session = false;
				event.selected_session = event.sessions.length - 1
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
		outline: none;
	}
</style>