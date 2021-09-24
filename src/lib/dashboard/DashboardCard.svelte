<script lang='ts'>
	import { slide } from 'svelte/transition'
	import { Card, CardTitle, CardSubtitle, Icon, CardActions, Button } from 'svelte-materialify'
	import { mdiChevronUp } from '@mdi/js'
	import type { Event, Session } from '$lib/storage/database'
	import * as stats from './statistician'
	
	import TimeDisplay from '$lib/timer/TimeDisplay.svelte'
	import Solve from '$lib/navigation/Solve.svelte'

	export let event: Event
	export let session: Session
	export let open = false
	export let index = [0, 0]

	$: times = [...session.solves.map(v => v.time), 20, 30]

	$: average = stats.average(times)
	$: best_solve = session.solves[times.indexOf(Math.min(...times))]

</script>

<main>
	<Card class='ma-4' style='font-size: 10em; background-color: hsl({index[0] * 36}, 69%, {15 - index[1] * 1}%)'>
		<CardTitle class='pt-2'> {event.name} </CardTitle>
		<CardSubtitle class='pb-0'> {session.name} </CardSubtitle>
		<CardSubtitle class='pb-1'> 
			<TimeDisplay time={average} small_decimals={false}> Average: </TimeDisplay> 
			<TimeDisplay time={Math.min(...times)} small_decimals={false}> Best time: </TimeDisplay>
			
			
			{session.solves.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} solves
		</CardSubtitle>


		<CardActions>
			<Button size='small' on:click={() => open = !open} > <Icon path={mdiChevronUp} rotate={open ? 0 : 180} /> </Button>
		</CardActions>

		<CardSubtitle class='pt-1 pb-0'>

			{#if open}
			<div transition:slide>
				<TimeDisplay time={Math.max(...times)} small_decimals={false}> Worst time: </TimeDisplay> 
				<TimeDisplay time={stats.mean(times.slice(-3))} small_decimals={false}> Last Mo3: </TimeDisplay> 
				<TimeDisplay time={stats.mean(times.slice(-5))} small_decimals={false}> Last Ao5: </TimeDisplay> 
				<TimeDisplay time={stats.mean(times.slice(-12))} small_decimals={false}> Last Ao12: </TimeDisplay> 
				<TimeDisplay time={stats.mean(times.slice(-100))} small_decimals={false}> Last Ao100: </TimeDisplay> 

				<div class="solve">	
					Best solve
					<!-- {best_solve} -->
					<Solve solve={best_solve} puzzle={event.scramble}/>
				</div>
			</div>
			{/if}
		</CardSubtitle>
	</Card>
</main>
	
<style>
	main {
		width: min(600px, 100vw);
	}
	.solve {
		padding: 1em 2vw;
		z-index: 1;
	}		
</style>