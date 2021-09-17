<script lang='ts'>
	import { database, active_event, active_session } from "$lib/storage/time_db";
	import { Menu, List, ListItem, Button } from 'svelte-materialify'

	
</script>

<body>
	<!-- TODO: #30 Make hover on desktop but not require two clicks on mobile -->
	<Menu>
		<div slot="activator">
			<Button style="width:100%;">{$active_session.name}</Button>
		</div>
		<List>
			{#each $active_event.sessions as session, i}
				<ListItem on:click={() => $database.events[$database.selected_event].selected_session = i}>{session.name}</ListItem> 
			{/each}
		</List>
	</Menu>
</body>

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