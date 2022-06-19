<script lang="ts">
	import { Session, type Event } from "$lib/data/architecture";
	import TrashCan from "$lib/UI/icons/TrashCan.svelte";
	import { fly } from "svelte/transition";
	import { createEventDispatcher } from "svelte";

	export let event: Event
	export let selectedSession: Session = null

	let newSessionName = ''

	const dispatch = createEventDispatcher<{
		addSession: { event: Event, session: Session },
		edit: { event: Event },
	}>()

	function addSession() {
		event.sessions = [...event.sessions, new Session(newSessionName)]
		newSessionName = ''
		dispatch('addSession', { 
			event, 
			session: event.sessions.at(-1) 
		})
	}

	$: valid = event.sessions.every(session => session.name !== newSessionName)
	
	function deleteSession(session: Session) {
		event.sessions = event.sessions.filter(s => s.name !== session.name)
		if (selectedSession.name === session.name) {
			selectedSession = event.sessions[0]
		}
	}
</script>

<div class='max-w-xl w-screen p-8'>
	<div class='flex justify-between'>
		<h1 class='text-5xl font-black'> {event.name} </h1>
		
		<button class='bg-secondary text-white p-2 rounded shadow clickable transition my-2'
		on:click={() => {
			event.options.hidden = !event.options.hidden
		}}> 
			{ event.options.hidden ? 'Show' : 'Hide' } 
		</button>
	</div>

	<h2 class='text-3xl mt-5 font-light border-b-2 border-secondary/50'> 
		Sessions: 
	</h2> 

	<ul class='list-disc'>
		{#each event.sessions as session (session.name)}
		<li transition:fly|local={{ y: 10 }}>
		<div class='flex justify-between w-full mt-2 transition-all
		{selectedSession?.name === session.name && 'bg-secondary p-2 rounded text-primary'}'>
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