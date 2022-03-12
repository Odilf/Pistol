import { app } from './firebase'
import { getDatabase, connectDatabaseEmulator, ref, onValue, set, query, orderByKey, limitToLast, get, remove } from "firebase/database";
import { browser } from "$app/env";
import { type Session, Solve, Event, defaultEvents } from './architecture';
import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

import { user } from '$lib/user';

export const db = browser && getDatabase(app);

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

function sesssionPath(event: Event, session: Session): string {
	return `${uid}/${solvesPrefix}/${event.abbreviation}/${session.name}`
}

export async function addSolve(solve: Solve, event: Event, session: Session) {
	if (!uid) {
		console.log('User not logged in when adding solve')
		return
	}
	const sessionRef = ref(db, `${sesssionPath(event, session)}/${solve.date.getTime()}`)
	delete solve.date
	await set(sessionRef, solve)

}

export function getSolves(event: Event, session: Session, amount: number = null): Writable<Solve[]> {
	if (!db) {
		console.log('Database isn\'t yet initialized');
		return writable([])
	}

	const sessionRef = ref(db, `${sesssionPath(event, session)}`)

	const solvesQuery = amount ? query(sessionRef, orderByKey(), limitToLast(amount)) : query(sessionRef, orderByKey())

	const solves = writable([] as Solve[])

	onValue(solvesQuery, snapshot => {
		solves.set(reshapeSolves(snapshot.val()))
	})

	return solves
}

export const events = writable(defaultEvents as Event[])

async function getUserEvents(): Promise<void> {
	if (!db) {
		console.log('Database not yet initialized');
		return
	}
	if (!uid) {
		console.log('Tried to retrieve user events without a loggen in user');
		return
	}

	console.log('Getting events of user', uid);
	
	const eventRef = ref(db, `${uid}/${eventsPrefix}`)
	let snapshot = await get(eventRef)
	const dbEvents = snapshot.val() as Event[]

	if (!dbEvents) {
		console.log('No events!');
		await set(eventRef, defaultEvents)
	}

	events.set(dbEvents)
}

export async function deleteSolve(solve: Solve, event: Event, session: Session) {
	console.log('Deleting solve', solve);
	
	const solveRef = ref(db, `${sesssionPath(event, session)}/${solve.date.getTime()}`)
	remove(solveRef)
}

let uid = null
user.subscribe(async(user) => {
	uid = user && `User-${user.uid}`
	getUserEvents()
})