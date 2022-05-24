<script lang="ts">
	import Login from '$lib/profile/Login.svelte'
	import { userStore as user } from '$lib/profile';
	import { clickOutside } from '$lib/utils';

	let showSidebar = false
</script>

{#if !$user}

	<div class='absolute inset-0 flex flex-col items-center justify-center text-center text-2xl font-light'>
		<span class='my-2'> You're not logged in yet. </span>
		<span class='my-2'> Log in to see your profile! </span>
		<Login/>
	</div>

{:else}

	<header class='bg-secondary text-primary flex min-h-[3em] sticky top-0 z-20'>
		<button class='clickable transition ml-4 font-bold text-xl' on:click={() => location.href = '/'}>
			Return
		</button>

		<spacer class='flex-1'/>

		<button class='p-4 rounded clickable transition md:hidden sticky top-0'
		on:click|capture={() => showSidebar = !showSidebar}>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
			</svg>
		</button>
	</header>

	<main class='flex h-full relative'>
		<menu class='fixed z-10 md:sticky top-0 text-2xl bg-primary flex flex-col px-4 w-64 font-black items-center justify-center h-[90vh]
		transition {showSidebar ? 'shadow-xl' : '-translate-x-full md:translate-x-0'}' use:clickOutside={{ callback: e => {
			if (showSidebar) {;
				e.stopPropagation()
				showSidebar = false
			}
		}}}>
			<a class='py-2 my-2 clickable transition w-fit' sveltekit:prefetch href='/profile'> PROFILE </a>
			<a class='py-2 my-2 clickable transition w-fit' sveltekit:prefetch href='/profile/events'> EVENTS </a>
			<a class='py-2 my-2 clickable transition w-fit' sveltekit:prefetch href='/profile/preferences'> PREFERENCES </a>
		</menu>
		
		<div class='h-full overflow-y-scroll px-8 py-8 min-h-screen w-full max-w-2xl mx-auto'>
			<slot/>
		</div>
	</main>

{/if}
