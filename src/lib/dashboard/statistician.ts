// import type { Event, Session, Solve } from '$lib/storage/database'

type DataPoint = {
	average: number,
	range: [number, number],
}

export function mean(times: number[]): number {
	if (!times) return null
	return times.reduce((a, b) => a + b, 0) / times.length
}

export function average(times: number[]): number {
	if (!times) return null
	times.splice(times.indexOf(Math.max(...times)), 1)
	times.splice(times.indexOf(Math.min(...times)), 1)
	return mean(times)
}

export function get_reduced_sample(times: number[], division: number): DataPoint[] {
	const sample_length = times.length / division
	const reduced_array: DataPoint[] = []

	for (let i = 0; i < division; i++) {
		const start = Math.floor(i * sample_length)
		const end = Math.floor((i + 1) * sample_length)
		const sample = times.slice(start, end)

		

		reduced_array.push({
			average: mean(sample), 
			range: [Math.min(...sample), Math.min(...sample)]
		})
	}

	return reduced_array
}
