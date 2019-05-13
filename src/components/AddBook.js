import React, {Component} from "react";
import {Button, Form, FormGroup} from "react-bootstrap";
import { connect } from 'react-redux';
import { createBook } from '../store/actions/bookActions';
import firebase from '../config/firebaseConfig';
const storage = firebase.storage();



class AddBook extends Component {

  state = {
    bookName: '',
    author: '',
    description: '',
    coverFile: null,
    bookFile: null
  }


  handleBookSubmit = (e) => {
    e.preventDefault();
    console.log("in submit: ");
    const img = this.state.coverFile;
        console.log(img);
        
        const upload = storage.ref(`covers/${img.name}`).put(img);
        upload.on('state_changed', 
        (snapshot) => {
            // progress function
            // uncomment after adding the progressbar
            // const progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes) * 100)
            // this.setState({progress})
            // console.log(this.state.progress);

        }, (error) => {
            // error function
            console.log(error);
        }, () => {
            // completed function
            storage.ref('covers').child(img.name).getDownloadURL().then(coverFile => {
                this.setState({coverFile})
                console.log(coverFile);
                console.log(this.state);
            })
      });

      const book = this.state.bookFile;
        console.log(book);
        
        const uploadBook = storage.ref(`books/${book.name}`).put(book);
        uploadBook.on('state_changed', 
        (snapshot) => {
            // progress function
            // uncomment after adding the progressbar
            // const progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes) * 100)
            // this.setState({progress})
            // console.log(this.state.progress);

        }, (error) => {
            // error function
            console.log(error);
        }, () => {
            // completed function
            storage.ref('books').child(book.name).getDownloadURL().then(bookFile => {
                this.setState({bookFile})
                console.log(bookFile);
                console.log(this.state);
            })
      });
  }
  
  handleCoverChange = (e) => {
    if(e.target.files[0]){
      const img = e.target.files[0];
      this.state.coverFile = img;
      console.log(this.state);
    }
  }


  handleBookChange = (e) => {
    if(e.target.files[0]){
      const book = e.target.files[0];
      this.state.bookFile = book;
      console.log(this.state);
    }
  }


  handleChange = (e) => {
    // console.log("in handle change");
    
    this.setState({
        [e.target.id] : e.target.value
    })
  }

  

  handleSubmit = (e) => {
      e.preventDefault();
      console.log(this.state);
      this.props.createBook(this.state);
  }



  render() {

    // console.log(this.state);

    return (
      <div className="AddBook" style={{"margin":"50px"}}>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="Name">
            <Form.Label style={{"float": "left"}}>Name</Form.Label>
            <Form.Control autoFocus type="text" id="bookName" onChange = {this.handleChange} placeholder="Name"/>
          </FormGroup>
          <FormGroup controlId="Author">
            <Form.Label style={{"float": "left"}}>Author</Form.Label>
            <Form.Control type="text" id="author" onChange = {this.handleChange} placeholder="Author"/>
          </FormGroup>
          <Form.Group controlId="Description">
            <Form.Label style={{"float": "left"}}>Description</Form.Label>
            <Form.Control as="textarea" id="description" onChange = {this.handleChange} rows="3" placeholder="Description"/>
          </Form.Group>
          <Form.Group controlId="CoverFile">
            <Form.Label style={{"float": "left"}} >Select Cover</Form.Label>
            <input type="file" id="coverFile" name="CoverFile" style={{"position":"left", "display":"block", padding:"0 20px"}} onChange = {this.handleCoverChange}/>
          </Form.Group>
          <Form.Group controlId="BookFile">
            <Form.Label style={{"float": "left"}} >Select Book</Form.Label>
            <input type="file" id="bookFile" name="BookFile" style={{"position":"left", "display":"block", padding:"0 20px"}} onChange = {this.handleBookChange}/>
            <Button style={{"position":"left", "display":"block", margin:"20px 0"}} onClick={this.handleBookSubmit}>Upload book and cover</Button>
            <p style={{"border-left":"1rem solid #007bff", "backgroundColor":"white","text-align": "left", position:"left", width:"350px", padding:"10px"}}>please click upload before adding book , it will throw an file type error otherwise, that will be taken care of in some time</p>
          </Form.Group>
          <Button type="submit" style={{"position":"left", "display":"block", padding:"10px 20px", "clear":"both"}}>Add Book</Button>
        </form>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createBook: (newBook) => dispatch(createBook(newBook))
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(AddBook);