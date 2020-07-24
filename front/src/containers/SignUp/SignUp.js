import React from 'react';
import { Button, Snackbar, TextField, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from "react-router-dom";
import './SignUp.css';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "mon@email.com",
      password: "monPassw0rd",
      name: "James",
      lastname: "Bond",
      flash: "",
      openSnackbar: false
    }
  }

  updateFields = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value })
  }

  handleSubmit = (event) => {
    const { flash, openSnackbar, ...user } = this.state;
    event.preventDefault();
    console.log("signup", user);
    
    fetch('/auth/signup',
    {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(user),
    })
    .then(res => res.json())
    .then(
      res => this.setState({flash: res.flash}),
      err => this.setState({flash: err.flash}),
    ).then(
      this.setState({ openSnackbar: true })
    )
  }

  handleCloseSnackbar = () => {
    this.setState({ openSnackbar: false });
    this.props.history.push({pathname: '/'});
  };

  render() {
    const { flash, openSnackbar } = this.state;
    
    return(
      <div className="SignUp">
        <div className="signup-section">
          <Link to="/signin">
            <Button variant="contained" color="secondary" size="small">Sign In</Button>
          </Link>
        </div>
        <h3>Sign up!</h3>
        <div className="form-section">
          <form onSubmit={this.handleSubmit}>
            <div>Email</div>
            <TextField type="email" name="email" onChange={this.updateFields} fullWidth required/>
            <div>Password</div>
            <TextField type="password" name="password" onChange={this.updateFields} required/>
            <div>Password Confirmation</div>
            <TextField type="password" name="passwordconf" required/>
            <div>Name</div>
            <TextField type="text" name="name" onChange={this.updateFields} required/>
            <div>Lastname</div>
            <TextField type="text" name="lastname" onChange={this.updateFields} required/>
            <div className="button-section">
              <Button variant="contained" color="primary" onClick={this.handleSubmit}>Submit</Button>
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
          />
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;