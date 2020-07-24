import React from 'react';
import { connect } from  'react-redux';
import { Button, Snackbar, TextField, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from "react-router-dom";
import './SignIn.css';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "mon@email.com",
      password: "monPassw0rd",
      flash: "",
      openSnackbar: false,
      signIn: false
    }
  }

  updateFields = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value })
  }

  handleSubmit = (event) => {
    const { flash, openSnackbar, signIn, ...user} = this.state;
    event.preventDefault();
    console.log("signin", user);
    
    fetch('/auth/signin',
    {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(user),
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(res.statusText);
      }
    })
    .then(res => {
      console.log("signin ok");
      this.props.dispatch(
        {
          type : "CREATE_SESSION",
          user: res.user,
          token : res.token,
          message : res.message
        }
      );
      this.setState({ flash: this.props.flash, signIn: true });
    })
    .catch(err => {
      // this.setState({ flash: err.message })
      this.setState({ flash: "The email address or password is incorrect, please try again." })
    })
    .then(
      this.setState({ openSnackbar: true })
    )
  }

  handleCloseSnackbar = () => {
    this.setState({ openSnackbar: false });
    // this.props.history.push({pathname: '/profile'});
    this.props.history.push({pathname: '/'}); // = this.props.history.replace("/");
  };

  render() {
    const { flash, openSnackbar } = this.state;
    
    return(
      <div className="SignUp">
        <div className="signup-section">
          <Link to="/signup">
            <Button variant="contained" color="secondary" size="small">Sign Up</Button>
          </Link>
        </div>
        <h3>Sign in!</h3>
        <div className="form-section">
          <form onSubmit={this.handleSubmit}>
            <div>Email</div>
            <TextField type="email" name="email" onChange={this.updateFields} fullWidth required/>
            <div>Password</div>
            <TextField type="password" name="password" onChange={this.updateFields} required/>
            <div className="button-section">
              <Button variant="contained" color="primary" onClick={this.handleSubmit}>Sign In</Button>
            </div>
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              open={openSnackbar}
              autoHideDuration={1500}
              onClose={this.handleCloseSnackbar}
              message={flash ? flash : 'Something went wrong, please try again later.'}
              action={
                <React.Fragment>
                  <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={this.handleCloseSnackbar}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </React.Fragment>
              }
              className="snackbar-signin"
            />
          </form>
        </div>
      </div>
    );
  }
}

function  mapStateToProps(state) {
  return {
    flash: "successfully logged in",
  }
};

export default connect(mapStateToProps)(SignIn);