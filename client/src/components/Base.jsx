import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth.js';


const Base = ({ children }) => (
  <div>
    <div className="top-bar">
      <div className="top-bar-left">
        <Link to="/">React App</Link>
      </div>

      {Auth.isAuthenticated()? (
        <div className="top-bar-right">
          {console.log(JSON.stringify(Auth.getUser(),null,4))}
          <span>{Auth.getUser().username}</span>
          <Link to="/logout">Log Out</Link>
        </div>
      ) : (
        <div className="top-bar-right">
          <Link to="/login">Log in</Link>
          <Link to="/signup">Sign up</Link>
        </div>
      )}

    </div>
    <div className="App-frame">
      {children}

    </div>
  </div>
);

Base.propTypes = {
    children: PropTypes.object.isRequired
};

export default Base;
