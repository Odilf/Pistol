import { browser } from "$app/env";
import { writable as LS_writable } from "svelte-local-storage-store";
import { writable, derived } from 'svelte/store'

export const wca_events = ['3x3', '2x2', '4x4', '5x5', '6x6', '7x7', '3BLD', 'FMC', 'OH', 'Clock', 
'Megaminx', 'Pyraminx', 'Skewb', 'Sq-1', '4BLD', '5BLD', 'MBLD']

//TODO: #3 Add correct default se	ssions for each event
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

//Change for non-testing purposes
const default_session: Session = { id: 69, name: 'Default (test)', solves: [
	{time: 4.2, penalty: 0, date: new Date(), scramble: "R U R' U'", reconstruction: ''},
	{time: 5, penalty: 2, date: new Date(), scramble: "I F UR MOM", reconstruction: ''},
	{time: 0.69, penalty: 'DNF', date: new Date(), scramble: "M' S M S'", reconstruction: ''}
]}

export type Solve = {
	time: number
	penalty: 0 | 2 | 'DNF'
	date: Date
	scramble: string
	reconstruction?: string
};

type Session = {
	id: number
	name: string
	solves: Solve[]
};

type Event = {
	name: string
	sessions: Session[]
};




function build_default_database(): Event[] {
	let events: Event[] = []
	for (const event of wca_events) {
		// i is -1 if default sessions haven't been specified for event
		const i = default_sessions_for_event.map(v => v.name).indexOf(event)
		const sessions = i === -1 
		? [default_session] 
		: default_sessions_for_event[i].sessions.map( (v, i) => ({id: i, name: v, solves: []}) )
		
		events = [...events, {name: event, sessions: sessions} ]
	}
	return events
}

const default_events = build_default_database()

export const database = LS_writable('database', default_events)

//Object with selected event id and array of selected sessions id for each event (defaults to 0)
export const selection = writable({event: 0, sessions: wca_events.map(() => 0)})

//Get active event and session from the selection store
export const active_event = derived(
	[selection, database],
	([$selection, $database]) => $database[$selection.event]
)

export const active_session = derived(
	[selection, database],	
	([$selection, $database]) => $database[$selection.event].sessions[$selection.sessions[$selection.event]]
)

export function addSolve(solve: Solve, event: number, session: number): void {

	if (!solve.date) {
		solve.date = new Date()
	}

	database.update(db => {
		db[event].sessions[session].solves.push(solve)
		return db
	})
}

export function deleteAllSolves(): void {
	if (!browser) return 
	console.warn('Reseting settings')
	localStorage.removeItem('database')
}

export function updateDatabase(): void {
	database.update(db => db.slice())
}