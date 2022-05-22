import { createDelayedStore } from "$lib/utils/delayedStore";
import { get, query, ref, set as dbSet, type DatabaseReference, type Query } from 'firebase/database'
import { userStore } from "$lib/profile";
import { db } from "./firebase";
import type { Path } from "./firebase-store";
import { writable } from "svelte/store";

const defaults = {
	refreshRate: 69,
	pressDelay: 300,
	stopTimerWith: 'alphanumeric' as 'alphanumeric' | 'space' | 'anything',
	decimalScalar: 0.75,
} as const

const delay = 500

type Preferences = Partial<typeof defaults>

// Remove if unused, but seems that might be useful
export type Name = keyof typeof defaults

function createStore(writeCallback = () => null) {
	const { set, subscribe } = writable(Object.assign({}, defaults) as Preferences)

	let preferencesRef: DatabaseReference

	userStore.subscribe(async(user) => {
		if (!user) return
		const path: Path = 'Preferences' // For type checking
		preferencesRef = ref(db, `User-${user.uid}/${path}`)

		const snapshot = await get(preferencesRef)
		const value = await snapshot.val() as Preferences

		set(fill(value))
	})

	let canWrite = true
	let writeTimeout: NodeJS.Timeout

	return {
		set: (preferences: Preferences) => {
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
	}
}

export const preferences = createStore()

function purge(preferences: Preferences) {
	let p = Object.assign({}, preferences)

	for (const name in p) {
		if (p[name] === defaults[name]) {
			delete p[name]
		}
	}

	return p
}

function fill(preferences: Preferences) {
	let p = Object.assign({}, preferences)

	for (const name in defaults) {
		if (p[name] == null) {
			p[name] = defaults[name]
		}
	}

	return p as Required<Preferences>
}