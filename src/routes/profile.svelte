<!-- <script lang="ts">
	import Menu from '$lib/UI/basic/Menu.svelte'
	import Sidebar from '$lib/UI/misc/Sidebar.svelte'
	import Login from '$lib/profile/Login.svelte'
	import Dashboard from '$lib/profile/Dashboard.svelte';
	import EventManager from '$lib/profile/EventManager.svelte';
	// import { user } from '$lib/profile'
	// import { events } from '$lib/data/database';

	let showSidebar = false

	$: menuItems = [
		'Dashboard',
		'Events',
		'Stats',
		'Settings',
	]
	
	let selectedItem: string
</script>

{#if !$user}

	<div class='absolute inset-0 flex flex-col items-center justify-center text-center text-2xl font-light'>
		<span class='my-2'> You're not logged in yet. </span>
		<span class='my-2'> Log in to see your profile! </span>
		<Login/>
	</div>

{:else}

<header class='bg-secondary text-primary flex min-h-[3em]'>
		<button class='p-4 rounded clickable md:hidden sticky top-0'
		on:click={() => showSidebar = !showSidebar}>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
			</svg>
		</button>

		<button class='clickable ml-4 font-bold' on:click={() => location.href = '/'}>
			Return
		</button>
	</header>

	<main class='flex h-full'>
		<Sidebar bind:enabled={showSidebar}>
			<menu slot='menu' class='text-2xl'>
				<Menu items={menuItems} bind:selected={selectedItem}/>
			</menu>
			
			<div class='bg-secondary/10 h-full mx-8 overflow-y-scroll p-2 py-8'>
				{#if selectedItem === 'Events'}
					<EventManager userEvents={$events}/>
				{:else if selectedItem === 'Dashboard'}
					<Dashboard/>
				{/if}
			</div>
		</Sidebar>
	</main>

{/if} -->
