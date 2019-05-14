import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";

class Favourite extends Component {
  render() {
    // this needs to be data pulled from the active user's database entry
    // each book in the list needs to be a link to the corresponding book's page
    var favouriteBooks = [
      "FavBook1",
      "FavBook2",
      "FavBook3",
      "FavBook4",
      "FavBook5",
      "FavBook6"
    ];
    return (
      <Col
        className="Favourite"
        lg="3"
        style={{ border: "solid", margin: "0px 10px" }}
      >
        <h2>Favourite Books</h2>
        <Row>
          {favouriteBooks.map(function(bookName, index) {
            return (
              <Col xs={6} md={4} lg={12} key={index}>
                {bookName}
              </Col>
            );
          })}
        </Row>
      </Col>
    );
  }
}

export default Favourite;
