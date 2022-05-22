<script lang="ts">
	import Slider from '$lib/UI/preferences/Slider.svelte';
	import { preferences } from "$lib/data/preferences";
</script>

<Slider name='Refresh rate' bind:value={$preferences.refreshRate} range={[0, 1000]} snap={{ marks: [69] }}/>
<Slider name='Press delay' bind:value={$preferences.pressDelay} range={[0, 1000]} snap={{ marks: [300, 550, 1000] }}/>
<Slider name='Decimal scalar' bind:value={$preferences.decimalScalar} range={[0, 1]} step={0.05}/>