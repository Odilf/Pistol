<script lang="ts">
	import { userStore as user } from "$lib/profile";
	import Login from "$lib/profile/Login.svelte";
</script>

<div class='w-full bg-secondary text-primary flex p-2 md:p-4 mb-3 text-lg'>
	<a class='font-black text-2xl mx-2 clickable transition' href="/about" sveltekit:prefetch>
		Pistol
	</a>

	<div class='flex-1'> </div>

	<div class='mx-2'>
		{#if $user}
			<a class='font-extralight text-2xl clickable transition' href='/profile'> 
				{$user.displayName} 
			</a>
		{:else}
			<Login/>
		{/if}
	</div>
</div>