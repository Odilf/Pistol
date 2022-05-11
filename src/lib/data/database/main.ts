import { connectDatabaseEmulator, getDatabase } from "firebase/database"
import { browser } from "$app/env"
import { app } from "../firebase"
import { user } from "$lib/profile";

export const db = browser && getDatabase(app);

if (browser) {
	if (location.hostname === "localhost") {
		try {
			// Point to the RTDB emulator running on localhost.
			connectDatabaseEmulator(db, "localhost", 9000);
		} catch {
			console.warn("Failed to connect to database emulator");			
		}
	}
}

export function shapeData<T>(data: T[], getter: (data: T) => string) {
	let object = {}
	
	for (const datum of data) {
		const key = getter(datum)
		object[key] = datum
	}

	return object
}

export function retrieveData<T>(data: Map<unknown, T>, propertyName: string, getter: (key: string) => unknown) {
	if (!data) return []
	const entries = Object.entries(data)
	const result = entries.map(entry => {
		const [key, value] = entry
		value[propertyName] = getter(key)
		return value 
	})

	return result
}