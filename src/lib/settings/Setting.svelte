<script lang='ts'>
	import '../../app.css'
	import { settings } from '$lib/settings'
	import type { GeneralSetting as Setting} from '$lib/settings'; 
	import { Menu, Switch, ListItem, List, Button, Slider } from 'svelte-materialify'
	export let setting: Setting
	export let disabled = false

	let disable_child
	$: if (setting.child) {
		disable_child = (setting.child.parent !== setting.value)
	}
</script>

<main>

	{#if 'options' in setting }
	<Menu offsetX offsetY={false} nudgeY={-10} hover>
		<div slot="activator">
			<Button {disabled} active={false}>{setting.options[setting.value]}</Button>
		</div>
		{#if !disabled}
		<List>
			{#each setting.options as option, i}
			<ListItem on:click={() => setting.value = i}> {option} </ListItem>
			{/each}
		</List>
		{/if}
	</Menu>
	
	{:else if 'min' in setting}
	<input type="range" min={setting.min} max={setting.max} bind:value={setting.value}/>
	<p>
		{setting.value}
	</p>
	{:else}
	<Switch bind:checked={setting.value} color=red/>
	{/if}
	
	{#if setting.child}
	<div class:disable={disable_child}>
		<svelte:self disabled={disable_child} bind:setting={setting.child}/>
	</div>
	{/if}
</main>
	
<style>
	p {
		margin: 0;
		margin-left: 1em;
		font-weight: 700;
		font-size: 1em;
	}
	main {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.disable {
		color: grey;
	}
	/* TODO: #60 Make slider the correct color */
	input {
		background-color: red;
		color: red;
	}
</style>