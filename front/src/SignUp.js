import React from "react";
import './SignUp.css'
import { Button, Snackbar, TextField } from '@material-ui/core';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      lastname: "",
      email: "",
      password: "",
      flash: "",
      openSnackbar: false     
    };
  }

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
    console.log(this.state);
  };

  
  handleSubmit = (event) => {
    const { flash, openSnackbar, ...newUser } = this.state;
    event.preventDefault();
    console.log(newUser);
    
    fetch('/auth/signup',
    {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(newUser),
    })
    .then(res => res.json())
    .then(
      res => this.setState({flash: res.flash}),
      err => this.setState({flash: err.flash}),
    ).then(
      this.setState({ openSnackbar: true })
    )
  };

  handleCloseSnackbar = () => {
    this.setState({ openSnackbar: false });
  };


  render() {
    const titleJSON = JSON.stringify(this.state);
    console.log("JSON file", titleJSON);

    const { flash, openSnackbar } = this.state;
    console.log("snack", openSnackbar);

    return (
      <div>
        <h1 className="sign">Sign up!</h1>
        <div className="form-section">
        <form>
        <div>Name</div>
          <TextField
            id="name"
            placeholder="enter your name"
            value={this.state.name}
            name="name"
            onChange={this.handleChange}
          />
          <div>Lastname</div>
          <TextField
            id="lastname"
            placeholder="enter your lastname"
            value={this.state.lastname}
            name="lastname"
            onChange={this.handleChange}
          />
          <div>E-mail</div>
          <TextField
            id="email"
            placeholder="enter your e-mail"
            value={this.state.email}
            name="email"
            onChange={this.handleChange}
          />
          <div>Password</div>
          <TextField
            id="password"
            placeholder="enter your password"
            value={this.state.password}
            name="password"
            onChange={this.handleChange}
          />
        
          <div className="button-section">
          <Button variant="contained" color="primary" onClick={this.handleSubmit}>
            Send
          </Button>
          </div>
          <Snackbar
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              open={openSnackbar}
              onClose={this.handleCloseSnackbar}
              message={flash}
            >
            </Snackbar>
        </form>
      </div>
      </div>

    );
  }
}

export default SignUp;
