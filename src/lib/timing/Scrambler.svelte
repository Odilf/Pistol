<script lang="ts">
	import type { Session, Event } from "$lib/data/architecture";
	import { events } from "$lib/data/database";
	import isEqual from 'lodash.isequal'	

	import { getRandomScramble} from '$lib/scramble/scrambler'
	import Scramble from "$lib/UI/Scramble.svelte";
	

	type ScrambleEvent = {
		event: Event,
		scrambles: string[]
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
			console.log("Didn't find event", event, 'in', scrambles)	;
			
			return {
				event: null,
				scrambles: ['']
			}
		}

		return scrambleEvent
	}

	function getScrambles(scrambles: ScrambleEvent[], event: Event) {
		return getScrambleEvent(scrambles, event).scrambles
	}

	function getLastScramble(scrambleEvents: ScrambleEvent[], event: Event) {
		console.log("Searching for ", event, 'in', scrambleEvents);
		
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
	
	export let activeScramble = ''
	$: activeScramble = getLastScramble(scrambles, selection?.event)

	$: console.log(activeScramble)
	$: console.log(getLastScramble(scrambles, selection?.event))
	
</script>

{#if selection}
	<Scramble scramble={activeScramble}/>
{/if}