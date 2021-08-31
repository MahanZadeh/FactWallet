import React, { PureComponent } from 'react';
import { Modal, Button, Form, Card, Nav } from 'react-bootstrap';

import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { onAuthStateChanged } from '@firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { auth, signInWithEmailAndPassword, signInWithGoogle, db } from "../firebase/firebase";

import Navigation from './navigation';

import { collection, query, where } from "firebase/firestore";



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
                            console.log(doc.data())
                            allFacts.push(doc.data().fact)
                        })
                        return  allFacts;
                    }).then((data) =>{
                        this.setState({
                            facts: data,
                        })
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
            let allFacts = [];
            if (user) {
                db.collection("savedFacts")
                    .where("uid", "==", user.uid)
                    .get()
                    .then(function (snapshot) {
                        snapshot.forEach(function (doc) {
                            console.log(doc.data())
                            allFacts.push(doc.data().fact)
                        })
                        return  allFacts;
                    }).then((data) =>{
                        this.setState({
                            facts: data,
                        })
                    })
                    .catch(function (error) {
                        console.log(error)
                    })

            }
        })
    }
    

    render() {
        const facts = this.state.facts
        console.log(facts)
        console.log(facts.length >= 0)
        if (this.state.facts.length != "0") {
        return (
            <>
                <Navigation />
                {/* <div className="facts">
                    {facts.map((fact) => (
                        <div className="fact">{fact}</div>
                    ))}
                </div> */}
                {facts.map((fact) => (
                    <div className="facys" key={facts.indexOf(fact)} style={{width: "100%", height: "10vh", textAlign:"center", marginBottom: "10px"}}>
                        {fact}
                        <button onClick={} >Delete</button>
                    </div>
                    

                ))}
                

                <button onClick={this.grabFacts}></button>
            </>
        )
    } else {
        return (<div>Loading...</div>)
    }
}}

export default SavedFacts;
