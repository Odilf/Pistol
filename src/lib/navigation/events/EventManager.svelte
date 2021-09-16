<script lang="ts">
	import { Dialog, Button, List } from 'svelte-materialify'
	import { database } from '$lib/storage/time_db'
	import EventEditor from './EventEditor.svelte'

	export let active = false
	let adding_event = false
</script>

<Dialog bind:active={active} width={800} class='d-flex align-center flex-column'>
	<h1> Event manager</h1>
	<List class="elevation-2" style=width:50%>
		{#each $database as event (event.name)}
			<EventEditor bind:event={event}/>
		{/each}
	</List>
	
	<Button on:click={() => adding_event = true}> Add custom event </Button>

	<Button on:click={() => active = false}> Done </Button>
</Dialog>

<Dialog bind:active={adding_event}>
	adding event woo
</Dialog>

<style>
	h1 {
		font-size: 3em;
		display: flex;
		justify-content: center;
	}
</style>