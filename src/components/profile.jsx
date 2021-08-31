import { React, PureComponent } from 'react';
import {
    Container,
    Navbar,
    Nav,
    Card,
    Form,
    Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navigation from './navigation';

import mahan from './mahan.PNG';
import buffer from './buffer.gif';


import { onAuthStateChanged } from '@firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { auth, signInWithEmailAndPassword, signInWithGoogle, db } from "../firebase/firebase";

//profile component needs access to all the user's profile info. 


class Profile extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            pic: "",
        };
    }

    populateUser = () => {
        onAuthStateChanged(auth, (somebody) => {
            if (somebody) {
                console.log(somebody)
                console.log(somebody.uid)

                db.collection("users")
                    .doc(somebody.uid)
                    .get()
                    .then((result) => {
                        console.log(result.name)
                        this.setState({
                            name: somebody.displayName,
                            email: somebody.email,
                            pic: somebody.photoURL
                        })
                    }).catch(function (error) {
                        console.log(error)
                        console.log("got error")
                    })
            }
        })
    }

    componentDidMount() {
        this.populateUser()
    }

    render() {
        const bufferImage = {
            position: "absolute",
            top: "50%",
            left: "50%",
            margin: "0 auto",
            zIndex: "100",
        }

        const bufferDiv = {
            position: "fixed",
            display: "block",
            width: "100vw",
            height: "100vh",
            top: "0",
            left: "0",
            textAlign: "center",
            /* opacity: 0.7; */
            backgroundColor: "#fff",
            zIndex: "99",
        }

        if (this.state.name != "") {

        return (

            <>
                <Navigation />
                <button onClick={this.populateUser}>Name</button>
                <p style={{ fontSize: "25px" }}>{this.state.name}</p>




                <Card bg="secondary" text="white" style={{ width: '100%', height: '85vh' }}>
                    <Card.Header>
                        <div id="profilPic">
                            <img src={mahan} width="150" height="150px">
                            </img>
                            <p style={{ display: 'inline' }}>{this.state.name}</p>
                            <p style={{ display: 'inline' }}>{this.state.email}</p>
                            <img src={this.state.pic}></img>

                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title style={{color: 'black'}}>Name: {this.state.name}</Card.Title>
                        <Card.Text>
                    
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                       </Card.Text>
                    </Card.Body>
                </Card>
                <br />
            </>

        )} else {
            return (
                <>
                    <div style={bufferDiv}>
                        <img src={buffer} style={bufferImage}></img>
                    </div>
                </>
            )   
        }
    }

}
export default Profile;
