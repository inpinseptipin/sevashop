import firebase from "./firebase";

const firestore = firebase.firestore();

export function createUser(uid, data) {
  return firestore
    .collection("users")
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}

export async function getUser(uid) {
  // firestore
  //   .collection("users")
  //   .doc(uid)
  //   .get()
  //   .then((result) => {
  //     console.log("result of alternative", result.data());
  //     return result.data();
  //   });

  const doc = await firestore.collection("users").doc(uid).get();
  if (!doc.exists) {
    // console.log("No such document!");
    return false;
  } else {
    // console.log("Document data:", doc.data());
    return doc.data();
  }
}
