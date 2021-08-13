<script lang="ts">
	import '../app.css';

	import { MaterialApp } from 'svelte-materialify'
</script>

<MaterialApp theme=dark>
	<main>
		<slot />
	</main>
</MaterialApp>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		width: 100vw;
		height: 100vh;
		padding: 0, 10rem;
		margin: 0;
	}

</style>
