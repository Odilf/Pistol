<script lang='ts'>
	import type { Solve } from '$lib/storage/database'
	import { TwistyPlayer } from "cubing/twisty"; //Necessary for cube visualization
	import '../../app.css'

	export let solve: Solve;
	export let puzzle: string;

	const twisty_dict = {
		'3x3x3': ['3x3', '3BLD', 'FMC', 'OH'],
		'2x2x2': ['2x2'],
		'4x4x4': ['4x4', '4BLD'],
		'5x5x5': ['5x5', '5BLD'],
		'6x6x6': ['6x6'],
		'7x7x7': ['7x7'],
		'megaminx': ['Megaminx'],
		'pyraminx': ['Pyraminx'],
		'skewb': ['Skewb'],
		'': ['Clock', 'MBLD', 'Other'],
	}

	for (const [twisty_name, pistol_name] of Object.entries(twisty_dict)) {
		if (pistol_name.includes(puzzle)) {
			puzzle = twisty_name
		}
	}
	

	$: if (!solve.reconstruction) {
		solve.reconstruction = ''
	}

	if (puzzle === '3x3') {
		solve.scramble = `${solve.scramble} x2 y2 `
	}

	
	
</script>

{#if puzzle}

<twisty-player
	{puzzle}
	alg={`${solve.scramble} ${solve.reconstruction}`}
	background="none"
	hint-facelets="none"
	control-panel="none"
	/>
<p>
	Cube visualization courtesy of cubing.js
</p>
{/if}

<style>

	p {
		color: var(--secondary-color);
		flex-grow: 1;
		margin: 0;
		padding: 0;

		width: 100%;

		text-align: right;
	}

	twisty-player {
		width: 100%;
	}
</style>