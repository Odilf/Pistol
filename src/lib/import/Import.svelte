<script lang="ts">
	import { Dialog, Overlay, Button, Divider, Card, CardText, CardActions, CardTitle } from 'svelte-materialify'

	import type { csSession } from './importer'
	import { parseImport, finishImport } from './importer';
	import ImportCard from './ImportCard.svelte'

	export let isDragging = false

	let importing = false
	let csSessions: csSession[]

	async function dropHandler(e) {
		isDragging = false
		
		if (!e.dataTransfer.items) return
		
		if (e.dataTransfer.items.length > 1) {
			console.error('More than one file');
			return
		} 

		if (e.dataTransfer.items[0].kind !== 'file') {
			console.error('File is not a file (xd)');
			return
		}

		const cstimer = await e.dataTransfer.items[0].getAsFile().text()
		csSessions = parseImport(cstimer)
		importing = true
	}
</script>

{#if isDragging}
	<div on:drop|preventDefault={dropHandler} on:dragover|preventDefault on:mouseleave={() => isDragging = false}>
		<Overlay active={isDragging}> Release to import file </Overlay>
	</div>
{/if}

<Dialog bind:active={importing} persistent width='fit-content' class='d-flex flex-column'>

	<CardTitle>
		Importer
	</CardTitle>
	<CardText class='d-flex flex-column flex-shrink-1' style='max-height: 100%; overflow-y: scroll'>

		{#each csSessions as csSession}
		<ImportCard bind:csSession={csSession}/>
		<!-- <Divider class=white/> -->
		<!-- <br> -->
		{/each}
	</CardText>
	
	<CardActions>
		<Button class='red-text' on:click={() => importing = false}> Cancel </Button>
		
		<Button on:click={() => {
			finishImport(csSessions)
			importing = false
		}} class='blue-text text-lighten-2'
		disabled={!csSessions.every(v => !!v.event)}
		> Done </Button>
	</CardActions>

</Dialog>

<style lang="scss">
	div {
		width: 100vw;
		height: 100vh;
		position: absolute;
		
		z-index: 1;
		
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>