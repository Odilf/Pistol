<script context="module">
	import { browser, dev } from '$app/env';

	// we don't need any JS on this page, though we'll load
	// it in dev so that we get hot module replacement...
	export const hydrate = dev;

	// ...but if the client-side router is already loaded
	// (i.e. we came here from elsewhere in the app), use it
	export const router = browser;

	// since there's no dynamic data here, we can prerender
	// it so that it gets served as a static asset in prod
	export const prerender = true;
</script>

<script lang="ts">
	import Back from '$lib/utils/Back.svelte'
	import '../app.css'
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<body>
	<article>
		
		<header>
			<Back></Back>
		</header>
		
		<main>
			<h1>Pistol</h1>
			<p>Pistol is an open source speedcubing timer that brings a modern aproach and desing. <br>
				Focused on the best possible user expirience: elegancy, simplicity, ease of use, performance and customization. <br> 
				Built with <a href='https://kit.svelte.dev'>SvelteKit</a>, still under development.
			</p>

			<h2>Contributing</h2>
			<hr>
			<p>
				If you found a typo or a easy issue to fix, feel free to raise a new issue. 
				I will fix it if it's reasonable or I will close it if it's not. <br>
				If anyone wants to implement a new feature or to make changes in the code themselves, 
				I will <i>gladly</i> review and merge pull requests. 
				Just don't expect me to make the development process easier (I have no clue what I would be suppossed to do).
			</p>

			<h2>Credits</h2>
			<hr>
			<p>
				All the cubing visualizations were made with <a href=https://js.cubing.net/cubing>cubing.js</a>. <br>
				Timer inspired mainly by <a href=https://cstimer.net>csTimer</a> and partialy by <a href=https://timer.cubing.net>timer.cubing.net/</a>.
			</p>

			<h2>License</h2>
			<hr>
			<p>
				This project is licensed under the GPL license (version 3 or later). 
				This means that this library is free to use, although you must publish any code that uses it (e.g. also put it on GitHub). <br> 
				See the <a href=https://www.gnu.org/licenses/gpl-3.0.en.html>exact license</a> for exact details.
			</p>
		</main>
	</article>
</body>
	
<style lang='scss'>
	header {
		display: flex;
		align-items: center;
		width: 100%;
	}
	h1 {
		font-size: 3.5em;
		margin-bottom: 1rem;
		font-weight: 700;
	}

	h2 {
		font-size: 2em;
		margin-top: 1rem;
		font-weight: 500;
	}

	main {
		max-width: 700px;
	}
	
	body {
		display: flex;
		align-items: center;
		flex-direction: column;
		background-color: #4b0000;
	}
	article {
		padding: 2em;
		min-height: 100%;
		width: min(90%, 1200px);
		background-color: var(--primary-color);

		display: flex;
		align-items: center;
		flex-direction: column;

		overflow: scroll;
	}
	p {
		margin-top: 0.5rem;
	}
	a {
		text-decoration: none;
	}
	a:hover {
		text-decoration: underline;
	}
</style>
