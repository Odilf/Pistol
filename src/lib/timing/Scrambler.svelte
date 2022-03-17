<script lang="ts">
	import type { Session, Event } from "$lib/data/architecture";
	import { events } from "$lib/data/database";
	import { getRandomScramble} from '$lib/scramble/scrambler'
	import Scramble from "$lib/UI/scramble/Scramble.svelte";
	

	type ScrambleEvent = {
		event: Event,
		scrambles: Promise<string>[]
	}

	export let selection: {
		event: Event,
		session: Session
	}

	function populateScrambles(events: Event[]) {
		return events.map(event => {
			return {
				event,
				scrambles: [getRandomScramble(event.scrambleType)],
			}
		})
	}

	function populateEmpty(scrambleEvents: ScrambleEvent[]) {
		return scrambleEvents.map(scrambleEvent => {
			if (!scrambleEvent.scrambles) scrambleEvent.scrambles = [getRandomScramble(scrambleEvent.event.scrambleType)]
			return scrambleEvent
		})
	}

	function getScrambleEvent(scrambles: ScrambleEvent[], event: Event): ScrambleEvent {
		const scrambleEvent = scrambles.find(scrambleEvent => scrambleEvent.event?.name === event?.name)

		if (!scrambleEvent) {
			return {
				event: null,
				scrambles: []
			}
		}

		return scrambleEvent
	}

	function getScrambles(scrambles: ScrambleEvent[], event: Event) {
		return getScrambleEvent(scrambles, event).scrambles
	}

	function getLastScramble(scrambleEvents: ScrambleEvent[], event: Event) {
		const scrambles = getScrambles(scrambleEvents, event)
		return scrambles[scrambles.length - 1]
	}

	function addScramble(scrambleEvents: ScrambleEvent[], event: Event) {
		const scrambleEvent = getScrambleEvent(scrambleEvents, event)
		
		scrambleEvent.scrambles = [...scrambleEvent.scrambles, getRandomScramble(scrambleEvent.event.scrambleType)]
		scrambles = scrambles
	}

	export function requestNewScramble() {
		addScramble(scrambles, selection.event)
	}

	let scrambles = populateScrambles($events)
	$: scrambles = populateEmpty(scrambles)
	
	export let activeScramble: Promise<string> = new Promise(() => '')
	$: activeScramble = getLastScramble(scrambles, selection?.event)

	let showHistory = false
	
</script>

{#if showHistory}
	{#each getScrambles(scrambles, selection.event).slice(0, -1) as scramble, i}
		{#await scramble}
			Loading...
		{:then scramble} 
			<div class='w-full absolute' style:transform='translateY({(i + 1) * 40}px)' on:click={() => showHistory = true}>
				<Scramble {scramble} scrambleType={selection.event.scrambleType}/>
			</div>
		{/await}
		
	{/each}
{/if}


<div class='w-full text-center' on:click={() => showHistory = true}>
	{#if selection}
		{#await activeScramble}
			Loading...
		{:then scramble}
			<Scramble {scramble} scrambleType={selection.event.scrambleType}/>
		{/await}
	{/if}
</div>