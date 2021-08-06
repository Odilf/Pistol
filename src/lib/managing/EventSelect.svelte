<script lang='ts'>
	import { writable } from "svelte/store";
	import { active_event, active_session, selection, wca_events } from "$lib/storage/time_db";
	import { Tabs, Tab, Menu, List, ListItem, Button } from 'svelte-materialify'

	//Get events and add a option for a custom one
	//TODO: #4 Add custom events
	let selectable_events: String[] = [...wca_events, 'Add custom...']

	$: selectable_sessions = $active_event.sessions.map(v => v.name)
	
</script>

<div class="caca">
	<Tabs centerActive bind:value={$selection.event}>
		<div slot='tabs'>
			{#each selectable_events as event }
			<Tab>{event}</Tab>
			{/each}
		</div>
	</Tabs>
</div>

<!-- Selected event is {$active_event.name}. Available sessions are: {selectable_sessions}
Selected session is {$active_session.name} -->

<div>
	<Menu >
		<div slot="activator">
			<Button>{$active_session.name}</Button>
		</div>
		<List>
			{#each selectable_sessions as session, i}
				<ListItem on:click={() => $selection.sessions[$selection.event] = i}>{session}</ListItem> 
			{/each}
		</List>
	</Menu>
</div>
