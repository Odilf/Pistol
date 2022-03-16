<script lang="ts">
	import { browser } from "$app/env";
	import CubeVisualiserBrowserGuard from "./CubeVisualiserBrowserGuard.svelte";
</script>

{#if browser}
	<CubeVisualiserBrowserGuard/>
{/if}