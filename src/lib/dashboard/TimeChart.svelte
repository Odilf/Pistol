<script lang='ts'>
	import type { Session } from '$lib/storage/database'
	import { AreaChart } from "@carbon/charts-svelte"
	import "@carbon/charts/styles-g100.min.css"

	export let session: Session

	$: data = session.solves.slice(0, 20).map(solve => {
		return {
			group: session.name,
			date: solve.date,
			value: solve.time,
			min: solve.time - 10,
			max: solve.time + 10,
		}
	})

	let options = {
	"title": "Bounded area (time series - natural curve)",
	"legend": {
		"enabled": true
	},
	"bounds": {
		"upperBoundMapsTo": "max",
		"lowerBoundMapsTo": "min"
	},
	"axes": {
		"bottom": {
			"title": "2019 Annual Sales Figures",
			"mapsTo": "date",
		},
		"left": {
			"mapsTo": "value",
		}
	},
	"curve": "curveNatural",
	"height": "400px"
}
</script>

<AreaChart {data} {options}/>

<!-- <AreaChart
	data={[
	{
		"group": "Dataset 1",
		"date": "2018-12-31T23:00:00.000Z",
		"value": 47263,
		"min": 40000,
		"max": 50000
	},
	{
		"group": "Dataset 1",
		"date": "2019-01-04T23:00:00.000Z",
		"value": 14178,
		"min": 10000,
		"max": 20000
	},
	{
		"group": "Dataset 1",
		"date": "2019-01-07T23:00:00.000Z",
		"value": 23094,
		"min": 10000,
		"max": 25000
	},
	{
		"group": "Dataset 1",
		"date": "2019-01-12T23:00:00.000Z",
		"value": 45281,
		"min": 42000,
		"max": 50000
	},
	{
		"group": "Dataset 1",
		"date": "2019-01-18T23:00:00.000Z",
		"value": -63954,
		"min": -70000,
		"max": -10000
	}
]}
	{options}
	/> -->
