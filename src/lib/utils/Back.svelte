<script>
	import { Button } from 'svelte-materialify';
</script>

<div>
	<Button on:click={() => location.href = '/'} fab>
		<img src='static/back.svg' alt=back-button />
	</Button>
</div>

<style>
	div {
		padding: 1em;
	}
</style>