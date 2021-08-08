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
	import { Tabs, Tab, TabContent, ListItem, Button, } from 'svelte-materialify'
	import { settings, resetSettings } from '$lib/settings'
	import Setting from '$lib/settings/Setting.svelte'
	import Back from '$lib/managing/Back.svelte'
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<header>
	<Back></Back>
	<h1>Settings</h1>
</header>

<Tabs vertical >
	<div slot='tabs'>
		{#each $settings as category}
			<Tab> {category.name} </Tab>
		{/each}
	</div>

	{#each $settings as category}
		<TabContent>
			<div class='content'>
				<h2>{category.description}</h2>
					{#each category.settings as setting}
					<ListItem>
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
</Tabs>

<Button on:click={resetSettings}>Reset settings</Button>


<style>
	header {
		display: flex;
		align-items: center;
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
</style>
