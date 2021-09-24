import { database, addSession } from '$lib/storage/database'
import type { Event, Solve } from '$lib/storage/database'

export type csSession = {
	name: string,
	scramble_type: string,
	solves: Solve[]
	event: Event,
	import: boolean,
}

export function parseImport(json: string): csSession[] {

	let $database
	const unsubscribe = database.subscribe(v => $database = v)
	unsubscribe()

	// For session data proper formatting
	json.replace(/'/g, '"')

	type SessionData = {
		date: unknown[],
		name: string,
		opt: {scrType: string},
		rank: number,
		stat: number[],
	}

	const cstimer = JSON.parse(json)
	const sessionData: SessionData[] = Object.values(JSON.parse(cstimer.properties.sessionData))
	const sessionSolves = Object.values(cstimer).slice(0, -1) as unknown[][]

	const csSessions: csSession[] = []
	

	for (let i = 0; i < sessionSolves.length; i++) {

		const scramble_dictionary = [
			[undefined, '3x3'],
			['222so', '2x2'],
			['444wca', '4x4'],
			['555wca', '5x5'],
			['666wca', '6x6'],
			['777wca', '7x7'],
			['333ni', '3BLD'],
			['333fm', 'FMC'],
			['333oh', 'OH'],
			['clkwca', 'Clock'],
			['mgmp', 'Megaminx'],
			['pyrso', 'Pyraminx'],
			['skbso', 'Skewb'],
			['sqrs', 'Square-1'],
			['444bld', '4BLD'],
			['555bld', '5BLD'],
			['r3ni', 'MBLD'],
			['ll', '3x3']
		]
		
		let scramble_type = scramble_dictionary[scramble_dictionary.map(v => v[0]).indexOf(sessionData[i].opt.scrType)]
		if (scramble_type === undefined) {
			console.warn('didn\'t find scramble type ', sessionData[i].opt.scrType);
			
			scramble_type = [null, 'Other']
		}
		
		console.log(scramble_type[1]);
		const event =  $database.events[$database.events.map(v => v.scramble).indexOf(scramble_type[1])]
		
		const csTimerSession: csSession = {
			name: sessionData[i].name,
			scramble_type: scramble_type[1],
			import: true,
			// event: {name: event.name, sessions: {...event.sessions}, hide: event.hide, selected_session: event.selected_session},
			event: JSON.parse(JSON.stringify(event)),
			// selected_session: event.selected_session,
			solves: sessionSolves[i]
			.map(csSolve => {
				let time: number = csSolve[0][1]
				if (csSolve[0].length > 2) {
					time = csSolve[0].slice(1).reduce((i, j) => i + j, 0)
					time = csSolve[0][1]
				}

				time *= 0.001

				let penalty: number | 'DNF' = csSolve[0][0]
				if (penalty == -1) penalty = 'DNF'

				const date = csSolve[3] ? new Date(csSolve[3]*1000) : null

				const solve: Solve = {
					time: time,
					penalty: penalty as 0 | 2 | 'DNF',
					date: date,
					scramble: csSolve[1],
					imported: 'csTimer'
				}

				return solve
			})
			// .sort( (a, b) => {
			// 	try {
			// 		return a.date.getTime() - b.date.getTime()
			// 	} catch (error) {
			// 		return -1
			// 	}
			// })
		}

		console.log(csTimerSession.solves.length);
		

		csSessions.push(csTimerSession)
	}
	return csSessions
}

export function finishImport(csSessions: csSession[]): void {
	for (const csSession of csSessions.filter(v => v.import)) {
		
		const session = csSession.event.sessions[csSession.event.selected_session]
		session.solves = csSession.solves

		database.update(db => {
			const event_index = db.events.map(v => v.name).indexOf(csSession.event.name)

			if (db.events[event_index].sessions.map(v => v.name).indexOf(session.name) === -1) {
				addSession(csSession.event.sessions[csSession.event.selected_session].name, db.events[event_index])
			}

			const db_session = db.events[event_index].sessions[csSession.event.selected_session]
			db_session.solves = db_session.solves.concat(session.solves)
			return db
		})
	}
}