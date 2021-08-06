<script>
	import { Footer, Button } from 'svelte-materialify'
	const links = [{name: 'About', url: '/about'}]
</script>

<div class='center'>
	<Footer paddless class="center">
		<div>
			{#each links as link}
				<Button text>{link.name}</Button>
			{/each}
		</div>
		<div class="text-center" style="width:100%">
		2021 - <b>Odilf</b>
		</div>
	</Footer>
</div>

<style>
	.center {
		display: flex;
		justify-content: center;
		align-items: center;
		/* background-color: lightcyan; */
	}
</style>