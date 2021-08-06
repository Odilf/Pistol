<script lang="ts">
	import '../app.css';
</script>

<main>
	<slot />
</main>

<!-- <footer></footer> -->

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100vw;
		height: 100vh;
		margin: 0;
	}

</style>
