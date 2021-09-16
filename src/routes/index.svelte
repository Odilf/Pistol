<!-- <script context="module" lang="ts">
	// export const prerender = true;
</script> -->
<script context="module">
	export const router = false;
</script>

<script lang="ts">
	import Timing from '$lib/timer/Timing.svelte';
	import Footer from '$lib/utils/Footer.svelte';
	import EventSelect from '$lib/navigation/events/EventSelect.svelte';
	import SessionSelect from '$lib/navigation/SessionSelect.svelte';
	import SolveList from '$lib/navigation/SolveList.svelte';
	import QuickStats from '$lib/timer/QuickStats.svelte';
	import Scramble from '$lib/timer/Scramble.svelte';

	import { fade } from 'svelte/transition'
	let width: number
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
		{/if}
		
		<div class="center" transition:fade>
			<Scramble/>
			<Timing></Timing>
			<QuickStats/>
		</div>
		
		{#if width > 900}
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