import React, { PureComponent } from 'react';
import {
    Container,
    Navbar,
    Nav,
    NavDropdown,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import logo192 from './logo192.png';
import fw from './apple-touch-icon.png'

import { logout } from '../firebase/firebase';
import firebase from 'firebase/compat/app';

import { handleLogout } from '../firebase/firebase'

class Navigation extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showFactsPage: false
        };
    }


    // renderFactsPage = (e) => {
    //     e.preventDefault();
    //     this.props.renderFactsPage;
    // }

    renderLogin = (event) => {
        event.preventDefault();
        this.props.renderLogin();
    }

    render() {
        return (
            <>
                <Navbar bg="dark" variant="dark" expand="lg" style={{ position: 'sticky', position: '-webkit-sticky', top: '0',}}>
                    <Container>
                        <Navbar.Brand href="#home">
                            <img
                                alt=""
                                src={fw}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                            />{' '}
                            Fact Wallet
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Link to="/profile" className="nav-link">
                                    Profile
                                </Link>
                                <Link to="/fact" className="nav-link">
                                    Random facts!
                                </Link>
                                {firebase.auth().currentUser ? 
                                <Link to="/savedFacts" className="nav-link">
                                    My saved facts!
                                </Link> : null }

                                <Link  to="/login" className="nav-link">
                                    Login
                                </Link>
                                <Link onClick={() => {logout(); alert("You are logged out.")}} to="/fact" className="nav-link">
                                    Logout
                                </Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>

        )
    }
}

export default Navigation;
