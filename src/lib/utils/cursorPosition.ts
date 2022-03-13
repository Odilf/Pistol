import { browser } from "$app/env"
import { writable } from "svelte/store"

export const cursorPosition = writable({
	x: 0,
	y: 0,
})

if (browser) {

	document.addEventListener('mousemove', e => {
		cursorPosition.set({
			x: e.clientX,
			y: e.clientY,
		})
	})
	
	document.addEventListener('touchstart', e => {
		cursorPosition.set({
			x: e.touches[0].clientX,
			y: e.touches[0].clientY,
		})
	})
}