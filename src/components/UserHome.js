import React, {Component} from "react";
import {Button, Container, Row, Col} from "react-bootstrap";
import Favourite from "./Favourite.js";

class UserHome extends Component {
  render() {
    var myBooks = ['MyBook1', 'MyBook2', 'MyBook3', "MyBook4", "MyBook5", "MyBook6"];
    return (
      <Container style={{"max-width": "100%"}}>
        <Row>
          <Col style={{"border": "solid"}}>
            <h2>My Books</h2>
            <Row>
              {
                myBooks.map(function (bookName, index) {
                  return <Col xs={6} md={4} lg={3} key={index}>
                    <img src={require("../image/BookCover.png")} alt="BookCover"/>
                    {bookName}
                  </Col>
                })
              }
            </Row>
          </Col>
          <Favourite/>
        </Row>
      </Container>
    )
  }
}

export default UserHome;