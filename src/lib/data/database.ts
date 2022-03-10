import { app } from './firebase'
import { getDatabase, connectDatabaseEmulator, ref, onValue, set, query, orderByKey, limitToLast, get } from "firebase/database";
import { browser } from "$app/env";
import { type Session, type Solve, type Event, defaultEvents } from './architecture';
import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

import { user } from '$lib/user';

export const db = browser && getDatabase(app);

let uid = null
user.subscribe(user => {
	uid = user && `User-${user.uid}`
})

const solvesPrefix = 'Solves'
const eventsPrefix = 'Events'
const settingsPrefix = 'Settings'

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
	const sessionRef = ref(db, `${uid}/${solvesPrefix}/${event.name}/${session.name}/${solve.date.getTime()}`)
	delete solve.date

	await set(sessionRef, solve)
}

export function getSolves(session: Session, event: Event, amount: number = null): Writable<Solve[]> {
	if (!db) {
		console.log('Database isn\'t yet initialized');
		return writable([])
	}
	const sessionRef = ref(db, `${uid}/${solvesPrefix}/${event.name}/${session.name}`)

	const solvesQuery = amount ? query(sessionRef, orderByKey(), limitToLast(amount)) : query(sessionRef, orderByKey())

	const solves = writable([] as Solve[])

	onValue(solvesQuery, snapshot => {
		solves.set(reshapeSolves(snapshot.val()))
	})

	return solves
}

export async function getUserEvents(): Promise<Event[]> {
	const eventRef = ref(db, `${uid}/${eventsPrefix}`)
	let snapshot = await get(eventRef)
	const events = snapshot.val() as Event[]

	if (!events) {
		console.log('No events!');
		await set(eventRef, defaultEvents)
	}

	return defaultEvents
}