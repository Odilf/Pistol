<script lang='ts'>
	import DashboardCard from '$lib/dashboard/DashboardCard.svelte'
	import { database } from '$lib/storage/database'
	import Back from '$lib/utils/Back.svelte'

	function generate_indices(database) {
		const indices = []
		let i = -1
		for (const event of database.events) {
			let j = -1
			for (const session of event.sessions) {
				if (session.solves.length !== 0) {
					if (j === -1) i++
					j++
					indices.push({session: session, event: event, index: [i, j]})
				}
			}
		}
		return indices
	}

	$: iterator = generate_indices($database)
</script>


<main>
	<Back/>
	<body>
		{#if iterator.length !== 0}
			{#each iterator as it}
				<DashboardCard {...it}/>
			{/each}
		{:else}
			You haven't made a solve yet! <br>
			When you make a solve, times will automatically appear here. 
		{/if}
	</body>
</main>

<style>
	main {
		overflow-y: scroll;
	}
	body {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0;
		margin: 0;
		background-color: inherit;
	}
</style>