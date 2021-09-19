<script lang='ts'>
	import type { Event } from '$lib/storage/time_db'
	import { addSession } from '$lib/storage/time_db'
	import { Menu, List, ListItem, Button, Dialog } from 'svelte-materialify'

	export let event: Event
	let adding_session: boolean
	let new_session_name
</script>

<body>
	<Menu disabled={!event}>
		<div slot="activator">
			<Button style="width:100%;" disabled={!event}>{event ? event.sessions[event.selected_session].name : ''}</Button>
		</div>
			<List>
				{#if event}
					{#each event.sessions as session, i}
						<ListItem on:click={() => event.selected_session = i}>{session.name}</ListItem> 
					{/each}
				{/if}
				<ListItem class='red darken-4' on:click={() => adding_session = true}> New session </ListItem>
			</List>
		</Menu>
</body>

<Dialog bind:active={adding_session}>
	Enter session name
	<input bind:value={new_session_name}/>
	<Button on:click={() => {
		addSession(new_session_name, event);
		adding_session = false;
		event.selected_session = event.sessions.length - 1
	}}> Done </Button>
</Dialog>

<style lang='scss'>
	body {
		display: flex;
		flex-direction: column;
		padding: 1em;
		height: auto;
		width: 100%;
	}
	div {
		flex-grow: 1;
		display: flex;
	}
</style>