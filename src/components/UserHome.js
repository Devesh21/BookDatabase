import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Favourite from "./Favourite.js";
import Comments from "./Comment.js";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import firebase from "../config/firebaseConfig";
import { Link } from "react-router-dom";
import Book from "./Book";
const firestore = firebase.firestore();

class UserHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: []
    };
  }

  componentDidMount() {

    const { auth } = this.props;
    this.state.uid = auth.uid;

    const books = [];
    firestore
      .collection("books")
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(item => {
          if(item.data().uid == this.state.uid){
            console.log(item.data().uid + " :stored: "+ this.state.uid);
            books.push(item.data());
          }
        });
      })
      .then(() => {
        this.setState({ books: books });
        console.log("state of books:", this.state);
      });
  }

  render() {
    const { auth } = this.props;

    if (!auth.uid) {
      return <Redirect to="/" />;
    }

    var bookList = this.state.books;

    return (
      <Container
        style={{ maxWidth: "99%", margin: "10px", fontFamily: "Trebuchet MS" }}
      >
        <Row>
          <Col style={{ border: "solid" }}>
            <h2 style={{ padding: "10px" }}>My Books</h2>
            <Row style={{ padding: "10px", fontSize: " 30px" }}>
              {Object.keys(bookList).map(function(book) {
                return (
                  <Col
                    xs={6}
                    md={4}
                    lg={3}
                    key={book}
                    style={{ maxWidth: "50%" }}
                  >
                    <img
                      width="260px"
                      height="300px"
                      src={bookList[book].coverFile}
                      alt="BookCover"
                    />
                    {/* <Link to={`/book/${bookList[book].bookUid}`}>
                      {bookList[book].bookName}
                    </Link> */}
                    <Link
                      to={{
                        pathname: `/book/${bookList[book].bookUid}`,
                        state: {
                          bookData: bookList[book]
                        }
                      }}
                    >
                      {bookList[book].bookName}
                    </Link>
                  </Col>
                );
              })}
            </Row>
          </Col>
          <Favourite />
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    books: state.books,
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "books" }])
)(UserHome);
