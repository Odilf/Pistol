<script lang='ts'>
import Solve from '$lib/navigation/Solve.svelte';

	import type { Session } from '$lib/storage/database'
	import { AreaChart } from "@carbon/charts-svelte"
	// import "@carbon/charts/styles-g100.min.css"
	import { get_reduced_sample } from './statistician';

	export let session: Session

	$: data = get_reduced_sample(session.solves.map(v => v.time), 20).map(v => {
		return {
			"group": session.name,
			// "date": ,
			"value": v.average,
			"min": v.range[1],
			"max": v.range[0]
		}
	}) 

	let cacadata = [
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
	]

	const options = {
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
			// "scaleType": "time",
		},
		"left": {
			"mapsTo": "value",
			// "scaleType": "linear",
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
