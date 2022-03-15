<script>
	import { user, login, signOut } from ".";
</script>

<div class='text-3xl flex flex-col items-center p-2 bg-accent rounded-xl'>
	{#if !$user}
	<button on:click={login}> Login </button>	
	{:else}
	<div class='font-bold'>
		{$user.displayName}
	</div>
	
	<img src={$user.photoURL} alt='Profile' class='p-2'>
	<button on:click={signOut} class='text-xl'> Sign out </button>
	{/if}
</div>