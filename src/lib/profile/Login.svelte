<script lang="ts">
	import { login, userStore, signOut } from '.'

	$: loggedIn = !!$userStore
</script>

<button on:click={() => loggedIn ? signOut() : login()} class='clickable transition'>
	{loggedIn ? 'Sign out' : 'Log in'}
</button>