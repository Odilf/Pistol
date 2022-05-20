import { writable } from "svelte/store";

export function createDelayedStore<T>(initial: T, options: { delay?: number } = {}) {
	const {
		delay = 1000
	} = options

	const { subscribe, set, update } = writable(initial)

	let timeout: NodeJS.Timeout
	let canUpdate = true
	let target: T
	let lastUpdated: T

	return {
		subscribe,
		set: (value: T) => {
			target = value

			if (canUpdate) {
				set(value)
				canUpdate = false

				timeout = setTimeout(() => {
					canUpdate = true
					set(target)
				}, delay)
			}
		},
		update
	}
}