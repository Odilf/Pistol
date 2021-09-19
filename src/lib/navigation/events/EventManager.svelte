<script lang="ts">
	import { Dialog, Button, List, Menu, ListItem } from 'svelte-materialify'
	import { addEvent, database, wca_events } from '$lib/storage/database'
	import EventEditor from './EventEditor.svelte'

	export let active = false
	let adding_event = false
	let new_event_name: string
	let new_event_scramble: string
</script>

<Dialog bind:active={active} width={800} class='d-flex align-center flex-column'>
	<h1> Event manager</h1>
	<List class="elevation-2" style=width:50%>
		{#each $database.events as event (event.name)}
			<EventEditor bind:event={event}/>
		{/each}
	</List>
	
		<Button on:click={() => adding_event = true}> Add custom event </Button>

	<Button on:click={() => active = false}> Done </Button>
</Dialog>

<Dialog bind:active={adding_event}>
	Event name
	<input type=text bind:value={new_event_name}/>
		<Menu right>
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

	  <Button on:click={() => {
		  addEvent(new_event_name, new_event_scramble)
		  adding_event = false
	  }}> Done </Button>

	  Creating a {new_event_scramble} event named {new_event_name}
	<div style=height:50vh></div>
</Dialog>

<style>
	h1 {
		font-size: 3em;
		display: flex;
		justify-content: center;
	}
</style>