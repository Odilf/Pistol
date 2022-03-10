import type { Settings } from '$lib/data/settings'

import { app } from '$lib/data/firebase'
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth"
import { writable } from "svelte/store"

const provider = new GoogleAuthProvider()
const auth = getAuth(app)

export const user = writable(auth.currentUser)
auth.onAuthStateChanged(v => user.set(v))

export function login() {
	signInWithPopup(auth, provider).then(result => {
		console.log('Logged in succesfully. \n Result: ', result)
	}).catch(error => {
		console.error('Error while loging in.', error)
		alert(error.message)
	})
}

function signOutWrapper() {
	signOut(auth)
}

export { signOutWrapper as signOut }