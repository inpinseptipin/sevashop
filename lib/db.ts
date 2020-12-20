import firebase from './firebase';

const firestore = firebase.firestore();

export function createUser(uid, data) {
  return firestore
    .collection("users")
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}

export async function getUser(uid) {
  const doc = await firestore.collection("users").doc(uid).get();
  if (!doc.exists) {
    return false;
  } else {
    return doc.data();
  }
}
