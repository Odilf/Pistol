import { writable } from "svelte/store";

//TODO: #3 Add correct default sessions for each event
export const wca_events = ['3x3', '2x2', '4x4', '5x5', '6x6', '7x7', '3BLD', 'FMC', 'OH', 'Clock', 
							'Megaminx', 'Pyraminx', 'Skewb', 'Sq-1', '4BLD', '5BLD', 'MLBD']

const default_sessions_for_event = [
	{name: '3x3', sessions: ['Main', 'PLL', 'Last layer', 'Algs']},
	{name: '3BLD', sessions: ['Main', 'Memo-Ex', 'Memo-Edges-Corners', '2-part memo, 2-part execution']}
]

//Change for non-testing purposes
const default_session: Session = { id: 69, name: 'Default (test)', solves: [
	{id: 0, time: 4.2, date: new Date(), scramble: "R U R' U'", reconstruction: ''},
	{id: 0, time: 5, date: new Date(), scramble: "I F UR MOM", reconstruction: ''},
	{id: 0, time: 0.69, date: new Date(), scramble: "M' S M S'", reconstruction: ''}
]}

export type Solve = {
	id: number;
	time: number;
	date: Date;
	scramble: string;
	reconstruction: string
};

type Session = {
	id: number;
	name: string;
	solves: Solve[];
};

type Event = {
	name: string;
	sessions: Session[];
};

let events: Event[] = []

function build_default_database() {
	for (const event of wca_events) {
		//i is -1 if default sessions haven't been specified for event
		const i = default_sessions_for_event.map(v => v.name).indexOf(event)
		const sessions = i === -1 
		? [default_session] 
		: default_sessions_for_event[i].sessions.map( (v, i) => ({id: i, name: v, solves: []}) )
		
		events = [...events, {name: event, sessions: sessions} ]
	}
}

build_default_database()

export const database = writable(events)