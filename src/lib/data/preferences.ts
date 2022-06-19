import { get, ref, set as dbSet, type DatabaseReference } from 'firebase/database'
import { userStore } from "$lib/profile";
import { db } from "./firebase";
import type { Path } from "./firebase-store";
import { writable } from "svelte/store";

const defaults = {
	refreshRate: 69,
	pressDelay: 300,
	stopTimerWith: 'alphanumeric' as 'alphanumeric' | 'space' | 'anything',
	decimalScalar: 1,
	mainTimerDecimalScalar: 0.75,
}

const delay = 500

type Preferences = typeof defaults

function createStore(writeCallback = () => null) {
	const { set, subscribe } = writable(Object.assign({}, defaults) as Preferences)

	let preferencesRef: DatabaseReference

	userStore.subscribe(async(user) => {
		if (!user) return
		if (!db) return
		
		const path: Path = 'Preferences' // For type checking
		preferencesRef = ref(db, `User-${user.uid}/${path}`)

		const snapshot = await get(preferencesRef)
		const value = await snapshot.val() as Preferences

		set(fill(value))
	})

	

	let canWrite = true
	let writeTimeout: NodeJS.Timeout

	return {
		set: (preferences: Partial<Preferences>) => {
			const purged = purge(preferences)
			set(fill(preferences))

			if (canWrite) {
				dbSet(preferencesRef, purged)
				canWrite = false
			} else {
				clearTimeout(writeTimeout)
				writeTimeout = setTimeout(() => {
					dbSet(preferencesRef, purged)
					canWrite = true

					writeCallback()
				}, delay)
			}
		},
		subscribe,

		reset: () => {
			this.set({})
		},
	}
}

export const preferences = createStore()

function purge(preferences: Partial<Preferences>) {
	let p = Object.assign({}, preferences)

	for (const name in p) {
		if (p[name] === defaults[name]) {
			delete p[name]
		}
	}

	return p
}

function fill(preferences: Partial<Preferences>) {
	let p = Object.assign({}, preferences)

	for (const name in defaults) {
		if (p[name] == null) {
			p[name] = defaults[name]
		}
	}

	return p as Required<Preferences>
}