<script lang=ts>
	import { quadIn } from 'svelte/easing';

	let value
	let button
	$: height = button ? button.clientWidth : null

	let mouse = { x: 0, y: 0 }
	let wh
	let ww

	function handleClick() {
		console.log(wh, ww);
		
		value = {}
	}

	function handleMousemove(event) {
		mouse.x = event.clientX;
		mouse.y = event.clientY;
	}

	function ripple(node, { duration = 1000 }) {
		return {
			duration: duration,
			easing: t => quadIn(t),
			css: (t, u) => {
			return 	`
				transform: translate(-50%, -50%) translate(${mouse.x}px, ${mouse.y}px) scale(${t}); 
				opacity: ${u};
				`
			}
		}
	}
</script>

<svelte:window on:mousemove={handleMousemove}  bind:innerHeight={wh} bind:innerWidth={ww}/>

{mouse.x}
{mouse.y}

<button on:click={handleClick} bind:this={button}>
	{#key value}
	<span in:ripple></span>
	{/key}
	<slot/>
</button>

<style lang=scss>
	button { 
		// position: relative;
		overflow: hidden;
		background-color: red;
		height: 2em;
	}

	span {
		position: absolute;
		width: max(100vw, 100vh);
		height: max(100vw, 100vh);
		border-radius: 50%;

		left: 0;
		top: 0;
		transform: translate(-50%, -50%);
		// transform: translate(-100px, -20px);
		background-color: rgba(255, 255, 255, 0.7);
	}
</style>