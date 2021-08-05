<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
import EventSelect from '$lib/managing/EventSelect.svelte';

	import Solve from '$lib/managing/Solve.svelte';
	import Timer from '$lib/timer/Timer.svelte';
</script>

<svelte:head>
	<title>Odilf Timer</title>
</svelte:head>

<EventSelect/>

<Timer/>

<Solve solve={{id: 6999, time: 4.2, date: new Date(), scramble: "R U R' U'", reconstruction: ''}}/>