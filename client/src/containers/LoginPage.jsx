import React from 'react';
import LoginForm from '../components/LoginForm.jsx';
import Auth from '../modules/Auth.js';


class LoginPage extends React.Component {

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

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  /**
  * Process the form.
  *
  * @param {object} event - the JavaScript event object
  */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    console.log('email:', this.state.user.email);
    console.log('password:', this.state.user.password);

    const email = encodeURIComponent(this.state.user.email);
    const password =encodeURIComponent(this.state.user.password);
    const formData = JSON.stringify({ username: email, password: password });

    const xhr = new XMLHttpRequest();
    xhr.open('post', 'auth');
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.responseType='json';
    xhr.addEventListener('load', () => {
        console.log(xhr);
      if(xhr.status === 200) {
        // Success
        this.setState({
          errors:{}
        });

        Auth.authenticateUser(xhr.response.token, xhr.response.user);

        this.props.history.push('/');

      } else {
        // Failure

        const errors = {summary: 'Login attempt failed... have you forgotten your password?'};

        this.setState({
          errors
        });
      }
    });
    xhr.send(formData);
  }

  /**
  * Change the user object.
  *
  * @param {object} event - the JavaScript event object
  */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  /**
  * Render the component.
  */
  render() {
    return (
      <LoginForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }

}

export default LoginPage;
