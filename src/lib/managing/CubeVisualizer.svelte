<script lang='ts'>
	import type { Solve } from '$lib/storage/time_db'
	import { TwistyPlayer } from "cubing/twisty"; //Necessary for cube visualization
	export let solve: Solve;
	import '../../app.css'

	if (!solve.reconstruction) {
		solve.reconstruction = ''
	}
	
</script>

<!-- <twisty-player
	experimental-setup-alg={`x2 y2 ${solve.scramble}`}
	background="none"
	control-panel="none"
	hint-facelets="none"
	alg={solve.reconstruction}
	/> -->

<twisty-player
	experimental-setup-alg={`x2 y2 ${solve.scramble}`}
	background="none"
	control-panel="none"
	hint-facelets="none"
	/>

<p>
	Cube visualization courtesy of cubing.js
</p>

<style>

	p {
		color: var(--secondary-color);
		flex-grow: 1;
		margin: 0;
		padding: 0;

		width: 100%;

		text-align: right;
	}
</style>