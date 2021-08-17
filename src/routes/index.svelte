<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { fade, fly } from 'svelte/transition'
	import { flip } from 'svelte/animate'

	import Timing from './Timing.svelte';
	import Footer from '$lib/Footer.svelte';
	import EventSelect from '$lib/managing/EventSelect.svelte';
	import SessionSelect from '$lib/managing/SessionSelect.svelte';
	import SolveList from '$lib/managing/SolveList.svelte';
	import QuickStats from '$lib/timer/QuickStats.svelte';
	import Scramble from '$lib/timer/Scramble.svelte';

	let width
</script>

<svelte:head>
	<title>Pistol</title>
</svelte:head>

<svelte:window bind:innerWidth={width}/>

<main>
	<header>
		<EventSelect/>
	</header>
	
	<body>
		{#if width > 900} 
			<div class="column">
				<SessionSelect/>
			</div>
			
			<div class="center">
				<Scramble/>
				<Timing></Timing>
				<QuickStats/>
			</div>
			
			<div class="column">
				<SolveList/>	
			</div>
		{:else if width > 500}
			<div class="center">
				<Scramble/>
				<Timing></Timing>
				<QuickStats/>
			</div>
		
			<div class="column">
				<SessionSelect/>
				<SolveList/>
			</div>
		{:else}
			<div class="center">
				<Scramble/>
				<Timing></Timing>
				<QuickStats/>
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
		height: 100vh;
		width: 100vw;
		display: flex;
		flex-direction: column;
	}
	header {
		height: fit-content;
	}
	body {
		flex-grow: 1;
		display: flex;
		// height: 100%;
		overflow: scroll;
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
	footer {
		height: fit-content;
	}
</style>