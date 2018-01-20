import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card, { CardContent} from 'material-ui/Card';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  container: {
    margin: 'auto',
    textAlign: 'center',
    width: '700px',
  },
  cardHeading: {
    padding: '16px',
  },
  errorMessage: {
    padding: '0 16px',
    color: 'tomato',
  },
  fieldLine: {
    padding: '16px',
  },
  buttonLine: {
    padding: '16px',
  },
});

const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  user,
  classes
}) => (
  <div>
  <Card className={classes.container}>
    <form action="/" onSubmit={onSubmit}>
      <h2 className={classes.cardHeading}>Login</h2>

      {errors.summary && <p className={classes.errorMessage}>{errors.summary}</p>}

      <div className={classes.fieldLine}>
        <TextField
          floatingLabelText="Email"
          name="email"
          errorText={errors.email}
          onChange={onChange}
          value={user.email}
        />
      </div>
      <div className={classes.fieldLine}>
        <TextField
          floatingLabelText="Password"
          type="password"
          name="password"
          onChange={onChange}
          errorText={errors.password}
          value={user.password}
        />
      </div>
      <div className={classes.buttonLine}>
        <Button raised type="submit" primary>Login</Button>
      </div>
      <CardContent>Don't have an account? <Link to={'/signup'}>Create one</Link>.</CardContent>
    </form>
  </Card>
  </div>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginForm);
