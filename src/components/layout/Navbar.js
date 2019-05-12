import React from "react";
import {Link, NavLink} from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";
import { Button, Navbar, Nav, Form, Dropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
// import Search from "./Search";

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

  var name = "Account";
  if(auth.uid) {
    name = String(props.profile.firstName).substring(0,1) + String(props.profile.lastName).substring(0,1);
  }

  return (
    <Navbar bg="dark" variant="dark">
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
          <LinkContainer to="/addbook">
            <Nav.Link>Add Book</Nav.Link>
          </LinkContainer>
        </Nav>
        <Form inline>
          {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
          <Link to="/Search/0">
            <Button variant="outline-success" style={{"margin":"0px 10px"}}>Search</Button>
          </Link>
        </Form>
        {/* <Button>{links}</Button> */}
      </Navbar.Collapse>
      <br />
      <br />
      <Dropdown roundedCircle>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {name}
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
