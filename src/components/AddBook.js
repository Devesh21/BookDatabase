import React, {Component} from "react";
import {Button, Form, FormGroup} from "react-bootstrap";
import { connect } from 'react-redux';
import { createBook } from '../store/actions/bookActions';




class AddBook extends Component {

  state = {
    bookName: '',
    author: '',
    description: ''
  }

  handleChange = (e) => {
    this.setState({
        [e.target.id] : e.target.value
    })
  }

  handleSubmit = (e) => {
      e.preventDefault();
      console.log(this.state);
      this.props.createBook(this.state);
      // this.props.history.push('/');
  }



  render() {

    console.log(this.state);

    return (
      <div className="AddBook">
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
            <Form.Label style={{"float": "left"}}>Select Cover</Form.Label>
            <input type="file" name="CoverFile"/>
          </Form.Group>
          <Form.Group controlId="BookFile">
            <Form.Label style={{"float": "left"}}>Select Book</Form.Label>
            <input type="file" name="BookFile"/>
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