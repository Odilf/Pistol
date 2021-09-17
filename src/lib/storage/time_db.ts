import { browser } from "$app/env";
// import { updateSettings } from "$lib/settings";
import { writable } from "svelte-local-storage-store";
import { derived } from 'svelte/store'

export const wca_events = ['3x3', '2x2', '4x4', '5x5', '6x6', '7x7', '3BLD', 'FMC', 'OH', 'Clock', 
							'Megaminx', 'Pyraminx', 'Skewb', 'Sq-1', '4BLD', '5BLD', 'MBLD']

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
	{name: 'Sq-1', sessions: ['Main']},
	{name: '4BLD', sessions: ['Main']},
	{name: '5BLD', sessions: ['Main']},
	{name: 'MBLD', sessions: ['Main']},
]

const default_session: Session = {
 name: 'Default (test)', scrambles: null, solves: []}

export type Solve = {
	time: number
	penalty: 0 | 2 | 'DNF'
	date: Date
	scramble: string
	reconstruction?: string
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
	scramble?: string
};

type Database = {
	events: Event[],
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
		
		events.push( {name: event, hide: false, sessions: sessions, selected_session: 0} )
	}
	return {events: events, selected_event: 0}
}

export const database = writable('database', build_default_database())

checkSelection()

export const selectable_events = derived(
	database,
	$database => $database.events.filter(v => v.hide === false)
)

export const active_event = derived(
	database,
	$database => $database.events[$database.selected_event]
)

export const active_session = derived(
	active_event,
	$active_event => $active_event.sessions[$active_event.selected_session]
)

// Checks if selection aren't out of bounds
function checkSelection(): void {
	let db: Database
	const unsubcribe = database.subscribe(v => db = v)

	if (db.selected_event > db.events.length || db.selected_event < 0) { 
		console.warn(`Event selection was ${db.selected_event}`);
		db.selected_event = 0
		
	}
	
	for (const event of db.events) {
		if (event.selected_session > event.sessions.length || event.selected_session < 0) {
			console.warn(`Event ${event.name}'s selection was ${db.selected_event}`);
			event.selected_session = 0
		}
	}

	updateDatabase()
	unsubcribe()
}

export function addSolve(solve: Solve): void {
	let event: Event
	const unsubcribe = active_event.subscribe(v => event = v)
	const session = event.sessions[event.selected_session]

	if (!solve.date) {
		solve.date = new Date()
	}

	solve.scramble = session.scrambles[session.scrambles.length - 1]

	session.solves.push(solve)
	session.scrambles.push(get_random_scramble(event))

	unsubcribe()
}

active_session.subscribe(v => console.log(v))

export function deleteAllSolves(): void {
	if (!browser) return 
	console.warn('Reseting settings')
	localStorage.removeItem('database')
}

export function deleteSolve(solve: Solve): void {
	let session
	const unsubcribe = active_session.subscribe(v => session = v)

	const i = session.solves.indexOf(solve)
	session.solves.splice(i, 1)
	updateDatabase()
	unsubcribe()
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
	updateDatabase()
}

export function addSession(name: string, event: Event): void {
	let db: Database
	const unsubcribe = database.subscribe(v => db = v)

	const new_session: Session = {
		name: name,
		solves: [],
		scrambles: [get_random_scramble(event)]
	}
	db.events[db.events.indexOf(event)].sessions.push(new_session)
	unsubcribe()
}

export function updateDatabase(): void {
	database.update(db => { return {events: db.events, selected_event: db.selected_event}})
}

import { get_random_scramble } from '$lib/scramble/scrambler'

// Remove old scrambles at load time
database.update($database => {
	for (const event of $database.events) {
		for (const session of event.sessions) {
			session.scrambles = [get_random_scramble(event)]
		}
	}
	return $database
})