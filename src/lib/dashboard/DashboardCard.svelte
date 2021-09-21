<script lang='ts'>
	import { Card, CardTitle, CardSubtitle, CardText, CardActions } from 'svelte-materialify'
	import type { Event, Session, Solve } from '$lib/storage/database'

	import TimeChart from './TimeChart.svelte'
	import * as stats from './statistician'

	export let event: Event
	export let session: Session

	let average = (session.solves.map(v => v.time).reduce((v, u) => v + u, 0) / session.solves.length).toFixed(3)

</script>

<Card class='d-flex ma-8 red darken-4'>
	{stats.get_reduced_sample(session.solves.map(v => v.time), 20)}
	<CardTitle> {event.name} </CardTitle>
	<CardSubtitle> {average} </CardSubtitle>
	<TimeChart {session}/>
</Card>