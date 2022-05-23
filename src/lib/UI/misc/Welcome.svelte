<script lang="ts">
	import { browser } from "$app/env";
	import type { Event } from "$lib/data/architecture";
	import Overlay from "../basic/Overlay.svelte";

	export let events: Event[]
	export let hasVisitedBefore = browser ? !!localStorage.getItem('hasVisitedBefore') : true

	function visit() {
		hasVisitedBefore = true
		localStorage.setItem('hasVisitedBefore', 'yup')
	}
</script>

<Overlay enabled={!hasVisitedBefore} on:close={() => visit()}>
	<div class='px-4 h-full mt-40 max-w-xl'>
		<h1 class='text-6xl text-center'> Welcome to Pistol! </h1>

		<div class='opacity-50 text-center text-xl w-full mb-8'> Help us tailor Pistol to your style </div>

		<section class='mb-10'>				
			<h2 class='text-3xl text-center'> What events do you practice? </h2>

			<ul class='flex flex-wrap justify-center items-center'>
				{#each events as event}
					<li> <button class='clickable transition text-xl p-2 bg-secondary rounded font-bold text-primary m-2
						{event.options.hidden && 'opacity-50'}'
						on:click={() => event.options.hidden = !event.options.hidden}>
						{event.abbreviation}
					</button> </li>
				{/each}
			</ul>
			<div class='opacity-50 text-center text-lg w-full'>
				You can always change this later
			</div>
		</section>	

		<!-- <h2 class='text-3xl text-center'> What method do you use on 3x3? </h2>

		<ul class='flex flex-wrap justify-center items-center mb-10'>
			{#each ['CFOP', 'Roux', 'ZZ', 'ZZCT', 'Petrus'] as methodName}
				<li class='text-xl p-2 bg-secondary rounded font-bold text-primary m-2'>
					<button class='clickable transition'>
						{methodName}
					</button>
				</li>
			{/each}
		</ul> -->

		<button class='clickable transition w-full text-3xl font-black'
		on:click={() => visit()}> Done </button>
	</div>
</Overlay>