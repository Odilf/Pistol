<script lang='ts'>
	import { active_event, active_session, selection } from "$lib/storage/time_db";
	import { Menu, List, ListItem, Button } from 'svelte-materialify'

	$: selectable_sessions = $active_event.sessions.map(v => v.name)
	
</script>

<body>
	<!-- TODO: #30 Make hover on desktop but not require two clicks on mobile -->
	<Menu>
		<div slot="activator">
			<Button>{$active_session.name}</Button>
		</div>
		<List>
			{#each selectable_sessions as session, i}
				<ListItem on:click={() => $selection.sessions[$selection.event] = i}>{session}</ListItem> 
			{/each}
		</List>
	</Menu>
</body>

<style lang='scss'>
	body {
		padding: 1em;
		height: auto;
		width: auto;
	}
</style>