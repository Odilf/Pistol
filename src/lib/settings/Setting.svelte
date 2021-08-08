<script lang='ts'>
	import { settings } from '$lib/settings'
	import type { GeneralSetting as Setting} from '$lib/settings'; 
	import { Menu, Switch, ListItem, List, Button } from 'svelte-materialify'
	export let setting: Setting
	export let disabled = false

	let disable_child
	$: if (setting.child) {
		disable_child = (setting.child.parent !== setting.value)
	}
</script>

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
	<!-- TODO: #38 Make sliders work in settings -->
	<!-- <Slider min={setting.min} max={setting.max}/> -->
{:else}
	<Switch bind:checked={setting.value} color=red/>
{/if}

{#if setting.child}
	<div class:disable={disable_child}>
		<svelte:self disabled={disable_child} bind:setting={setting.child}/>
	</div>
{/if}

<style>
	.disable {
		color: grey;
	}
</style>