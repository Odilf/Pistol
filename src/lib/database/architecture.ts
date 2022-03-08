enum Penalty {
	None = "none",
	Plus2 = "+2",
	DNF = "DNF",
}

export type ScrambleType = '3x3' | '2x2' | '4x4' | '5x5' | '6x6' | '7x7' 
						 | 'Clock' | 'Megaminx' | 'Pyraminx' | 'Skewb' | 'Square1'
						 | '4BLD' | '5BLD' | 'MBLD'

interface EventType {
	name: string
	abbreviation: string
	scramble: ScrambleType
}

export const events: EventType[] = [
	{ name: '3x3x3', abbreviation: '3x3', scramble: '3x3' },
	{ name: '2x2x2', abbreviation: '2x2', scramble: '2x2' },
	{ name: '4x4x4', abbreviation: '4x4', scramble: '4x4' },
	{ name: '5x5x5', abbreviation: '5x5', scramble: '5x5' },
	{ name: '6x6x6', abbreviation: '6x6', scramble: '6x6' },
	{ name: '7x7x7', abbreviation: '7x7', scramble: '7x7' },

	{ name: '3x3x3 Blindfolded', abbreviation: '3BLD', scramble: '3x3' },
	{ name: '3x3x3 Fewest Moves', abbreviation: 'FMC', scramble: '3x3' },
	{ name: '3x3x3 One-Handed', abbreviation: 'OH', scramble: '3x3' },

	{ name: 'Clock', abbreviation: 'Clock', scramble: 'Clock' },
	{ name: 'Megaminx', abbreviation: 'Megaminx', scramble: 'Megaminx' },
	{ name: 'Pyraminx', abbreviation: 'Pyraminx', scramble: 'Pyraminx' },
	{ name: 'Skewb', abbreviation: 'Skewb', scramble: 'Skewb' },
	{ name: 'Square1', abbreviation: 'Square1', scramble: 'Square1' },

	{ name: '4x4x4 Blindfolded', abbreviation: '4BLD', scramble: '4x4' },
	{ name: '5x5x5 Blindfolded', abbreviation: '5BLD', scramble: '5x5' },
	{ name: '3x3x3 Multi-Blind', abbreviation: 'MBLD', scramble: 'MBLD' },
]

export function getEventType(abbreviation: string): EventType {
	const event = events.find(event => event.abbreviation === abbreviation)
	if (!event) 
		console.error(`Tried to find event ${abbreviation}, which doesn't exist`)
	return event
}

export class Solve {
	time: number
	date: Date
	penalty: Penalty
	scramble: string
	reconstruction?: string

	constructor(time: number, scramble: string, penalty = Penalty.None) {
		this.time = time
		this.scramble = scramble
		this.penalty = penalty
		this.date = new Date()
	}
}

export class Session {
	name: string
	solves: Solve[]

	constructor(name: string) {
		this.name = name
		this.solves = []
	}

	addSolve(solve: Solve): void {
		this.solves = [...this.solves, solve]
	}
}

export class Event {
	name: string
	type: EventType
	sessions: Session[]

	constructor(name: string, type: EventType = null) {
		this.name = name

		if (type) {
			this.type = type
		} else {
			this.type = getEventType(this.name)
		}
		this.sessions = [new Session('Main')]
	}

	addSession(session: Session): void {
		this.sessions = [...this.sessions, session]
	}
}
