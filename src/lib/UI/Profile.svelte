<script lang="ts">
	import { auth } from '$lib/storage/firebase';
	import { Dialog, Button } from 'svelte-materialify'

	export let user
	export let active = true
</script>

<Dialog bind:active>
	<h3> Hi dumbass, {user.displayName}</h3>
		
	<img alt='acaca' src={user.photoURL} width="100">
	
	<p> Your uid is {user.uid} </p>

	<Button on:click={() => auth.signOut()}> Logout </Button>
</Dialog>