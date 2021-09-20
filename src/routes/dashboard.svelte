<script lang='ts'>
	import DashboardCard from '$lib/dashboard/DashboardCard.svelte'
	import { database } from '$lib/storage/database'

</script>

<!-- {#each $database.events as event} -->
	<!-- <DashboardCard session={event.sessions[0]} event={event}/> -->
<!-- {/each} -->
	
<DashboardCard session={$database.events[0].sessions[0]} event={$database.events[0]}/>

<style>
</style>