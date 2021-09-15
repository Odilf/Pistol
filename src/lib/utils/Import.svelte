<script lang="ts">

	import type { Event, Session, Solve } from '$lib/storage/time_db'
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

			let cstimer = await e.dataTransfer.items[0].getAsFile().text()

			cstimer = parseImport(cstimer)
		}
    }

	function parseImport(json: string) {
		const cstimer = JSON.parse(json)

		let sessions = []
			
		for (const [name, session] of Object.entries(cstimer)) {
			if (name.startsWith('session')) {
				sessions.push({
					name: name,
					solves: Array.isArray(session) ? session.map(v => 
						{ return {
							time: v[0][1] / 1000,
							date: null,
							penalty: 0,
							scramble: null,
						}}
					) : console.error('Somewhere here should be an array')
				})
			}
		}

		console.log(sessions);
		
	}

	function dragOverHandler(e) {
		// console.log(e);
	}
</script>

<div on:drop|preventDefault={dropHandler} on:dragover|preventDefault={dragOverHandler}>
	<p>Drag one or more files to this Drop Zone ...</p>
</div>

<style lang="scss">
	div {
		width: 100vw;
		height: 100vh;
		
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>