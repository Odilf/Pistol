<script lang="ts">
	import { userStore } from "$lib/profile";
	import Login from "$lib/profile/Login.svelte";
</script>

<h1 class='text-8xl font-black'> {$userStore?.displayName} </h1>

<img src={$userStore?.photoURL} alt='user profile'>

<Login/>