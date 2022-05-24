<script lang="ts">
	import { fly } from 'svelte/transition'
	import Scrambler from './timing/Scrambler.svelte';
	import SolveList from './timing/SolveList.svelte';
	import Timer from './timing/Timer.svelte';
	import { Penalty, Solve, type Selection } from '$lib/data/architecture'
	import { getSolvesStore } from './utils/solves';
	import { writable } from 'svelte/store';
	import { setContext } from 'svelte';

	export let selection: Selection

	const selectionStore = writable(selection)
	$: $selectionStore = selection
	setContext('selection', selectionStore)

	let requestNewScramble: () => void;
	let activeScramble: string

	$: ({ solves, solvesArray } = getSolvesStore(selection))

	async function handleTime(time: number) {
		const solve = new Solve(time, activeScramble)
		$solves[new Date().getTime()] = solve
		requestNewScramble()
	}

	// Keyboard hotkeys
	let deletedSolves = []
	function handleKeydown(e: KeyboardEvent) {
		if (e.code === 'KeyZ' && (e.altKey || e.metaKey)) {
			if (!e.shiftKey) {
				if ($solvesArray.length > 0) {
					const solve = $solvesArray.at(-1)
					$solves[solve.date.getTime()] = null
					deletedSolves.push(solve)
				}
			} else if (deletedSolves.length > 0) {
				const solve = deletedSolves.at(-1)
				$solves[solve.date.getTime()] = solve 
				deletedSolves.pop()
			}
		}

		const updateLastSolve = (penalty: Penalty) => $solves[$solvesArray.at(-1).date.getTime()].penalty = penalty
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
		<Timer on:time={e => handleTime(e.detail)}/>
	</div>

	{#key selection}
		<div class='flex-1 max-h-[17rem] overflow-hidden' in:fly={{ y: 20 }}>
			<SolveList solves={ $solvesArray } 
			on:delete={e => $solves[e.detail.solve.date.getTime()] = null}
			on:edit={e => $solves[e.detail.solve.date.getTime()] = e.detail.solve}/>
		</div>
	{/key}
</div>