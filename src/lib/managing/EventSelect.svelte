<script lang='ts'>
	import { database } from "$lib/storage/time_db";
	import { Tabs, Tab, Menu, List, ListItem, Button } from 'svelte-materialify'
	import { onMount } from 'svelte'

	//Get events and add a option for a custom one
	let selectable_events: String[] = [...$database.map(v => v.name), 'Add custom...']

	let event_id = 0
	$: selectable_sessions = $database[event_id].sessions.map(v => v.name)
	let session_id = selectable_events.map(() => 0)

</script>

<div class="caca">
	<Tabs centerActive bind:value={event_id}>
		<div slot='tabs'>
			{#each selectable_events as event }
				<Tab>{event}</Tab>
				<!-- <Tab on:click={() => session_id[event_id]=0}>{event}</Tab> -->
			{/each}
		</div>
	</Tabs>
</div>

Selected event is {$database[event_id].name}. Available sessions are: {selectable_sessions}

<div>
	<Menu hover>
		<div slot="activator">
			<Button>Session</Button>
		</div>
		<List>
			{#each selectable_sessions as session, i}
				<ListItem on:click={e => session_id[event_id] = i}>{session}</ListItem> 
			{/each}
		</List>
	</Menu>
</div>

Selected session is {$database[event_id].sessions[session_id[event_id]].name}