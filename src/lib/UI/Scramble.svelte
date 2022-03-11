<script lang="ts">
	export let scramble: string
</script>

<div class='w-fit text-center mx-auto max-w-screen-md font-light {scramble.length > 100 ? 'text-lg' : 'text-2xl'}'>
	{#each scramble.split(' ') as move, i}
	<span class='hover:bg-slate-400'>
		{move}
	</span>
	{/each}
</div>