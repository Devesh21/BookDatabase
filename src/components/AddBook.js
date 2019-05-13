import React, {Component} from "react";
import {Button, Form, FormGroup} from "react-bootstrap";
import { connect } from 'react-redux';
import { createBook } from '../store/actions/bookActions';
import uuid from 'uuid/v4';
import firebase from '../config/firebaseConfig';

const storage = firebase.storage();



class AddBook extends Component {

  state = {
    bookName: '',
    author: '',
    description: '',
    coverFile: null,
    coverUid: '',
    bookFile: null,
    bookUid: ''
  }


  // handleBookSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("in submit: ");
  //   const img = this.state.coverFile;
  //       const coverUid = "cover-"+uuid();
  //       console.log(img);
  //       const upload = storage.ref(`covers/${coverUid}`).put(img);
  //       upload.on('state_changed', 
  //       (snapshot) => {
  //         // progress function
  //         // uncomment after adding the progressbar
  //         // const progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes) * 100)
  //         // this.setState({progress})
  //         // console.log(this.state.progress);
          
  //       }, (error) => {
  //         // error function
  //         console.log(error);
  //       }, () => {
  //         // completed function
  //         storage.ref('covers').child(coverUid).getDownloadURL().then(coverFile => {
  //           this.setState({coverFile})
  //           console.log(coverFile);
  //           console.log(this.state);
  //         })
  //       });
        
  //       const book = this.state.bookFile;
  //       console.log(book);
  //       const bookuid = "book-"+uuid();
  //       console.log(bookuid);
  //       this.setState({bookuid});
  //       const uploadBook = storage.ref(`books/${bookuid}`).put(book);
  //       uploadBook.on('state_changed', 
  //       (snapshot) => {
  //           // progress function
  //           // uncomment after adding the progressbar
  //           // const progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes) * 100)
  //           // this.setState({progress})
  //           // console.log(this.state.progress);

  //       }, (error) => {
  //           // error function
  //           console.log(error);
  //       }, () => {
  //           // completed function
  //           storage.ref('books').child(bookuid).getDownloadURL().then(bookFile => {
  //               this.setState({bookFile})
  //               console.log(bookFile);
  //               console.log(this.state);
  //           })
  //     });
  // }
  
  handleCoverChange = (e) => {
    if(e.target.files[0]){
      const coverFile = e.target.files[0];
      // console.log(coverFile);
      this.state.coverFile = coverFile;
      console.log(this.state);
    }
  }


  handleBookChange = (e) => {
    if(e.target.files[0]){
      const bookFile = e.target.files[0];
      // console.log(bookFile);
      this.state.bookFile = bookFile;
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

      console.log("in submit: ");
      const img = this.state.coverFile;
      const coverUid = "cover-"+uuid();
      console.log(img);
      const upload = storage.ref(`covers/${coverUid}`).put(img);
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
        storage.ref('covers').child(coverUid).getDownloadURL().then(coverFile => {
          this.setState({coverFile})
          console.log(coverFile);
          console.log(this.state);
        })
      });
      
      const book = this.state.bookFile;
      console.log(book);
      const bookuid = "book-"+uuid();
      console.log(bookuid);
      this.setState({bookuid});
      const uploadBook = storage.ref(`books/${bookuid}`).put(book);
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
          storage.ref('books').child(bookuid).getDownloadURL().then(bookFile => {
              this.setState({bookFile})
              console.log(bookFile);
              console.log(this.state);
          })
      });

      console.log(this.state);
      // this.props.createBook(this.state);
  }



  render() {

    // console.log(this.state);

    return (
      <div className="AddBook">
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Form.Label style={{"float": "left"}}>Name</Form.Label>
            <Form.Control autoFocus type="text" id="bookName" onChange = {this.handleChange} placeholder="Name"/>
          </FormGroup>
          <FormGroup>
            <Form.Label style={{"float": "left"}}>Author</Form.Label>
            <Form.Control type="text" id="author" onChange = {this.handleChange} placeholder="Author"/>
          </FormGroup>
          <Form.Group >
            <Form.Label style={{"float": "left"}}>Description</Form.Label>
            <Form.Control as="textarea" id="description" onChange = {this.handleChange} rows="3" placeholder="Description"/>
          </Form.Group>
          <Form.Group >
            <Form.Label style={{"float": "left"}} >Select Cover</Form.Label>
            <input type="file" id="coverFile" name="CoverFile" onChange = {this.handleCoverChange}/>
          </Form.Group>
          <Form.Group >
            <Form.Label style={{"float": "left"}} >Select Book</Form.Label>
            <input type="file" id="bookFile" name="BookFile" onChange = {this.handleBookChange}/>
            {/* <Button onClick={this.handleBookSubmit}>Upload book and cover</Button> */}
            <p>please click upload before adding book , it will throw an file type error otherwise, that will be taken care of in some time</p>
          </Form.Group>
          <Button type="submit">Add Book</Button>
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