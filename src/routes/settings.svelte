<script context="module">
	import { browser } from '$app/env';
	
	// Route if came from browser or smth
	export const router = browser;
	export const prerender = true;
</script>

<script lang='ts'>
	import { Tabs, Tab, TabContent, ListItem, Button } from 'svelte-materialify'
	import { settings, resetSettings } from '$lib/settings'
	import Setting from '$lib/settings/Setting.svelte'
	import Back from '$lib/utils/Back.svelte'
	import { deleteAllSolves } from '$lib/storage/time_db'
	import ConfirmationButton from '$lib/utils/ConfirmationButton.svelte'

	import { fly } from 'svelte/transition'
	import { onMount } from 'svelte'

	let tabs_active	= true
	function toggleTabs() {
		tabs_active = !tabs_active
		console.log(tabs_active);
	}
	
	let width: number
	
</script>

<svelte:head>
	<title>Settings</title>
</svelte:head>

<header>
	<div class="menu">
		<Back/>

		<Button fab on:click={toggleTabs}>
			<!-- Menu button -->
			<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><g fill="none"><path d="M0 0h24v24H0V0z"/><path d="M0 0h24v24H0V0z" opacity=".87"/></g><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7zm-4 6h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>
		</Button>
	</div>
	<h1>Settings</h1>
</header>

<svelte:window bind:innerWidth={width}/>

<main>
	<!-- <Button on:click={toggleTabs}> Me	nu </Button> -->
	<Tabs vertical>
		<div slot='tabs'>
			{#if tabs_active}
				<div transition:fly={{x: -69, duration: 500}}>
					{#each $settings as category}
						<Tab> {category.name} </Tab>
					{/each}
						<Tab>User</Tab>
				</div>
			{/if}
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
		
		<!-- User Configuration settings -->
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
