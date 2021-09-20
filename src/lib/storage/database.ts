import { browser } from "$app/env"
import { writable } from "svelte-local-storage-store"
import { derived } from 'svelte/store'

export const wca_events = ['3x3', '2x2', '4x4', '5x5', '6x6', '7x7', '3BLD', 'FMC', 'OH', 'Clock', 
							'Megaminx', 'Pyraminx', 'Skewb', 'Square-1', '4BLD', '5BLD', 'MBLD', 'Other']

const default_sessions_for_event = [
	{name: '3x3', sessions: ['Main', 'PLL', 'Last layer', 'Alg drill']},
	{name: '2x2', sessions: ['Main', 'Alg drill']},
	{name: '4x4', sessions: ['Main', '3x3 phase', 'Centers', 'Edge pairing']},
	{name: '5x5', sessions: ['Main', '3x3 phase', 'Centers', 'Edge pairing']},
	{name: '6x6', sessions: ['Main', '3x3 phase', 'Centers', 'Edge pairing']},
	{name: '7x7', sessions: ['Main', '3x3 phase', 'Centers', 'Edge pairing']},
	{name: '3BLD', sessions: ['Main', 'Memo-Ex', 'Memo-Edges-Corners', '2-part memo, 2-part execution']},
	{name: 'FMC', sessions: ['Main']},
	{name: 'OH', sessions: ['Main', 'PLL', 'Last layer', 'Algs']},
	{name: 'Clock', sessions: ['Main']},
	{name: 'Megaminx', sessions: ['Main', 'RF2L', 'Last layer']},
	{name: 'Pyraminx', sessions: ['Main']},
	{name: 'Skewb', sessions: ['Main', 'RF2L', 'Last layer']},
	{name: 'Square-1', sessions: ['Main']},
	{name: '4BLD', sessions: ['Main']},
	{name: '5BLD', sessions: ['Main']},
	{name: 'MBLD', sessions: ['Main']},
	{name: 'Other', sessions: ['Main']},
]

const default_session: Session = {
 name: 'Default (test)', scrambles: null, solves: []}

export type Solve = {
	time: number
	penalty: 0 | 2 | 'DNF'
	date: Date
	scramble: string
	reconstruction?: string
	imported?: string
};

export type Session = {
	name: string
	solves: Solve[]
	scrambles: string[]
};

export type Event = {
	name: string
	sessions: Session[]
	hide: boolean
	selected_session: number
	scramble: string
};

type Database = {
	events: Event[]
	selected_event: number
}

function build_default_database(): Database {
	const events: Event[] = []
	// Build default sessions if not specified
	for (const event of wca_events) {
		// i is -1 if default sessions haven't been specified for event
		const i = default_sessions_for_event.map(v => v.name).indexOf(event)
		const sessions = i === -1 
		? [default_session] 
		: default_sessions_for_event[i].sessions.map( v => ({name: v, solves: [], scrambles: null}) )
		
		events.push( {name: event, hide: false, sessions: sessions, selected_session: 0, scramble: event} )
	}
	const db: Database = {events: events, selected_event: 0}
	return db
}

export const database = writable('database', build_default_database())

export const selectable_events = derived(
	database,
	$database => $database.events.filter(v => v.hide === false)
)

export function active_event(callback: (event: Event) => Event = null): Event {
	let event
	const accesor = db => {
		event = db.events[db.selected_event]
		event = callback(event)
		return db
	}

	if (callback) {
		database.update(accesor)
	}
	else {
		callback = v => v
		const unsubscribe = database.subscribe(accesor)
		unsubscribe()	
	}
	return event 
}

export function active_session(callback: (session: Session) => Session = null): Session {
	let session
	const accesor = db => {
		session = db.events[db.selected_event].sessions[db.events[db.selected_event].selected_session]
		session = callback(session)
		return db
	}

	if (callback) {
		database.update(accesor)
	}
	else {
		callback = v => v
		const unsubscribe = database.subscribe(accesor)
		unsubscribe()	
	}
	return session 
}

export async function addSolve(solve: Solve, event: Event): Promise<void> {
	const scramble = await get_random_scramble(event)
	active_session(session => {
		session.solves.push(solve)
		session.scrambles.push(scramble)
		return session
	})
}

export function deleteAllSolves(): void {
	if (!browser) return 
	console.warn('Reseting settings')
	localStorage.removeItem('database')
}

export function deleteSolve(solve: Solve): void {
	active_session(session => {
		const i = session.solves.indexOf(solve)
		session.solves.splice(i, 1)
		return session
	})
}

export function addEvent(name: string, scramble?: string): void {
	database.update(db => {
		const new_event: Event = {
			name: name,
			hide: false,
			sessions: [default_session],
			scramble: scramble ? scramble : null,
			selected_session: 0,
		}
		db.events.push(new_event)

		return db
	})
}

export async function addSession(name: string, event: Event): Promise<void> {
	const scramble = await get_random_scramble(event)
	database.update(db => {
		const new_session: Session = {
			name: name,
			solves: [],
			scrambles: [scramble]
		}
		db.events[db.events.indexOf(event)].sessions.push(new_session)
		return db
	})
}

import { get_random_scramble } from '$lib/scramble/scrambler'

// Remove old scrambles at load time
async function reset_scrambles() {
	let db
	const unsubscribe = database.subscribe(v => db = v)

	for (const event of db.events) {
		for (const session of event.sessions) {
			session.scrambles = [await get_random_scramble(event)]
		}
	}

	database.set(db)

	unsubscribe()
}

reset_scrambles()