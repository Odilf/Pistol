<script lang="ts">
	export let value: number
	export let range: [number, number]
	export let name: string = null
	export let ressetable = true
	export let step = 0
	export let strict = true

	export let snap: {
		marks: number[],
		strength?: number
	} = null

	$: snap && (snap.strength = snap?.strength || (range[1] - range[0])/20)
	$: value = Math.max(range[0], Math.min(value, range[1]))

	function doSnap() {
		snap?.marks.forEach(mark => {
			if (Math.abs(value - mark) < snap.strength) {
				value = mark
			}
		})
	}
</script>

<div class='flex flex-col justify-center items-center p-2 m-2'>
	<div class='flex items-center w-full justify-evenly'>
		{#if name}
			<label for={name} class='text-xl'> {name} </label>
		{/if}
		<input class='font-light text-3xl w-32 rounded text-center' type='number' bind:value>
	</div>
<div class='flex w-full items-center'>
	<input name={name} type='range' {step} class="w-full my-auto mb-3 h-2 shadow bg-primary rounded-lg appearance-none cursor-pointer dark:bg-secondary" bind:value min={range[0]} max={range[1]} on:input={() => doSnap()}>

	{#if ressetable}
		<button class='m-2 clickable transition' on:click={() => value = null}>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
				<path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
			</svg>
		</button>
	{/if}
</div>
</div>
