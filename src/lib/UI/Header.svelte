<script lang="ts">
	import Login from './Login.svelte'
</script>

<header>
	<h1> Pistol </h1>

	<Login/>

</header>

<style>
	header {
		display: flex;
		align-items: center;
	}
	h1 {
		font-size: 2em;
		display: flex;
		justify-content: center;
		align-items: center;

		line-height: 150%;
		margin: 0;
		padding: 10px 1em 0;
		
		font-style: italic;
		font-weight: 900;
	}
</style>