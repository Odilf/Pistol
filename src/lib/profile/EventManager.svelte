<script lang="ts">
	import { Session, type Event } from "$lib/data/architecture";
	import TrashCan from "$lib/UI/icons/TrashCan.svelte";
	import { getContext } from "svelte";
	import { fly } from "svelte/transition";
	import type { Writable } from 'svelte/store'
	import { flip } from "svelte/animate";

	export let event: Event
	export let selectedSession: Session = null

	let newSessionName = ''

	function addSession() {
		event.sessions = [...event.sessions, new Session(newSessionName)]
		newSessionName = ''
	}

	const selection = getContext('selection') as Writable<unknown>

	$: valid = event.sessions.every(session => session.name !== newSessionName)
	
	function deleteSession(session: Session) {
		event.sessions = event.sessions.filter(s => s.name !== session.name)
		if (selectedSession.name === session.name) {
			selectedSession = event.sessions[0]
		}
	}
</script>

<div class='max-w-xl w-screen p-8'>

	<h1 class='text-5xl font-black'> {event.name} </h1>

	<h2 class='text-3xl mt-5 font-light'> Sessions: </h2> 
	<div id='separator' class='h-[0.1rem] w-full bg-secondary rounded opacity-50'/>

	<ul class='list-disc'>
		{#each event.sessions as session (session.name)}
		<li transition:fly|local={{ y: 10 }}
		animate:flip>
		<div class='flex justify-between w-full mt-2
		{selectedSession.name === session.name && 'bg-secondary p-2 rounded text-primary'}'>
		<button class='clickable transition' on:click={() => selectedSession = session}>
			<h2 class='text-2xl font-bold'> {session.name} </h2>
		</button>
			
			{#if session.name !== 'Main'}
			<button class='clickable transition' on:click={() => deleteSession(session)}> 
				<TrashCan/>
			</button>
			{/if}
		</div>
		</li>
		{/each}

		<div class='flex flex-col my-4'>
			<input type='text' class='p-2 rounded shadow' bind:value={newSessionName} placeholder="Enter name for new session" 
			
			on:submit={() => addSession()}>

			<button class='clickable bg-secondary text-primary font-bold p-2 rounded shadow my-2 duration-500 transition-all
			{newSessionName ? '' : 'translate-y-3 opacity-0 pointer-events-none'} disabled:opacity-50'
			on:click={() => addSession()}
			disabled={!valid}>
				Add session
			</button>
		</div>
	</ul>
</div>