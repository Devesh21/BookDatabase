import React, {Component} from "react";
import {Col, Row} from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import firebase from "../config/firebaseConfig";
const firestore = firebase.firestore();

class Favourite extends Component {
  state ={
    favouritebooks: []
  }

  componentWillMount() {
    const { auth } = this.props;
    console.log("in favourite books: ", auth.uid);
    var favouriteBooksList;
    firestore.collection('users').doc(auth.uid).get()
    .then((snapshot)=>{
      favouriteBooksList = snapshot.data().favouriteBooks;
      this.state.favouritebooks = favouriteBooksList;
      console.log(this.state);
    })
  }


  render() {
    
    var favouriteBooksList;
    let booksList;
    console.log("in render", this.state.favouritebooks);
    if(this.state.favouritebooks.length != 0){
      favouriteBooksList = this.state.favouritebooks;
      booksList = favouriteBooksList.map(function(item, index){
        return (<Link to={'/book/'+item.bookId} key={index}>
          item.bookTitle
        </Link>)
      })
      console.log("in fav still :");
      
      console.log(booksList);
      
    }


    


    return (
      <Col
        className="Favourite"
        lg="3"
        style={{ border: "solid", margin: "0px 10px" }}
      >
        <h2>Favourite Books</h2>
        <Row>
          display fav list here!!
        </Row>
      </Col>
    );
  }
}


const mapStateToProps = state => {
  // console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default connect(mapStateToProps)(Favourite);
