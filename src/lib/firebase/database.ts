import { app } from ".";
import { getDatabase, connectDatabaseEmulator, ref, onValue, set } from "firebase/database";
import { browser } from "$app/env";

export const db = browser && getDatabase(app);

if (browser) {

	if (location.hostname === "localhost") {
		// Point to the RTDB emulator running on localhost.
		connectDatabaseEmulator(db, "localhost", 9000);
	} 
	
	const sessionRef = ref(db, '3x3/Main')
	
	set(sessionRef, [
		{ time: 1 },
		{ time: 2 },
		{ time: 3 },
	])
	
	console.log('Set my stuff');
}
