<script>
	import { Button, Icon, MaterialApp } from 'svelte-materialify';
</script>

<div>
	<Button on:click={() => location.href = '/'} fab color=white>
		<img src='static/back.svg' alt=back-button />
	</Button>
</div>

<style>
	div {
		padding: 1em;
	}
</style>