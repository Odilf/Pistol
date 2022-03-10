import { app } from './firebase'
import { getDatabase, connectDatabaseEmulator, ref, onValue, set, push, query, orderByChild, orderByKey, endAt, startAt, limitToLast } from "firebase/database";
import { browser } from "$app/env";
import type { Session, Solve, Event } from './architecture';
import { writable } from 'svelte/store';
import { debug } from 'svelte/internal';

export const db = browser && getDatabase(app);

type Without<T, K> = {
    [L in Exclude<keyof T, K>]: T[L]
};

interface DatabaseSolves {
	[date: number]: Without<Solve, 'date'>
}

function reshapeSolves(dbSolves: DatabaseSolves): Solve[] {
	if (!dbSolves) return []

	const solves = Object.entries(dbSolves).map((key, _) => {
		let [date, solve] = key
		solve.date = new Date(parseInt(date))
		return solve
	})

	return solves
}

if (browser) {
	if (location.hostname === "localhost") {
		try {
			// Point to the RTDB emulator running on localhost.
			connectDatabaseEmulator(db, "localhost", 9000);
		} catch {
			console.warn("Failed to connect to database emulator");			
		}
	}
}

export async function addSolve(solve: Solve, session: Session, event: Event) {
	const sessionRef = ref(db, `solves/${event.name}/${session.name}/${solve.date.getTime()}`)
	delete solve.date

	await set(sessionRef, solve)
}

export function getSolves(session: Session, event: Event, amount: number = null) {
	const sessionRef = ref(db, `solves/${event.name}/${session.name}`)

	const solvesQuery = amount ? query(sessionRef, orderByKey(), limitToLast(amount)) : query(sessionRef, orderByKey())

	
	onValue(solvesQuery, snapshot => {
		solves.set(reshapeSolves(snapshot.val()))
	})
}

export const solves = writable([] as Solve[])