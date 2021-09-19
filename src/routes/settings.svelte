<script context="module">
	import { browser } from '$app/env';
	
	// Route if came from browser or smth
	export const router = browser;
	export const prerender = true;
</script>

<script lang='ts'>
	import { Button, ListItem, Tooltip } from 'svelte-materialify'
	import { settings, resetSettings } from '$lib/settings'
	import Setting from '$lib/settings/Setting.svelte'
	import Back from '$lib/utils/Back.svelte'
	import { deleteAllSolves } from '$lib/storage/database'
	import ConfirmationButton from '$lib/utils/ConfirmationButton.svelte'

	import '../app.css';
</script>

<svelte:head>
	<title>Settings</title>
</svelte:head>

<main>
	<header>
		<Back/>
		<h1>Settings</h1>
	</header>


	<div class='content'>
	{#each $settings as category}
		
		<h2>{category.name}</h2>
		<h3>{category.description}</h3>
		
		{#each category.settings as setting}
			<ListItem style='width:100%'>
				<Tooltip top>
					{setting.name}
					<span slot='tip'>{setting.description}</span>
				</Tooltip>

				<span slot="append">
					<div class="setting">
						<Setting bind:setting={setting}/>
					</div>
				</span>
			</ListItem>
		{/each}
		
		

		{/each}

		<h2>Import and data</h2>
		<h3>Import from csTimer or delete your data</h3>

		<ListItem style='width:100%'>
			<div class="setting">
				To import from csTimer drag and drop <br> 
				csTimer export to timer.  
			</div>
		</ListItem>

		<ListItem style='width:100%'>
			<div class="setting">
				<ConfirmationButton on:confirmation={resetSettings}> 
					Reset settings
				</ConfirmationButton>
			</div>
		</ListItem>

		<ListItem style='width:100%'>
			<div class="setting">
				<ConfirmationButton on:confirmation={deleteAllSolves}> 
					Delete all solves
					<span slot='dialog'> Are you sure you want to irreversibly delete all your solves? </span>
				</ConfirmationButton>
			</div>
		</ListItem>
	<br>
	<br>
	</div>
</main>

<style lang='scss'>
	header {
		display: flex;
		align-items: center;
		width: 100vw;
	}
	h1 {
		display: flex;
		justify-content: center;
		font-size: 3.5em;
		margin: 1rem;
		font-weight: 700;
	}

	h2 {
		font-size: 2em;
		font-weight: 400;
	}
	h3 {
		font-size: 1.2em;
		font-weight: 400;
		color: gray;
	}

	.content {
		width: min(100%, 30em);
		margin-bottom: 0;
		margin-top: 0;
		color: whitesmoke;
		padding: 1em;
	}

	.setting {
		color: whitesmoke;
		width: 100%;
	}
	main {
		background-color: var(--primary-color);
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
