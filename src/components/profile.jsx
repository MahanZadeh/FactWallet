import { React, PureComponent } from 'react';
import {
    Container,
    Navbar,
    Nav,
    Card,
    Form,
    Button,
    NavDropdown,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navigation from './navigation';

import mahan from './mahan.PNG';
import buffer from './buffer.gif';

import UpdateProfile from './updateProfile';


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
            address: "",
            ShowpdateProfile: false,
            test: false,
        };
        this.hideComponent = this.hideComponent.bind(this);

    }

    // hideComponent(name) {
    //     console.log(name);
    //     switch (name) {
    //         case "ShowpdateProfile":
    //             this.setState({ ShowpdateProfile: !this.state.ShowpdateProfile });
    //     }
    // }

    hideComponent = () => {
        this.setState({ ShowpdateProfile: !this.state.ShowpdateProfile });
        
    }

    testToggle = () => {
        this.setState({
            test: !this.state.test,
        })
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
                        console.log(somebody.email)
                        this.setState({
                            name: somebody.displayName,
                            email: somebody.email,
                            pic: somebody.photoURL,
                            address: somebody.address,
                        })
                    }).catch(function (error) {
                        console.log(error)
                        console.log("got error")
                    })
            }
        })
    }

    componentWillMount() {
        this.populateUser()
    }

    renderUpdate = (e) => {
        e.preventDefault();
        this.props.renderUpdate();
    }

    render() {

        const ShowpdateProfile = this.state.ShowpdateProfile;

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
                    {/* <button onClick={this.hideComponent}></button>
                    {this.state.test ? <UpdateProfile showSignUp={this.state.ShowpdateProfile} hideComponent={this.hideComponent} /> : <p>Bye</p>} */}
                    <Card text="white" style={{ width: '100%', height: '100vh', backgroundColor:"#8A9EAB"}}>
                        <Card.Header>
                            <div id="profilPic" style={{ position: 'relative', }}>
                                <img src={this.state.pic} width="80vw" height="80vh" style={{ borderRadius: "50%", }}>
                                </img>
                                <p style={{ display: 'inline', color: '#2C353C', position: 'absolute', bottom: '0', left: '110px', fontSize: '3vh', }}>{this.state.name}</p>

                            </div>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <div id="userDetails">
                                    <p>
                                        Email: {this.state.email}
                                    </p>
                                    <p>
                                        Address: {this.state.address}
                                    </p>

                                </div>

                                    {/* <Link to="/updateProfile" className="nav-link" style={{color:"black"}}>
                        Update Profile
                        </Link> */}
                                    <Link onClick={() => this.hideComponent("ShowpdateProfile")} to="#" className="nav-link" style={{color: "black", backgroundColor: "#576B77",}}>
                                        Update Profile
                                    </Link>
                                    <div>
                                        <UpdateProfile showSignUp={this.state.ShowpdateProfile} hideComponent={this.hideComponent} />
                                    </div>

                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br />
                </>

            )
        } else {
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


///Set a user's email address/////////////////////////////////////

// import { getAuth, updateEmail } from "firebase/auth";
// const auth = getAuth();
// updateEmail(auth.currentUser, "user@example.com").then(() => {
//   // Email updated!
//   // ...
// }).catch((error) => {
//   // An error occurred
//   // ...
// });




// /**
//  * Upload user profile image to Cloud Firestore.//////////////////////////////////////////////////
//  * 
//  * @param {string} userUid A string representing a corresponding firebase collection identification number (or a user)
//  * @returns if an error occurs, function returns an error message of 'not logged in' 
//  */
//  function uploadUserProfilePic(userUid) {

//     // Let's assume my storage is only enabled for authenticated users 
//     // This is set in your firebase console storage "rules" tab
//     if (!userUid) { console.err("Not logged in!"); return };

//     const fileInput = document.getElementById("profile-pic");

//     // listen for file selection
//     fileInput.addEventListener('change', function (e) {

//         var file = e.target.files[0];

//         //store using this name
//         var storageRef = storage.ref("images/" + userUid + ".jpg");

//         //upload the picked file
//         storageRef.put(file)
//             .then(function () {
//                 console.log('Uploaded to Cloud Storage.');
//             })

//         //get the URL of stored file
//         storageRef.getDownloadURL()
//             .then(function (url) {   // Get URL of the uploaded file
//                 console.log(url);    // Save the URL into users collection
//                 db.collection("users").doc(userUid).update({
//                     "profilePicture": url
//                 })
//                     .then(function () {
//                         console.log('Added Profile Pic URL to Firestore.');
//                     })
//             })
//     })
// }