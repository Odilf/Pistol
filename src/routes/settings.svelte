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

<script lang='ts'>
	import { Tabs, Tab, TabContent, ListItem, Button } from 'svelte-materialify'
	import { settings, resetSettings } from '$lib/settings'
	import Setting from '$lib/settings/Setting.svelte'
	import Back from '$lib/utils/Back.svelte'
	import { deleteAllSolves } from '$lib/storage/time_db'
	import ConfirmationButton from '$lib/utils/ConfirmationButton.svelte'

	let tabs_active = true;

	function toggleTabs() {
		tabs_active = !tabs_active
	}
</script>

<svelte:head>
	<title>Settings</title>
</svelte:head>

<header>
	<div class="menu">
		<Back/>
		<Button fab on:click={toggleTabs}><img src='static/menu.svg' alt='menu'></Button>
	</div>
	<h1>Settings</h1>
</header>

<main style='position:relative; right:0px;'>
	<Tabs vertical>
		<div slot='tabs'>
			{#each $settings as category}
			<Tab> {category.name} </Tab>
			{/each}
			<Tab>User</Tab>
		</div>
		
		{#each $settings as category}
		<TabContent>
			<div class='content'>
				<h2>{category.description}</h2>
				{#each category.settings as setting}
				<ListItem style='width:100%'>
					{setting.name}
					<span slot="subtitle"> {setting.description} </span>
					
					<span slot="append">
						<div class="setting">
							<Setting bind:setting={setting}/>
						</div>
					</span>
				</ListItem>
				{/each}
			</div>
		</TabContent>
		{/each}
		
		<TabContent>
			<div class='content'>
				<h2>User configuration</h2>
				<ListItem>
					Reset settings
					<span slot="subtitle"> Revert settings to default. This can't be undone </span>
					
					<span slot="append">
						<div class="setting">
							<ConfirmationButton button_text='Reset settings' 
							dialog_text='This will permantly revert your settings. Are you sure you want to do this?'
							on:confirmation={resetSettings}/>
						</div>
					</span>
				</ListItem>
				<ListItem>
					Delete solves
					<span slot="subtitle"> Completely remove all your solves. This can't be undone </span>
					
					<span slot="append">
						<div class="setting">
							<ConfirmationButton  button_text='Delete all solves' 
							dialog_text="This will permantly and irreversably delete forever all your solves in all events. Are you sure you want to do this?"
							on:confirmation={deleteAllSolves}/>
						</div>
					</span>
				</ListItem>
			</div>
			
		</TabContent>
	</Tabs>
</main>

<style>
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

	.content {
		margin: 2em;
		margin-top: 0;
		color: whitesmoke;
		width: fit-content;
	}

	.setting {
		color: whitesmoke;
	}
	.menu {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 1em;	
	}
</style>
