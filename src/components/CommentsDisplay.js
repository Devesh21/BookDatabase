import React, { Component } from "react";
import firebase from "../config/firebaseConfig";
const firestore = firebase.firestore();


class CommentsDisplay extends Component {

    state = {
        comments: []
    }

    componentDidMount() {
        const bId = this.props.bookDetails;
        console.log(bId);
        
        firestore.collection('comments').doc(bId).get()
        .then((snapshots) => {
            console.log(snapshots.data().comments);
            this.setState({comments: snapshots.data().comments});
            console.log(this.state);
            
        })
    }


    render() {
        const comments = this.state.comments;
        return <div >
            display comments here!!
        </div>;
    }
}
export default CommentsDisplay;
