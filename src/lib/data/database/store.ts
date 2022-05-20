import { userStore as globalUserStore } from "$lib/profile";
import { db as globalDb } from "./main";
import { createDelayedStore } from "$lib/utils/delayedStore";
import type { User } from "firebase/auth";
import { get, limitToLast, onValue, orderByKey, query, ref, set as dbSet, type Database } from "firebase/database";
import type { Writable } from "svelte/store";

export type Top = 'Events' | 'Solves' | 'Settings'
export type Bottom = `/${string}`
export type Path = `${Top}${Bottom | ''}`


export function createFirebaseStore<T>(
	path: Path, 
	initialValue: T = null, 
	dbInfo: { 
		db?: Database
		userStore?: Writable<User>
		amount?: number
	} = {}, 
	delayOptions = {}
) {
	const {
		db = globalDb,
		userStore = globalUserStore,
		amount = null
	} = dbInfo

	// Dispatches a `set`
	const { subscribe, set, update } = createDelayedStore<T>(initialValue, delayOptions)

	let pathQuery = null;

	userStore.subscribe(user => {
		if (!user) {
			console.warn('didnt find a user yet');
			return
		}

		let pathRef = ref(db, `User-${user.uid}/${path}`)
		pathQuery = query(pathRef)

		// Apply filters
		if (amount) {
			pathQuery = query(pathRef, orderByKey(), limitToLast(amount))
		}

		get(pathQuery).then(async(snapshot) => {
			let value = await snapshot.val() as T
			
			if (value == null && bool(value)) {
				console.log('Setting default value of', path);
				await dbSet(pathQuery, initialValue)
			}

			value = cleanup(value)
			set(value || initialValue)
		})
	})

	return {
		subscribe,
		set: (value: T) => {
			// console.log('setting value cause client requested it', value);
			
			pathQuery && dbSet(pathQuery, value)
			set(value)
		},
		update,
	}
}

function cleanup<T>(value: T): T {
	if (Array.isArray(value)) {
		// Error because maybe ts knows something I don't?
		// @ts-expect-error
		value = value.filter(v => v !== null)
	}

	return value
}

function bool<T>(value: T): boolean {
	if (value == null) {
		return false
	} else if (typeof value === 'object') {
		Object.keys(value).length === 0
	} else {
		return !!value
	}
}