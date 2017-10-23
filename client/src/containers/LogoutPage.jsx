import React from 'react';
import Auth from '../modules/Auth.js';


class LogoutPage extends React.Component {

  /**
  * Class constructor.
  */
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      errors: {},
      user: {
        email: '',
        password: ''
      }
    };

    this.componentWillMount= this.componentWillMount.bind(this);
  }

  componentWillMount() {
    Auth.deauthenticateUser();
    this.props.history.push('/');
  }

  render(){
    return null;
  };

}

export default LogoutPage;
