<script context="module">
	export const router = false;
</script>

<script lang="ts">
	import '$lib/storage/versionManager'
	
	import Timing from '$lib/timer/Timing.svelte';
	import Footer from '$lib/utils/Footer.svelte';
	import EventSelect from '$lib/navigation/events/EventSelect.svelte';
	import SessionSelect from '$lib/navigation/SessionSelect.svelte';
	import SolveList from '$lib/navigation/SolveList.svelte';
	import QuickStats from '$lib/timer/QuickStats.svelte';
	import Scramble from '$lib/timer/Scramble.svelte';

	import Import from '$lib/import/Import.svelte'
	import KeyboardNav from '$lib/utils/KeyboardNav.svelte';

	
	import { fade } from 'svelte/transition'
	import { database } from '$lib/storage/database';
	let width: number
	
	let isDragging

	const compact_width = 900
</script>

<svelte:head>
	<title>Pistol</title>
</svelte:head>

<svelte:window bind:innerWidth={width}/>

<KeyboardNav/>

<Import bind:isDragging/>

<main on:dragover|preventDefault={() => isDragging = true}>
	<header>
		<EventSelect/>
	</header>
	
	<body>
		<!-- {#if width > compact_width} -->
		<div class="column" style='--compact-width: {compact_width}'>
			<SessionSelect bind:event={$database.events[$database.selected_event]}/>
		</div>
		<!-- {/if} -->
		
		<div class="center" transition:fade>
			<Scramble/>
			<Timing></Timing>
			<QuickStats/>
		</div>
		
		{#if width > compact_width}
			<div class="column">
				<SolveList/>	
			</div>
		{/if}
	</body>
	
	<footer>
		<Footer/>
	</footer>
</main>

<style lang="scss">

	$column-width: 200px;
	main {
		// height: 100vh;
		// width: 100vw;
		position: fixed;
		top:0; right:0; bottom:0; left:0;

		display: flex;
		flex-direction: column;
	}
	header {
		flex-basis: content;
	}
	body {
		flex-grow: 1;
		display: flex;
		overflow: hidden;
	}
	@media only screen and (max-width: 600px) {
		body {
			flex-direction: column;
		}
		.column {
			min-width: 100%;
			padding-top: 1em;
		}
	}
	.column {
		width: $column-width;
		display: flex;
		flex-direction: column;
		align-items: center;
		max-height: 100%;
	}
	.center {
		flex-grow: 1;

		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>