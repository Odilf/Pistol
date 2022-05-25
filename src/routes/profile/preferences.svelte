<script lang="ts">
	import Slider from '$lib/UI/preferences/Slider.svelte';
	import { preferences } from "$lib/data/preferences";
	import Select from '$lib/UI/preferences/Select.svelte';
import Overlay from '$lib/UI/basic/Overlay.svelte';

	let showResetConfirm = false
</script>

<div class='grid place-items-center md:grid-cols-[1fr_3fr] gap-2'>
	<span> Refresh rate (ms) </span>
	<Slider bind:value={$preferences.refreshRate} range={[0, 1000]} snap={{ marks: [69] }}/>

	<span> Press delay (ms) </span>
	<Slider bind:value={$preferences.pressDelay} range={[0, 1000]} snap={{ marks: [300, 550, 1000] }}/>

	<span> Decimal scalar </span>
	<Slider bind:value={$preferences.decimalScalar} range={[0, 1]} step={0.01}/>

	<span> Main timer decimal scalar </span>
	<Slider bind:value={$preferences.mainTimerDecimalScalar} range={[0, 1]} step={0.01}/>
	
	<span> Stop timer with </span>
	<Select bind:value={$preferences.stopTimerWith} 
	options={[
		{ name: 'Only space', value: 'space' },
		{ name: 'Alphanumeric and space', value: 'alphanumeric' },
		{ name: 'Anything', value: 'anything' },
	]}/>

	<span> These are </span>
	<Select bind:value={$preferences.stopTimerWith} 
	options={[
		{ name: 'some', value: 'space' },
		{ name: 'other', value: 'alphanumeric' },
		{ name: 'options', value: 'anything' },
	]}/>
</div>

<div class='w-full flex justify-center my-16'>
	<button class='bg-red-700 clickable transition active:bg-red-800 text-primary p-2 rounded shadow'
	on:click={() => showResetConfirm = true}>
		Reset all settings
	</button>
</div>

<Overlay bind:enabled={showResetConfirm}>
	<div class='text-lg'>
		This will reset all your setting to their default values.
	</div>

	<div class='font-bold text-lg mb-10'>
		You cannot undo this action. 
	</div>

	<div> Are you sure you want to continue? </div>
	<div class='flex'>
		<button class='clickable transition bg-green-700 p-2 m-2 flex-1 rounded shadow text-primary'
		on:click={() => showResetConfirm = false}> 
			Cancel 
		</button>
		<button class='clickable transition bg-red-700 p-2 m-2 flex-1 rounded shadow text-primary'
		on:click={() => { $preferences = {}; showResetConfirm = false }}> 
			Yes, reset all my settings 
		</button>
	</div>
</Overlay>

<style lang='postcss'>
	span {
		@apply mt-4 md:my-auto text-center;
	}
</style>