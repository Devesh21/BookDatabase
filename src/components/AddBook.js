import React, {Component} from "react";
import {Button, Form, FormGroup} from "react-bootstrap";

class AddBook extends Component {
  render() {
    return (
      <div className="AddBook">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="Name">
            <Form.Label style={{"float": "left"}}>Name</Form.Label>
            <Form.Control autoFocus type="text" placeholder="Name"/>
          </FormGroup>
          <FormGroup controlId="Author">
            <Form.Label style={{"float": "left"}}>Author</Form.Label>
            <Form.Control type="text" placeholder="Author"/>
          </FormGroup>
          <Form.Group controlId="Description">
            <Form.Label style={{"float": "left"}}>Description</Form.Label>
            <Form.Control as="textarea" rows="3" placeholder="Description"/>
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

export default AddBook;