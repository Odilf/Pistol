<script lang="ts">
	import Menu from '$lib/UI/Menu.svelte'
	import Sidebar from '$lib/UI/Sidebar.svelte'
	import Login from '$lib/profile/Login.svelte'
	import Dashboard from '$lib/profile/Dashboard.svelte';
	import EventManager from '$lib/profile/EventManager.svelte';
	import { user } from '$lib/profile'
	import { events } from '$lib/data/database';

	let showSidebar = false

	$: menuItems = {
		'Dashboard': { component: Dashboard, props: null },
		'Events':  { component: EventManager, props: { events: $events} },
		'Stats': null,
		'Settings': null,
	}
	
	let selectedItem: string

	$: console.log({ events: $events });
</script>

{#if !$user}

	<div class='absolute inset-0 flex flex-col items-center justify-center text-center text-2xl font-light'>
		<span class='my-2'> You're not logged in yet. </span>
		<span class='my-2'> Log in to see your profile! </span>
		<Login/>
	</div>

{:else}

	<header>
		<!-- <button on:click={() => location.href='/'}> Back </button> -->
		<button class='bg-secondary p-4 text-primary rounded clickable md:hidden'
		on:click={() => showSidebar = !showSidebar}> Show menu </button>
	</header>

	<main class='flex h-full'>
		<Sidebar bind:enabled={showSidebar}>
			<menu slot='menu'>
				<Menu items={Object.keys(menuItems)} bind:selected={selectedItem}/>
			</menu>
			
			<div class='bg-secondary/10 h-full mx-8 overflow-y-scroll p-2 py-8'>
				{#if selectedItem === 'Events'}
					<EventManager userEvents={$events}/>
				{/if}
				<!-- <svelte:component this={menuItems[selectedItem]?.component} {...menuItems[selectedItem]?.props}/> -->
			</div>
		</Sidebar>
	</main>

{/if}
