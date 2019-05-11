import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { LinkContainer } from "react-router-bootstrap";
// import { Button, Navbar, Nav, Form, FormControl } from "react-bootstrap";

import Home from "./components/Home.js";
import UserHome from "./components/UserHome.js";
import Book from "./components/Book.js";
import NavBar from "./components/layout/Navbar";
import Search from "./components/layout/Search";
import AddBook from "./components/AddBook";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <div className="App-body">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/user" component={UserHome} />
              <Route path="/book" component={Book} />
              <Route path="/search/:page" component={Search} />
              <Route path="/addbook" component={AddBook} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
