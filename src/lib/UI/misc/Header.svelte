<script lang="ts">
	import { user } from "$lib/profile";
import Login from "$lib/profile/Login.svelte";
</script>

<div class='w-full bg-secondary text-primary flex p-2 md:p-4 mb-3 text-lg'>
	<button class='font-black text-2xl mx-2 clickable'>
		Pistol
	</button>

	<div class='flex-1'> </div>

	<div class='mx-2'>
		{#if $user}
			<button class='font-extralight text-2xl clickable' on:click={() => location.href = '/profile'}> 
				{$user.displayName} 
			</button>
		{:else}
			<Login/>
		{/if}
	</div>
</div>