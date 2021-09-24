<script>
	import { Button } from 'svelte-materialify';
</script>

<div class='sticky'>
	<Button class='elevation-24' on:click={() => location.href = '/'} fab>
		<!-- <img src='$lib/images/back.svg' alt=back-button /> -->
		<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path fill='whitesmoke' d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" /></svg>
	</Button>
</div>

<style>
	div {
		margin: 1em;
	}
	.sticky {
		left: 1em;
		top: 1em;
		position: sticky;
		z-index: 1;
		width: fit-content;
	}
</style>