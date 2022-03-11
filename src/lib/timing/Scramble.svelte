<script lang="ts">
	import type { ScrambleType } from "$lib/data/architecture";
	import { events } from "$lib/data/database";
	import { getRandomScramble } from "$lib/scramble/scrambler";
	
	export let scrambleType: ScrambleType

	$: scramble = getRandomScramble(scrambleType)
</script>

{#await scramble}
	<div class='w-fit text-center mx-auto max-w-screen-md'>
		Loading scramble...
	</div>
{:then scramble} 
	<div class='w-fit text-center mx-auto max-w-screen-md font-light {scramble.length > 100 ? 'text-lg' : 'text-2xl'}'>
		{scramble}
	</div>
{/await}