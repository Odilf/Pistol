<script lang="ts">
	import Menu from '$lib/UI/basic/Menu.svelte'
	import Sidebar from '$lib/UI/misc/Sidebar.svelte'
	import Login from '$lib/profile/Login.svelte'
	import Dashboard from '$lib/profile/Dashboard.svelte';
	import EventManager from '$lib/profile/EventManager.svelte';
	import { userStore as user } from '$lib/profile';

	let showSidebar = false

	let toggleButton: EventTarget
</script>

{#if !$user}

	<div class='absolute inset-0 flex flex-col items-center justify-center text-center text-2xl font-light'>
		<span class='my-2'> You're not logged in yet. </span>
		<span class='my-2'> Log in to see your profile! </span>
		<Login/>
	</div>

{:else}

<header class='bg-secondary text-primary flex min-h-[3em]'>
		<button class='p-4 rounded clickable transition md:hidden sticky top-0'>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path bind:this={toggleButton} stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
			</svg>
		</button>

		<button class='clickable transition ml-4 font-bold text-xl' on:click={() => location.href = '/'}>
			Return
		</button>
	</header>

	<main class='flex h-full'>
		<menu class='text-2xl flex flex-col px-4 w-64 bg-tertiary/50 shadow'>
			<a class='py-2 my-2 clickable transition w-fit' sveltekit:prefetch href='/profile'> Profile </a>
			<a class='py-2 my-2 clickable transition w-fit' sveltekit:prefetch href='/profile/events'> Events </a>
			<a class='py-2 my-2 clickable transition w-fit' sveltekit:prefetch href='/profile/preferences'> Preferences </a>
		</menu>
		
		<div class='h-full overflow-y-scroll px-8 py-8 min-h-screen w-full max-w-2xl mx-auto'>
			<slot/>
		</div>
	</main>

{/if}
