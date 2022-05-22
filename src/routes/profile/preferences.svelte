<script lang="ts">
	import Slider from '$lib/UI/preferences/Slider.svelte';
	import { preferences } from "$lib/data/preferences";
</script>

<Slider name='Refresh rate' bind:value={$preferences.refreshRate} range={[0, 1000]} snap={{ marks: [69] }}/>
<Slider name='Press delay' bind:value={$preferences.pressDelay} range={[0, 1000]} snap={{ marks: [300, 550, 1000] }}/>

<label for="default-range" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default range</label>
<input id="default-range" type="range" value="50" >