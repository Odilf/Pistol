<script lang="ts">
	import type { Session } from "$lib/data/architecture";
	export let sessions: Session[]
</script>

{#each sessions as session}
	{session.name}
{/each}