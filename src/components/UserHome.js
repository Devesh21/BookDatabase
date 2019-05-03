import React, {Component} from "react";
import {Button, Container, Row, Col} from "react-bootstrap";
import BookCover from "../image/BookCover.png"

class UserHome extends Component {
  render() {
    var myBooks = ['MyBook1', 'MyBook2', 'MyBook3', "MyBook4", "MyBook5", "MyBook6"];
    var favouriteBooks = ['FavBook1', 'FavBook2', 'FavBook3', "FavBook4", "FavBook5", "FavBook6"];
    return (
      <Container style={{"max-width": "100%"}}>
        <Row>
          <Col style={{"border": "solid"}}>
            <h2>My Books</h2>
            <Row>
              {
                myBooks.map(function (bookName, index) {
                  return <Col xs={6} md={4} lg={3} key={index}>
                    <img src={BookCover} alt="BookCover"/>
                    {bookName}
                  </Col>
                })
              }
            </Row>
          </Col>
          <Col lg="3" style={{"border": "solid"}}>
            <h2>Favourite Books</h2>
            <Row>
              {
                favouriteBooks.map(function (bookName, index) {
                  return <Col xs={6} md={4} lg={12} key={index}>{bookName}</Col>
                })
              }
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default UserHome;