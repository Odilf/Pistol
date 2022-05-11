import {  ref, onValue, set, query, orderByKey, limitToLast, remove } from "firebase/database"
import type { Session, Solve, Event, Penalty, Selection } from '../architecture'
import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import { db, retrieveData } from './main'
import type { User } from "firebase/auth"

const solvesPrefix = 'Solves'

function sesssionPath(event: Event, session: Session, user: User): string {
	if (!user) {
		throw new Error("Tried to create a path without a logged in user");
	}

	return `${user.uid}/${solvesPrefix}/${event.abbreviation}/${session.name}`
}

export async function addSolve(solve: Solve, { event, session }: Selection, user: User) {
	const sessionRef = ref(db, `${sesssionPath(event, session, user)}/${solve.date.getTime()}`)
	await set(sessionRef, solve)
}

export function getSolves({ event, session }: Selection, user: User, amount: number = null): Writable<Solve[]> {
	if (!db) {
		console.log('Database isn\'t yet initialized');
		return writable([])
	}

	if (!user) {
		console.log('User is not logged in yet');
		return writable([])
	}

	const sessionRef = ref(db, `${sesssionPath(event, session, user)}`)
	const solvesQuery = amount 
	? query(sessionRef, orderByKey(), limitToLast(amount)) 
	: query(sessionRef, orderByKey())

	const solves = writable([] as Solve[])

	onValue(solvesQuery, snapshot => {
		const result = retrieveData(snapshot.val(), 'date', date => new Date(parseInt(date)))
		solves.set(result)
	})
	
	return solves
}

export async function deleteSolve(solve: Solve, { session, event }: Selection, user: User) {
	console.log('Deleting solve', solve);
	
	const solveRef = ref(db, `${sesssionPath(event, session, user)}/${solve.date.getTime()}`)
	remove(solveRef)
}

export async function updateSolvePenalty(solve: Solve, selection: Selection, penalty: Penalty, user: User) {
	solve.penalty = penalty
	await addSolve(solve, selection, user)
}