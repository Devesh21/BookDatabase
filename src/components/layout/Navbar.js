import React from "react";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";
import {
  Button,
  Navbar,
  Nav,
  Form,
  FormControl,
  Dropdown
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Search from "./Search";

const BookMasterNavbar = props => {
  const { auth, profile } = props;
  // console.log(auth);
  const links = auth.uid ? (
    <SignedInLinks profile={profile} />
  ) : (
    <SignedOutLinks />
  );
  //   return (
  //     <nav>
  //       <div className="container">
  //         <Link to="/">Book Master</Link>
  //         {links}
  //       </div>
  //     </nav>
  //   );

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>
        <Link to="/">BookMaster</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {/* <LinkContainer to="/">
            <Nav.Link>{links}</Nav.Link>
          </LinkContainer> */}
          <LinkContainer to="/user">
            <Nav.Link>User Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/book">
            <Nav.Link>Book</Nav.Link>
          </LinkContainer>
        </Nav>
        <Form inline>
          {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
          <Link to="/Search/0">
            <Button variant="outline-success">Search</Button>
          </Link>
        </Form>
        {/* <Button>{links}</Button> */}
      </Navbar.Collapse>
      <br />
      <br />
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Account
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {/* <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
          {links}
        </Dropdown.Menu>
      </Dropdown>
    </Navbar>
  );
};

const mapStateToProps = state => {
  console.log(state);

  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default connect(mapStateToProps)(BookMasterNavbar);
