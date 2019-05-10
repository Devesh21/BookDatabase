import React, {Component} from "react";
import { Container, Row, Col} from "react-bootstrap";
import { Redirect } from 'react-router-dom';
import Favourite from "./Favourite.js";
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class UserHome extends Component {
  render() {
    const { auth } = this.props;

    console.log("in userHome: ", this.props);
    
    
    if(!auth.uid){
      return (<Redirect to="/"></Redirect>)
    }

    var myBooks = ['MyBook1', 'MyBook2', 'MyBook3', "MyBook4", "MyBook5", "MyBook6"];
    return (
      <Container style={{"maxWidth": "100%"}}>
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


const mapStateToProps = (state) => {
  return {
    books: state.books,
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {collection: 'books'}
  ])
)(UserHome);