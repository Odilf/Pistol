import { derived, writable, type Writable } from "svelte/store";
import { defaultEvents, Solve } from "./architecture";
import { createFirebaseStore } from "./firebase-store";

export const holdKeyboardShorcuts = writable(false)
export const isOverlayActive = writable(false)

// export const selection = writable({
// 	event: defaultEvents[0],
// 	session: defaultEvents[0].sessions[0]
// })

// export let solves: Writable<{ [date: string]: Solve }> = writable({})

// selection.subscribe(selection => {
// 	const path = `Solves/${selection.event.abbreviation}/${selection.session.name}` as const
// 	const { set, update, subscribe } = createFirebaseStore(path, {})
// 	solves = {
// 		set,
// 		update,
// 		subscribe,
// 	}
// })

// export const solvesArray = derived(solves, solves => {
// 	return Object.entries(solves).map(([date, solve]) => {
// 		solve.date = new Date(parseInt(date))
// 		return solve
// 	})
// })

// solves.subscribe(console.log)