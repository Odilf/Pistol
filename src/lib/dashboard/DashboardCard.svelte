<script lang='ts'>
	import { Card, CardTitle, CardSubtitle, CardText, CardActions } from 'svelte-materialify'
	import type { Event, Session, Solve } from '$lib/storage/database'

	import TimeChart from './TimeChart.svelte'
	import Back from '$lib/utils/Back.svelte';

	export let event: Event
	export let session: Session

	let average = (session.solves.map(v => v.time).reduce((v, u) => v + u, 0) / session.solves.length).toFixed(3)

</script>

<Back/>

<Card class='d-flex ma-8 red darken-4'>
	<CardTitle> {event.name} </CardTitle>
	<CardSubtitle> {average} </CardSubtitle>
	<!-- <TimeChart {session}/> -->
</Card>