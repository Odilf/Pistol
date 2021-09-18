<script lang="ts">
	import type { Event, Session, Solve } from '$lib/storage/time_db'

	type csSession = {
			name: string,
			scramble_type: string,
			solves: Solve[]
	}

	async function dropHandler(e) {
		
		if (e.dataTransfer.items) {
			if (e.dataTransfer.items.length > 1) {
				console.error('More than one file');
				return
			} 

			if (e.dataTransfer.items[0].kind !== 'file') {
				console.error('File is not a file (xd)');
				return
			}

			const cstimer = await e.dataTransfer.items[0].getAsFile().text()
			const csSessions = parseImport(cstimer)
			console.log(csSessions);
		}
    }

	function parseImport(json: string): csSession[] {

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

		let csSessions: csSession[] = []
		

		for (let i = 0; i < sessionSolves.length; i++) {

			const csTimerSession: csSession = {
				name: sessionData[i].name,
				scramble_type: sessionData[i].opt.scrType,
				solves: sessionSolves[i].map(csSolve => {

					let time: number = csSolve[0][1]
					if (csSolve[0].length > 2) {
						time = csSolve[0].slice(1).reduce((i, j) => i + j, 0)
					}

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
			}

			csSessions.push(csTimerSession)
		}
		return csSessions
	}

	function dragOverHandler(e) {
		// console.log(e);
	}
</script>

<div on:drop|preventDefault={dropHandler} on:dragover|preventDefault={dragOverHandler}>
	<!-- <p>Drag one or more files to this Drop Zone ...</p> -->
</div>

<style lang="scss">
	div {
		width: 100vw;
		height: 100vh;
		position: absolute;

		z-index: 1;

		
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>