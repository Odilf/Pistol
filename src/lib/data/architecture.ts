export enum Penalty {
	None = "none",
	Plus2 = "+2",
	DNF = "DNF",
}

const scrambleTypes = ['3x3', '2x2', '4x4', '5x5', '6x6', '7x7', '3BLD',
					   'Clock', 'Megaminx', 'Pyraminx', 'Skewb', 'Square1',
					   '4BLD', '5BLD', 'MBLD', 'Other'] as const

export type ScrambleType = (typeof scrambleTypes)[number]

export class Solve {
	time: number
	date: Date
	penalty: Penalty
	scramble?: string
	reconstruction?: string

	constructor(time: number, scramble?: string, penalty = Penalty.None) {
		this.time = time
		this.scramble = scramble
		this.penalty = penalty
		this.date = new Date()
	}
}

export class Session {
	name: string

	constructor(name: string) {
		this.name = name
	}
}

interface EventOptions {
	hidden: boolean
}

export class Event {
	name: string
	abbreviation: string
	scrambleType: ScrambleType
	sessions: Session[]
	options: EventOptions

	constructor(name: string, abbreviation?: string, scrambleType?: ScrambleType, options?: EventOptions) {
		this.name = name

		this.abbreviation = abbreviation || name

		if (!scrambleType) {
			if (!scrambleTypes.includes(this.abbreviation as ScrambleType)) {
				console.error(`Tried to create event with scramble that doesn\'t exist (${this.abbreviation})`);
			} else {
				this.scrambleType = this.abbreviation as ScrambleType
			}
		} else {
			this.scrambleType = scrambleType
		}
		this.sessions = [new Session('Main')]

		// Default options
		this.options = Object.assign({
			hidden: true
		}, options)
	}
}

export const defaultEvents = [
	new Event('3x3x3', '3x3', '3x3', { hidden: false }),
	new Event('2x2x2', '2x2'),
	new Event('4x4x4', '4x4'),
	new Event('5x5x5', '5x5'),
	new Event('6x6x6', '6x6'),
	new Event('7x7x7', '7x7'),

	new Event('3x3x3 Blindfolded', '3BLD'),
	new Event('3x3x3 Fewest Moves', 'FMC', '3x3'),
	new Event('3x3x3 One-Handed', 'OH', '3x3'),

	new Event('Clock'),
	new Event('Megaminx'),
	new Event('Pyraminx'),
	new Event('Skewb'),
	new Event('Square1'),

	new Event('4x4x4 Blindfolded', '4BLD', '4x4'),
	new Event('5x5x5 Blindfolded', '5BLD', '5x5'),
	new Event('3x3x3 Multi-Blind', 'MBLD', '3x3'),
] as const

export interface Selection {
	event: Event
	session: Session
}