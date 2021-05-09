import * as SecureStore from 'expo-secure-store';

const key = 'jwt'

export async function setJWT(value) {
  await SecureStore.setItemAsync(key, value);
}

export async function getJWT(){
	let result = await SecureStore.getItemAsync(key);
  if (result) {
		return result
  } else {
		return ""
  }
}

export async function deleteJWT() {
	await SecureStore.deleteItemAsync(key);
}