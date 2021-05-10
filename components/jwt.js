import * as SecureStore from 'expo-secure-store';
import firebase from "firebase/app";
import "firebase/auth"

const key = 'is_signin'

export async function getToken() {
	return firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			return getJWT().then((token) => {
				return token
			})
		}
	})
}

export async function getJWT(){
	return firebase.auth().currentUser.getIdToken(false).then((token) => {
		return token != undefined ? token : null
	})
}

export async function setSignin(){
	return await SecureStore.setItemAsync(key, JSON.stringify(true));
}

export async function setSignout(){
	return await SecureStore.setItemAsync(key, JSON.stringify(false))
}

export async function getSignin() {
	return getIsSignin().then((boolean) => {
		return JSON.parse(boolean)
	})
}

async function getIsSignin(){
	return await SecureStore.getItemAsync(key)
}


export async function setJWT(token) {
	return await SecureStore.setItemAsync('jwt', token)
}