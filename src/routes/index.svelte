<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import Footer from '$lib/footer.svelte';
	import EventSelect from '$lib/managing/EventSelect.svelte';
	import SolveList from '$lib/managing/SolveList.svelte';
	import Timer from '$lib/timer/Timer.svelte';
</script>

<svelte:head>
	<title>Odilf Timer</title>
</svelte:head>

<EventSelect/>
<Timer/>
<SolveList/>
<Footer/>