import React, { PureComponent } from 'react';
import {
    Container,
    Navbar,
    Nav,
    NavDropdown,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import logo192 from './logo192.png';

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
                <Navbar bg="dark" variant="dark" expand="lg" style={{ position: 'sticky', position: '-webkit-sticky', top: '0' }}>
                    <Container>
                        <Navbar.Brand href="#home">
                            <img
                                alt=""
                                src={logo192}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                            />{' '}
                            React Bootstrap
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Link to="/profile" className="nav-link">
                                    Profile
                                </Link>

                                <Link to="#" className="nav-link">
                                    sign Up
                                </Link>
                                <Link to="/fact" className="nav-link">
                                    Random facts!
                                </Link>
                                <Link to="/savedFacts" className="nav-link">
                                    My saved facts!
                                </Link>
                                <Link onClick={this.renderLogin} to="#" className="nav-link">
                                    Login
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
