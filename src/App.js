import React, {Component} from "react";
import "./App.css";
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import {LinkContainer} from "react-router-bootstrap";
import {Button, Navbar, Nav, Form, FormControl} from "react-bootstrap";

import Home from "./components/Home.js";
import UserHome from "./components/UserHome.js"
import Book from "./components/Book.js"
import NavBar from './components/layout/Navbar';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar/>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand>
              <Link to="/">BookMaster</Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <LinkContainer to="/">
                  <Nav.Link>Log In / Sign Up</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/user">
                  <Nav.Link>User Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/book">
                  <Nav.Link>Book</Nav.Link>
                </LinkContainer>
              </Nav>
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Navbar>
          <div className="App-body">
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/user" component={UserHome}/>
              <Route path="/book" component={Book}/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
