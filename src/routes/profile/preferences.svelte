<script lang="ts">
	import Slider from '$lib/UI/preferences/Slider.svelte';
	import { preferences } from "$lib/data/preferences";
</script>

<Slider name='Refresh rate' bind:value={$preferences.refreshRate} range={[0, 1000]} snap={{ marks: [69] }}/>
<Slider name='Press delay' bind:value={$preferences.pressDelay} range={[0, 1000]} snap={{ marks: [300, 550, 1000] }}/>