import { browser } from "$app/env"

if (browser) {
	const version = localStorage.getItem('version')

	if (version === null) {
		localStorage.removeItem('database')
		localStorage.removeItem('selection')
	}

	localStorage.setItem('version', '0.1')
}