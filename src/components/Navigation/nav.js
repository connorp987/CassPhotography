import React from 'react'
import { Nav, Container, Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut'
import * as ROUTES from "../../constants/routes";

export default function Navigation() {

  const Navigation = ({ authUser }) => (
    <div>
      <AuthUserContext.Consumer>
        {authUser =>
          authUser ? (
            <Nav.Item bsPrefix='nav-link'>
              <SignOutButton />
            </Nav.Item>) : (<div></div>)
        }
      </AuthUserContext.Consumer>
    </div>
  );


  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link
            style={{ color: 'inherit', textDecoration: "none" }}
            to={ROUTES.LANDING}
          >
            Cassidys Wacky Photography
          </Link>
        </Navbar.Brand>
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Item bsPrefix='nav-link'>
              <Link
                style={{ color: 'inherit', textDecoration: "none" }}
                to={ROUTES.ADMIN}
              >
                test
              </Link>
            </Nav.Item>
            
          </Nav>
          <Nav>
            <Navigation />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
