<script lang="ts">
import Reset from "../icons/Reset.svelte"

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

	// Clamp value between range
	$: if (strict) { value = Math.max(range[0], Math.min(value, range[1])) }

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
			<Reset/>
		</button>
	{/if}
</div>
</div>
