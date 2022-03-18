import { app } from '$lib/data/firebase'
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth"
import { writable } from "svelte/store"

const provider = new GoogleAuthProvider()
const auth = getAuth(app)

const userStore = writable(auth.currentUser)
export { userStore as user}

onAuthStateChanged(auth, user => userStore.set(user))

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