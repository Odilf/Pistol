<script lang="ts">
import { browser } from '$app/env';

	import { Button } from 'svelte-materialify'
	import Profile from './Profile.svelte';

	let active

	import { auth, googleProvider } from '$lib/storage/firebase'
	import { signInWithRedirect } from 'firebase/auth'
	import { authState } from 'rxfire/auth'
	
	let user = authState(auth)

	function login() {
		signInWithRedirect(auth, googleProvider)
	}

</script>

<section>
	{#if $user}
		<Button on:click={() => active = !active}> Profile </Button>
		<Profile user={$user} bind:active/>
	{:else}
		<Button on:click={login}> Signin with Google</Button>
	{/if}
</section>