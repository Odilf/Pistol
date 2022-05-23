<script lang="ts">
	import { browser } from "$app/env";
	import { writable } from "svelte-local-storage-store";
	import { crossfade, fly } from "svelte/transition";

	import Loading from "$lib/navigation/Loading.svelte";
	import Overlay from "$lib/UI/basic/Overlay.svelte";
	import Scramble from "$lib/UI/scramble/Scramble.svelte";
	import { type Event, defaultEvents } from "$lib/data/architecture";
	import { getRandomScramble} from '$lib/scramble/scrambler'

	export let event: Event
	export function requestNewScramble() {
		const data = globalScrambles[event.abbreviation]
		data.index += 1

		if (data.scrambles.length <= data.index + 2) {
			getRandomScramble(event.scrambleType).then(scramble => {
				data.scrambles = [
					...data.scrambles, 
					scramble
				]

				globalScrambles = globalScrambles
			})
		}
		
		globalScrambles = globalScrambles
	}

	export let activeScramble: string = null

	const cache = writable('cachedScrambles', null as Scrambles)
	let globalScrambles: Scrambles = Object.assign({}, $cache)

	// Initialize scrambles if it's the first time that user logs in and cache isn't built yet (or incomplete)
	if (!$cache || !Object.values($cache).every(({ scrambles }) => scrambles.length >= 2)) {
		console.warn('Initializing solves since we couldn\'t find cache');
		initializeScrambles()
	}

	// Set active scramble
	$: if (!browser) {
		activeScramble = ''
	} else if (globalScrambles[event.abbreviation]) {
		const { scrambles, index } = globalScrambles[event.abbreviation]
		activeScramble = scrambles ? scrambles[index] : 'caca'
	}
	
	// Keep cache updated
	$: for (const eventName in globalScrambles) {
		const { scrambles } = globalScrambles[eventName]

		if (scrambles?.length > 1) {
			$cache[eventName] = {
				scrambles: scrambles.slice(-2),
				index: 0,
			} 
		} else {
			console.log('resseting scramble cache');
			$cache = Object.assign({}, globalScrambles)
		}
	}

	interface Scrambles {
		[event: string]: {
			scrambles: string[],
			index: number, 
		}
	}

	function initializeScrambles() {
		console.log('initializing scrambles');
		
		globalScrambles = {}
		defaultEvents.forEach(async(event, i) => {
			globalScrambles[event.abbreviation] = {
				scrambles: [await getRandomScramble(event.scrambleType)],
				index: 0,
			}

			// Janky way to add second scramble after first one
			if (i === defaultEvents.length - 1) {
				defaultEvents.forEach(async(event) => {
					const { scrambles } = globalScrambles[event.abbreviation]
					globalScrambles[event.abbreviation].scrambles = [...scrambles, await getRandomScramble(event.scrambleType)]
				})
			}
		})
	}

	let showHistory = false

	const [send, receive] = crossfade({
		duration: 200,
		fallback: fly
	});

	const duration = 400
	
</script>

<div class='w-full text-center text-xl relative' on:dblclick={() => showHistory = true}>
	{#if event}
		{#if !activeScramble}
			<Loading/>
		{:else if !showHistory}
		<div class='max-w-2xl'
		in:receive={{ key: activeScramble, duration }}
		out:send|local={{ key: activeScramble, duration }}>
			<Scramble scramble={activeScramble} scrambleType={event.scrambleType}/>
		</div>
		{/if}
	{/if}
</div>

<Overlay bind:enabled={showHistory} fragile>
	<div class='text-center'>
		{#each globalScrambles[event.abbreviation].scrambles as scramble, i}
			<div class='mt-5' 
			in:receive={{ key: activeScramble, duration }}
			out:send={{ key: activeScramble, duration }}
			style:font-size='{1.2 - 0.05*i}em'>
				<Scramble {scramble} scrambleType={event.scrambleType}/>
			</div>
		{/each}
	</div>
</Overlay>