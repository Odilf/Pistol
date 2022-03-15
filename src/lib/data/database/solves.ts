import {  ref, onValue, set, query, orderByKey, limitToLast, remove } from "firebase/database"
import type { Session, Solve, Event } from '../architecture'
import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import { db, retrieveData } from './main'
import { user } from '$lib/profile'
import { getUserEvents } from './events'

const solvesPrefix = 'Solves'

function sesssionPath(event: Event, session: Session): string {
	return `${uid}/${solvesPrefix}/${event.abbreviation}/${session.name}`
}



export async function addSolve(solve: Solve, event: Event, session: Session) {
	if (!uid) {
		console.log('User not logged in when adding solve')
		return
	}

	const sessionRef = ref(db, `${sesssionPath(event, session)}/${solve.date.getTime()}`)
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
		const result = retrieveData(snapshot.val(), 'date', date => new Date(parseInt(date)))
		solves.set(result)
	})

	return solves
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