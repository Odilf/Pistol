import type { Solve, Selection } from "$lib/data/architecture"
import { createFirebaseStore } from "$lib/data/firebase-store"
import { derived } from "svelte/store"

export function getSolvesStore(selection: Selection) {
	const path = `Solves/${selection.event.abbreviation}/${selection.session.name}` as const
	const solves = createFirebaseStore(path, {} as { [date: number]: Solve }, { amount: 10 })
	const solvesArray = derived(solves, solves => {
		return Object.entries(solves).map(([date, solve]) => {
			solve.date = new Date(parseInt(date))
			return solve
		})
	})


	return { solves, solvesArray }
}