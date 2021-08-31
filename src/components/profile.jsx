import { React, PureComponent } from 'react';
import {
    Container,
    Navbar,
    Nav,
    Card
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navigation from './navigation';

import mahan from './mahan.PNG';



import { onAuthStateChanged } from '@firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { auth, signInWithEmailAndPassword, signInWithGoogle, db } from "../firebase/firebase";


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
                console.log(somebody + "27")
                console.log(somebody.uid)
                db.collection("users")
                    .doc(somebody.uid)
                    .get()
                    .then((result) => {
                        // let name = somebody.displayName;
                        this.setState({
                            name: somebody.displayName,
                        })
                        console.log()
                        console.log("here")
                    }).catch(function (error) {
                        console.log(error)
                        console.log("got error")
                    })
            }
      })
      }

    render() {
        return(

                <>
                    <Navigation />
                    <button onClick={this.populateUser}>Name</button>
                    <p style={{ fontSize: "25px"}}>{this.state.name}</p>
                    
                    

                    <Card bg="secondary" text="white" style={{ width: '100%', height: '85vh'}}>
    <Card.Header>
            <div id="profilPic">
                <img src={mahan} width="150" height="150px">
                </img>
            <p style={{display: 'inline'}}>{this.state.name}</p>
            </div>
    </Card.Header>
    <Card.Body>
      <Card.Title>Primary Card Title</Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
      </Card.Text>
    </Card.Body>
  </Card>
  <br />
                </>
        
        )
    }

}
export default Profile;
