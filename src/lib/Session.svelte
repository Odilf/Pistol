<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { fly } from 'svelte/transition'
	
	import Scrambler from './timing/Scrambler.svelte';
	import SolveList from './timing/SolveList.svelte';
	import Timer from './timing/Timer.svelte';
	import { defaultEvents, Penalty, Solve, type Selection } from '$lib/data/architecture'
	import { createFirebaseStore } from '$lib/data/firebase-store'
	
	export let selection: Selection = {
		event: defaultEvents[0],
		session: defaultEvents[0].sessions[0],
	}

	const selectionStore = writable(selection)
	setContext('selection', selectionStore)

	let requestNewScramble: () => void;
	let activeScramble: string

	$: path = `Solves/${selection.event.name}/${selection.session.name}` as const

	$: solvesStore = createFirebaseStore(path, {} as { [date: number]: Solve }, { amount: 10 }, { delay: 0 })
	$: solves = Object.entries($solvesStore).map(([date, solve]) => {
		solve.date = new Date(parseInt(date))
		return solve
	})
	

	async function handleTime(time: number) {
		const solve = new Solve(time, activeScramble)
		$solvesStore[new Date().getTime()] = solve
		requestNewScramble()
	}

	let deletedSolves = []
	function handleKeydown(e: KeyboardEvent) {
		if (e.code === 'KeyZ' && (e.altKey || e.metaKey)) {
			if (!e.shiftKey) {
				if (solves.length > 0) {
					const solve = solves.at(-1)
					solvesStore.delete(solve.date.getTime())
					deletedSolves.push(solve)
				}
			} else if (deletedSolves.length > 0) {
				const solve = deletedSolves.at(-1)
				$solvesStore[solve.date.getTime()] = solve 
				deletedSolves.pop()
			}
		}

		const updateLastSolve = (penalty: Penalty) => $solvesStore[solves.at(-1).date.getTime()].penalty = penalty
		if (e.code === 'Digit1' && (e.altKey)) 
			updateLastSolve(Penalty.None)
		else if (e.code === 'Digit2' && (e.altKey)) 
			updateLastSolve(Penalty.Plus2)
		else if (e.code === 'Digit3' && (e.altKey)) 
			updateLastSolve(Penalty.DNF)
	}

</script>

<svelte:window on:keydown={handleKeydown} />

<div class='flex flex-col h-full justify-center items-center'>
	<div class='my-6'>
		<Scrambler bind:requestNewScramble event={selection.event} bind:activeScramble />
	</div>

	<div class='flex-1 flex items-center'>
		<Timer pressDelay={300} on:time={e => handleTime(e.detail)}/>
	</div>

	{#key selection}
		<div class='flex-1 max-h-[17rem] overflow-hidden' in:fly={{ y: 20 }}>
			<SolveList {solves}/>
		</div>
	{/key}
</div>