import React from "react";
import {Link} from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";
import { Button, Navbar, Nav, Form, Dropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
// import Search from "./Search";

const BookMasterNavbar = props => {
  const { auth, profile } = props;
  // console.log(auth);
  const links = auth.uid ? <SignedInLinks profile={profile}/> : <SignedOutLinks/>;

  var name = "Account";
  if(auth.uid) {
    name = String(props.profile.firstName).substring(0,1) + String(props.profile.lastName).substring(0,1);
  }

  return (
    <Navbar bg="dark" variant="dark" style={{"padding":"10px 20px 10px 20px"}}>
      <Navbar.Brand href="/">
        {'BookMaster'}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          
          <LinkContainer to="/addbook">
            <Nav.Link>Add Book</Nav.Link>
          </LinkContainer>
        </Nav>
      <Dropdown style={{margin:"0px 0px 0px 0"}}>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          {name}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {links}
        </Dropdown.Menu>
      </Dropdown>
        <Form inline>
          <Link to="/Search/0">
            <Button variant="outline-light" style={{"margin":"0px 10px"}}>Search</Button>
          </Link>
        </Form>
      
        {/* <Button>{links}</Button> */}
      </Navbar.Collapse>
      <br />
      <br />
      
      
    </Navbar>
  );
};

const mapStateToProps = state => {
  

  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default connect(mapStateToProps)(BookMasterNavbar);
