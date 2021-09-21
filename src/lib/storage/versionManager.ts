import { browser } from "$app/env"

import { database, wca_events } from "./database"

database.update(db => {
	db.events.map(event => {
		if (wca_events.includes(event.name) && !event.scramble) {
			console.log('cac');
			
			event.scramble = event.name
		}
	})
	return db
})

if (browser) {
	const version = localStorage.getItem('version')

	if (version === null) {
		localStorage.removeItem('database')
		localStorage.removeItem('selection')
	}

	localStorage.setItem('version', '0.1')
}