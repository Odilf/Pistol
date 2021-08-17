<script>
	import '../app.css'
	import { Footer, Button } from 'svelte-materialify'

	let wide = 'width:7em'
</script>

<Footer class='justify-center flex-column'>
		<div class="buttons">
			<Button style={wide} on:click={() => location.href = '/settings'}> Settings </Button>
			<Button on:click={() => window.open('https://github.com/Odilf/Odilf-Timer','_blank')}> <img src='static/github.svg' alt='GitHub'/> </Button>
			<Button style={wide} on:click={() => location.href = '/about'}> About</Button>
		</div>
	<p class="text-center" style="width:100%">
		2021&nbsp;-&nbsp;<b>Odilf</b>
	</p>
</Footer>

<style lang="scss">
	p {
		margin: 0.5em;
		margin-bottom: 0;
	}

	.buttons {
		flex-grow: 1;

		//Text centering
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>