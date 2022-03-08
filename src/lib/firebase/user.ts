import { setUserId } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { writable } from "svelte/store";
import { app } from './index'

const provider = new GoogleAuthProvider();
const auth = getAuth();

export const user = writable(auth.currentUser)
auth.onAuthStateChanged(v => user.set(v))

export function login() {
	signInWithPopup(auth, provider)
	.then((result) => {

		console.log(result);

		// This gives you a Google Access Token. You can use it to access the Google API.
		const credential = GoogleAuthProvider.credentialFromResult(result);
		const token = credential.accessToken;
		// The signed-in user info.
		const user = result.user;
		// ...
	}).catch((error) => {
		// Handle Errors here.
		const errorCode = error.code;
		const errorMessage = error.message;
		// The email of the user's account used.
		const email = error.email;
		// The AuthCredential type that was used.
		const credential = GoogleAuthProvider.credentialFromError(error);
		// ...
	});
}

function signOutWrapper() {
	signOut(auth)
}

export { signOutWrapper as signOut }
