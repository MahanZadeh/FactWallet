import { React, PureComponent } from 'react';
import {
    Card,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navigation from './navigation';

import buffer from './buffer.gif';

import UpdateProfile from './updateProfile';
import Login from './login';


import { onAuthStateChanged } from '@firebase/auth';


import { auth, db } from "../firebase/firebase";



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
            rerender: false,
        };
        this.hideComponent = this.hideComponent.bind(this);

    }

    rerender = () => {
        this.setState({
            rerender: !this.state.rerender
        })
    }

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

                db.collection("users")
                    .doc(somebody.uid)
                    .get()
                    .then((result) => {
                        this.setState({
                            name: somebody.displayName,
                            email: somebody.email,
                            pic: somebody.photoURL,
                        })
                    }).catch(function (error) {
                        console.log(error)
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

        const user = auth.currentUser;


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
            backgroundColor: "#fff",
            zIndex: "99",
        }

        if (user) {
            if (this.state.email != "") {
                return (
                    <>
                        <Navigation />
                        <Card text="white" style={{ width: '100%', height: '100vh', backgroundColor: "#8A9EAB" }}>
                            <Card.Header>
                                <div id="profilPic" style={{ position: 'relative', }}>
                                    <img src={this.state.pic} width="80vw" height="80vh" style={{ borderRadius: "50%", }}>
                                    </img>
                                    <p style={{ display: 'inline', color: '#2C353C', position: 'absolute', bottom: '0', left: '110px', fontSize: '3vh', }}>{this.state.name}</p>

                                </div>
                            </Card.Header>
                            <Card.Body>
                                <div>
                                    <div id="userDetails">
                                        <p>
                                            Email: {this.state.email}
                                        </p>

                                    </div>
                                    <Link onClick={() => this.hideComponent("ShowpdateProfile")} to="#" className="nav-link" style={{ color: "black", backgroundColor: "#576B77", }}>
                                        Update Profile
                                    </Link>
                                    <div>
                                        <UpdateProfile showSignUp={this.state.ShowpdateProfile} hideComponent={this.hideComponent} populateUser={this.populateUser} />
                                    </div>

                                </div>
                            </Card.Body>
                        </Card>
                        <br />
                    </>

                )
            } else {
                return (
                    <div style={bufferDiv}>
                        <img src={buffer} style={bufferImage}></img>
                    </div>
                )
            }
        } else {
            return (
                <>
                    <Navigation />
                    <p style={{ display: "block", textAlign: "center", fontSize: "3vh", }}>Login to view your profile</p>
                    <Login />
                </>
            )
        }
    }

}
export default Profile;