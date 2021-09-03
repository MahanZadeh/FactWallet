/**
 * Initialize the web app's Firebase configuration.
 * 
 * This code was adapted from https://firebase.google.com/docs/web/setup
 * 
 */

import firebase from 'firebase/compat/app';
import firebaseConfig from './firebaseConfig';

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

var user = firebase.auth().currentUser;

const logout = () => {

        auth.signOut();


};

const retrieveUserInfo = () => {
        let userInfo = [];
        console.log("userinfo fired")
        if (user !== null) {
                user.providerData.forEach((profile) => {
                        userInfo.push(profile.providerId)
                        userInfo.push(profile.uid)
                        userInfo.push(profile.displayName)
                        userInfo.push(profile.email)
                        userInfo.push(profile.photoURL)

                        console.log("Sign-in provider: " + profile.providerId);
                        console.log("  Provider-specific UID: " + profile.uid);
                        console.log("  Name: " + profile.displayName);
                        console.log("  Email: " + profile.email);
                        console.log("  Photo URL: " + profile.photoURL);
                });
        }
        console.log(userInfo)
        return userInfo;
}

export {
        auth,
        db,
        signInWithGoogle,
        signInWithEmailAndPassword,
        registerWithEmailAndPassword,
        sendPasswordResetEmail,
        logout,
        retrieveUserInfo,
};


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
