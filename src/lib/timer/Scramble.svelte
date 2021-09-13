<script lang='ts'>
	import { scrambles } from '$lib/scramble/scrambler'
	import { selection } from '$lib/storage/time_db'
</script>

<p>
	{$scrambles[$selection.event][$scrambles[$selection.event].length - 1]}
</p>

<style lang="scss">
	p {
		font-size: 1.2em;
		// margin: 200px, 100px, 0;
		margin-top: 1em;
		margin-bottom: 0;
	}
</style>