import type { Event, Session, Solve } from '$lib/storage/database'

type DataPoint = {
	average: number,
	range: [number, number],
}

export const average = (times: number[]): number => times.reduce((a, b) => a + b, 0) / times.length

export function get_reduced_sample(times: number[], division: number): DataPoint[] {
	const sample_length = times.length / division
	const reduced_array: DataPoint[] = []

	for (let i = 0; i < division; i++) {
		const start = Math.floor(i * sample_length)
		const end = Math.floor((i + 1) * sample_length)
		const sample = times.slice(start, end)

		

		reduced_array.push({
			average: average(sample), 
			range: [Math.min(...sample), Math.min(...sample)]
		})
	}

	return reduced_array
}
