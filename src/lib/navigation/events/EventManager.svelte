<script lang="ts">
	import { Dialog, Button, List, Menu, ListItem, Card, CardText, CardTitle, CardActions } from 'svelte-materialify'
	import { addEvent, database, wca_events } from '$lib/storage/database'
	import EventEditor from './EventEditor.svelte'
	import SessionSelect from '$lib/navigation/SessionSelect.svelte'
// import About from 'src/routes/about.svelte';

	export let active = false
	let adding_event = false
	let new_event_name: string
	let new_event_scramble: string

	import '../../../app.css'
import { mdiHours24 } from '@mdi/js'
</script>

<Dialog bind:active class='d-flex align-center flex-column darken-4' >
	<Card style='width:95%'>
		<CardTitle>
			<h1> Event manager</h1>
		</CardTitle>
		<body>
			<CardText class='d-flex justify-center'>
				<List class="elevation-2">
					{#each $database.events as event (event.name)}
					<div class='d-flex align-center'>


						<Button fab size='small' on:click={() => event.hide = !event.hide}>
							{#if event.hide}
							<!-- Hide --> <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0zm0 0h24v24H0V0zm0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none"/><path d="M12 6c3.79 0 7.17 2.13 8.82 5.5-.59 1.22-1.42 2.27-2.41 3.12l1.41 1.41c1.39-1.23 2.49-2.77 3.18-4.53C21.27 7.11 17 4 12 4c-1.27 0-2.49.2-3.64.57l1.65 1.65C10.66 6.09 11.32 6 12 6zm-1.07 1.14L13 9.21c.57.25 1.03.71 1.28 1.28l2.07 2.07c.08-.34.14-.7.14-1.07C16.5 9.01 14.48 7 12 7c-.37 0-.72.05-1.07.14zM2.01 3.87l2.68 2.68C3.06 7.83 1.77 9.53 1 11.5 2.73 15.89 7 19 12 19c1.52 0 2.98-.29 4.32-.82l3.42 3.42 1.41-1.41L3.42 2.45 2.01 3.87zm7.5 7.5l2.61 2.61c-.04.01-.08.02-.12.02-1.38 0-2.5-1.12-2.5-2.5 0-.05.01-.08.01-.13zm-3.4-3.4l1.75 1.75c-.23.55-.36 1.15-.36 1.78 0 2.48 2.02 4.5 4.5 4.5.63 0 1.23-.13 1.77-.36l.98.98c-.88.24-1.8.38-2.75.38-3.79 0-7.17-2.13-8.82-5.5.7-1.43 1.72-2.61 2.93-3.53z"/></svg>
							{:else}
							<!-- Show --> <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 6c3.79 0 7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5c1.38 0 2.5 1.12 2.5 2.5S13.38 14 12 14s-2.5-1.12-2.5-2.5S10.62 9 12 9m0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7z"/></svg>
							{/if}
						</Button>

						<h2 class='pa-8 d-flex justify-center align-center flex-grow-1' style='font-size: 2em'>
							{event.name}
						</h2>

						<SessionSelect {event}/>
						<br>

						{#if !wca_events.includes(event.name) }
							<Button fab on:click={() => {
								database.update(db => {
									db.selected_event = 0
									db.events.splice(db.events.indexOf(event), 1)
									return db
								})}}> del </Button>
						{/if}
					</div>
					{/each}
				</List>
			</CardText>
		</body>

		
		<CardActions>
			<Button on:click={() => adding_event = true}> Create custom event </Button>
			
			<Button on:click={() => active = false}> Done </Button>
		</CardActions>
	</Card>
</Dialog>

<Dialog bind:active={adding_event}>
	<!-- <Card> -->
		<CardTitle>
			New session
		</CardTitle>
		<CardText>
			<div class='d-flex'>
				Event name
				<input type=text bind:value={new_event_name}/>
				
				<Menu>
					<div slot="activator">
						<Button>Scramble type</Button>
					</div>
					<List>
						{#each [...wca_events, 'Other'] as event}
						<ListItem on:click={() => new_event_scramble = event}>
							{event}
						</ListItem>
						{/each}
					</List>
				</Menu>
			</div>
			<br>
				
			Creating a {new_event_scramble} event named {new_event_name}
			<!-- <div style=height:50vh></div> -->
		</CardText>
		<CardActions>
			

			<Button disabled={!new_event_name || !new_event_scramble} on:click={() => {
				addEvent(new_event_name, new_event_scramble)
				adding_event = false
			}}> Done </Button>

			<!-- <div style='height:40vh'/> -->
		</CardActions>
	<!-- </Card> -->
</Dialog>

<style>
	h1 {
		font-size: 2em;
		padding: 0;
		display: flex;
		justify-content: center;
	}
	h2 {
		font-weight: 900;
	}
	body {
		background-color: inherit;
		overflow-y: scroll;
		/* height: 50vh; */
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