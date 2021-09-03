import React, { PureComponent } from 'react';
import { Modal, Button, Form, Card, Nav } from 'react-bootstrap';

import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { onAuthStateChanged } from '@firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

import { auth, signInWithEmailAndPassword, signInWithGoogle, db } from "../firebase/firebase";

import Navigation from './navigation';

import { collection, query, where } from "firebase/firestore";
import Fact from './facts';



class SavedFacts extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            facts: [],
        };
    }


    componentDidMount() {
        onAuthStateChanged(auth, (user) => {
            let allFacts = [];
            if (user) {
                db.collection("savedFacts")
                    .where("uid", "==", user.uid)
                    .get()
                    .then(function (snapshot) {
                        snapshot.forEach(function (doc) {
                            allFacts.push(doc.data().fact)
                        })
                        return allFacts;
                    }).then((data) => {
                        this.setState({
                            facts: data,
                        })
                        console.log(allFacts);
                        console.log(this.state.facts)
                    })
                    .catch(function (error) {
                        console.log(error)
                    })

            }
        })
    }

    //FIRST DROP THE DUPLICATES IN THE SAVE PART, THEN FIND A WAY TO DELETE THEM HERE 
    deleteFact = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user.uid)
            db.collection("savedFacts").doc(user.uid).set({
              fact: this.state.facts[0],
              uid: user.uid,
            }, { merge: true })
            .then((docRef) => {
              alert("Data Successfully Deleted");
              console.log(this.state.facts[0])
            })
                    .catch(function (error) {
                        console.log(error)
                    })

            }
        })
    }


    render() {
        const facts = this.state.facts;
        const deleteText = "";
        console.log(facts, "here")
        if (this.state.facts.length != "0") {
            return (
                <>
                    <Navigation />
                    {facts[0].map((fact) => (
                        
                        <>
                        {console.log(fact)}
                            <div className="facts" key={facts.indexOf(fact)} style={{ width: "100%", display: "inline-block", textAlign: "center", marginBottom: "10px", boxShadow: "10px 5px 5px #3A4750",}}>
                                {fact}
                                <button onClick={this.deleteFact}>Delete</button>

                            </div>
                        </>
                    ))}
                </>
            )
        } else {
            return (<div>Loading...</div>)
        }
    }
}

export default SavedFacts;
