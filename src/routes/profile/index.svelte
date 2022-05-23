<script lang="ts">
	import { userStore } from "$lib/profile";
import Login from "$lib/profile/Login.svelte";

	$: ({
		displayName,
		photoURL,
	} = $userStore)
</script>

<h1 class='text-8xl font-black'> {displayName} </h1>

<img src={photoURL} alt='user profile'>

<Login/>