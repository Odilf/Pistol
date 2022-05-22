import { userStore as globalUserStore } from "$lib/profile";
import { db as globalDb } from "./firebase";
import type { User } from "firebase/auth";
import { get, limitToLast, orderByKey, query, ref, set as dbSet, type Database } from "firebase/database";
import { writable, type Writable } from "svelte/store";

export type Top = 'Events' | 'Solves' | 'Preferences'
export type Bottom = `/${string}`
export type Path = `${Top}${Bottom | ''}`


export function createFirebaseStore<T>(
	path: Path, 
	initialValue: T, 
	dbInfo: { 
		db?: Database
		userStore?: Writable<User>
		amount?: number
	} = {}, 
) {
	const {
		db = globalDb,
		userStore = globalUserStore,
		amount = null
	} = dbInfo

	// Dispatches a `set`
	const { subscribe, set, update } = writable<T>(initialValue)
	// createDelayedStore<T>(initialValue, delayOptions)

	let pathQuery = null;
	let currentPath = '';

	userStore.subscribe(user => {
		if (!user) {
			console.warn('didnt find a user yet');
			return
		}

		currentPath = `User-${user.uid}/${path}`
		let pathRef = ref(db, `User-${user.uid}/${path}`)
		pathQuery = query(pathRef)

		// Apply filters
		if (amount) {
			pathQuery = query(pathRef, orderByKey(), limitToLast(amount))
		}

		get(pathQuery).then(async(snapshot) => {
			let value = await snapshot.val() as T
			
			if (value == null && bool(value)) {
				console.log(value, bool(value));
				
				console.log(`Setting ${path} to default (${initialValue})`);
				await dbSet(pathQuery, initialValue)
			}

			set(cleanup(value) || initialValue)
		})
	})

	return {
		subscribe,
		set: (value: T) => {
			console.log();
			
			pathQuery && dbSet(pathQuery, value)
			// set(cleanup(value))
			set(value)
		},
		update,
		delete: (key: string | number) => {
			update(value => {
				delete value[key]
				return value
			})

			dbSet(ref(db, `${currentPath}/${key}`), null)
		}
	}
}

function cleanup<T>(value: T): T {
	if (Array.isArray(value)) {
		// Error because maybe ts knows something I don't?
		// @ts-expect-error
		value = value.filter(v => v !== null)
	}

	if (typeof value === 'object') {
		for (const key in value) {
			if (value[key] == null) {
				delete value[key]
			}
		}
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