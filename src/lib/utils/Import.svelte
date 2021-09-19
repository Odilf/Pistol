<script lang="ts">
	import type { Event, Session, Solve } from '$lib/storage/time_db'
	import { database } from '$lib/storage/time_db'
	import { Dialog, Overlay, Button, Divider } from 'svelte-materialify'
	import ImportCard from '$lib/utils/ImportCard.svelte'

	export let isDragging = false

	let importing = false
	let csSessions: csSession[]

	type csSession = {
			name: string,
			scramble_type: string,
			solves: Solve[]
			session?: Session,
			event: Event
	}

	async function dropHandler(e) {
		isDragging = false
		
		if (!e.dataTransfer.items) return
		
		if (e.dataTransfer.items.length > 1) {
			console.error('More than one file');
			return
		} 

		if (e.dataTransfer.items[0].kind !== 'file') {
			console.error('File is not a file (xd)');
			return
		}

		const cstimer = await e.dataTransfer.items[0].getAsFile().text()
		csSessions = parseImport(cstimer)
		importing = true
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

			let scramble_dictionary = [
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
			]
			
			let scramble_type = scramble_dictionary[scramble_dictionary.map(v => v[0]).indexOf(sessionData[i].opt.scrType)]
			if (scramble_type === undefined) {
				console.warn('didn\'t find scramble type ', sessionData[i].opt.scrType);
				
				scramble_type = [null, 'Other']
			}
			
			console.log(scramble_type[1]);
			const event =  $database.events[$database.events.map(v => v.scramble ? v.scramble : v.name).indexOf(scramble_type[1])]
			
			const csTimerSession: csSession = {
				name: sessionData[i].name,
				scramble_type: scramble_type[1],
				event: event,
				solves: sessionSolves[i].map(csSolve => {

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
			}

			csSessions.push(csTimerSession)
		}
		return csSessions
	}

	function finishImport() {
		importing = false

		for (const csSession of csSessions) {
			const event = $database.events[$database.events.map(v => v.name).indexOf(csSession.event.name)]
			event.sessions[csSession.event.selected_session].solves = csSession.event.sessions[csSession.event.selected_session].solves.concat(csSession.solves)
		}
		database.update(db => db)
	}

</script>

{#if isDragging}
	<div on:drop|preventDefault={dropHandler} on:dragover|preventDefault>
		<Overlay bind:active={isDragging}> Release to import file </Overlay>
	</div>
{/if}

<Dialog bind:active={importing}>
	<!-- <div style='font-size:3em'> Import </div> -->

	{#each csSessions as csSession}
		<ImportCard bind:csSession={csSession}/>
		<Divider class=white/>
		<br>
	{/each}

	<Button on:click={finishImport}> Done </Button>
</Dialog>

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