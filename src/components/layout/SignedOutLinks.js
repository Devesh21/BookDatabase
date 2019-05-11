import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedOutLinks = () => {
    return (
        <ul className="right" style={{"padding-left": "10px"}}>
            <li style={{"list-style": "none"}}><NavLink to="/">Sign Up</NavLink></li>
            <li style={{"list-style": "none"}}><NavLink to="/">Log In</NavLink></li>
        </ul>
    )
};

export default SignedOutLinks;