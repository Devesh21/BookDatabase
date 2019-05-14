import React from "react";
import { Link } from "react-router-dom";
import { Card, Col } from "react-bootstrap";

const BookCard = props => {
  let cover = require("../image/BookCover.png");
  if (props.book.volumeInfo.imageLinks) {
    cover = props.book.volumeInfo.imageLinks.thumbnail;
  }
  console.log("props :", props);
  return (
    <Col xs={6} md={4} lg={3}>
      <Card style={{ width: "16rem" }}>
        <Card.Img
          variant="top"
          src={cover}
          alt=""
          style={{ width: "16rem", height: "20rem" }}
        />
        <Card.Body>
          <Card.Title>
            <Link
              to={{
                pathname: `/book/${props.book.id}`,
                state: {
                  bookData: props.book.original
                }
              }}
            >
              {props.book.volumeInfo.title}
            </Link>
            {/* <Link to={`/book/${props.book.id}`}>
              {props.book.volumeInfo.title}
            </Link> */}
          </Card.Title>
          <Card.Text>{props.book.volumeInfo.authors}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
    // <div className="card-style">
    //   <img src={props.book.volumeInfo.imageLinks.thumbnail} alt="" />
    //   <div>
    //     <div>
    //       <Link to={`/books/${props.book.id}`}>
    //         {props.book.volumeInfo.title}
    //       </Link>

    //     </div>
    //   </div>
    // </div>
    ///* <Button variant="primary">Go somewhere</Button> */
  );
};

export default BookCard;
