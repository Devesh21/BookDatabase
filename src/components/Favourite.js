import React, {Component} from "react";
import {Col, Row} from "react-bootstrap";

class Favourite extends Component {
  render() {
    var favouriteBooks = ['FavBook1', 'FavBook2', 'FavBook3', "FavBook4", "FavBook5", "FavBook6"];
    return (
      <Col className="Favourite" lg="3" style={{"border": "solid"}}>
        <h2>Favourite Books</h2>
        <Row>
          {
            favouriteBooks.map(function (bookName, index) {
              return <Col xs={6} md={4} lg={12} key={index}>{bookName}</Col>
            })
          }
        </Row>
      </Col>
    )
  }
}

export default Favourite;