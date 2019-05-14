import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";

class Comment extends Component {
  render() {
    return (
      <Col lg="3" style={{ border: "solid", margin: "0px 10px" }}>
        <h2>Post Comments</h2>
        <Row>
          {
            // favouriteBooks.map(function (bookName, index) {
            //   return <Col xs={6} md={4} lg={12} key={index}>{bookName}</Col>
            <h2>Checking</h2>
          }
          {/* ) } */}
        </Row>
      </Col>
    );
  }
}

export default Comment;
