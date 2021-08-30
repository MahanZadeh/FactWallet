/**
 * Initialize the web app's Firebase configuration.
 * 
 * This code was adapted from https://firebase.google.com/docs/web/setup
 * 
 */

import firebase from 'firebase/compat/app';
import firebaseConfig from './firebaseConfig';
// const firebaseConfig = {
//         apiKey: "AIzaSyDHj6bckLNKC9QM561wyPnWVoyC5M0EZVs",
//         authDomain: "factswallet-bbf90.firebaseapp.com",
//         projectId: "factswallet-bbf90",
//         storageBucket: "factswallet-bbf90.appspot.com",
//         messagingSenderId: "592394552215",
//         appId: "1:592394552215:web:529dd4e38d0ae51259bad2",
//         measurementId: "G-37PF0YTJ12"
// };

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();

const googleProvider = new firebase.auth.GoogleAuthProvider();

const signInWithGoogle = async () => {
        try {
                const res = await auth.signInWithPopup(googleProvider);
                const user = res.user;
                const query = await db
                        .collection("users")
                        .where("uid", "==", user.uid)
                        .get();
                if (query.docs.length === 0) {
                        await db.collection("users").add({
                                uid: user.uid,
                                name: user.displayName,
                                authProvider: "google",
                                email: user.email,
                        });
                }
        } catch (err) {
                console.error(err);
                alert(err.message);
        }
};

const signInWithEmailAndPassword = async (email, password) => {
        try {
                await auth.signInWithEmailAndPassword(email, password);
        } catch (err) {
                console.error(err);
                alert(err.message);
        }
};

const registerWithEmailAndPassword = async (name, email, password) => {
        try {
                const res = await auth.createUserWithEmailAndPassword(email, password);
                const user = res.user;
                await db.collection("users").add({
                        uid: user.uid,
                        name,
                        authProvider: "local",
                        email,
                });
        } catch (err) {
                console.error(err);
                alert(err.message);
        }
};

const sendPasswordResetEmail = async (email) => {
        try {
                await auth.sendPasswordResetEmail(email);
                alert("Password reset link sent!");
        } catch (err) {
                console.error(err);
                alert(err.message);
        }
};

const logout = () => {
        auth.signOut();
};

export {
        auth,
        db,
        signInWithGoogle,
        signInWithEmailAndPassword,
        registerWithEmailAndPassword,
        sendPasswordResetEmail,
        logout,
};

//  firebase.initializeApp(config);
//  export default firebase;



//  var firebaseConfig = {
//         apiKey: "AIzaSyDHj6bckLNKC9QM561wyPnWVoyC5M0EZVs",
//         authDomain: "factswallet-bbf90.firebaseapp.com",
//         projectId: "factswallet-bbf90",
//         storageBucket: "factswallet-bbf90.appspot.com",
//         messagingSenderId: "592394552215",
//         appId: "1:592394552215:web:529dd4e38d0ae51259bad2",
//         measurementId: "G-37PF0YTJ12"};


// /**
//  * Initialize Firebase.
//  * 
//  * This code was adapted from https://firebase.google.com/docs/web/setup
//  *
//  */
// firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();
// const auth = firebase.auth();
// const storage = firebase.storage();

// db.settings({timestampInSnapshots: true});

// export default db; auth; storage;
