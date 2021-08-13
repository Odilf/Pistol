<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
import Footer from '$lib/Footer.svelte';
import EventSelect from '$lib/managing/EventSelect.svelte';
import SessionSelect from '$lib/managing/SessionSelect.svelte';
import SolveList from '$lib/managing/SolveList.svelte';
import QuickStats from '$lib/timer/QuickStats.svelte';
import Scramble from '$lib/timer/Scramble.svelte';
import TimeInput from '$lib/timer/TimeInput.svelte';
import Timer from '$lib/timer/Timer.svelte';
</script>

<svelte:head>
	<title>Pistol</title>
</svelte:head>

<header>
	<EventSelect/>
</header>

<body>
	<div class="column">
		<SessionSelect/>
	</div>

	<div class="center">
		<Scramble/>
		<Timer/>
		<!-- <TimeInput/> -->
		<QuickStats/>
	</div>
	
	<div class="column">
		<SolveList/>
	</div>
</body>

<footer>
	<Footer/>
</footer>

<style lang="scss">

	$column-width: 200px;
	header {
		height: fit-content;
	}
	body {
		flex-grow: 1;
		display: flex;
	}
	.column {
		width: $column-width;
		display: flex;
		justify-content: center;
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