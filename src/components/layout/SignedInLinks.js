import React from "react";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {signOut} from "../../store/actions/authActions";

const SignedInLinks = props => {
  return (
    <ul className="right" style={{"padding-left": "10px"}}>
      <li style={{"list-style": "none"}}>
        <NavLink to="/user" className="btn btn-info">
          {props.profile.firstName} {props.profile.lastName}
        </NavLink>
      </li>
      <li style={{"list-style": "none"}}>
        <NavLink to="/addbook" onClick={props.profile.lastName}>
          Add Book
        </NavLink>
      </li>
      <li style={{"list-style": "none"}}>
        <NavLink to="/" onClick={props.signOut}>
          Log Out
        </NavLink>
      </li>
    </ul>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SignedInLinks);
