import React from "react";
import "./LogIn.css";
import { Button, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
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

  handleLogin = (event) => {
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <h1 className="sign">Sign in!</h1>
        <div className="form-section">
          <form>
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
              <Link to="/profile">
                <Button variant="contained" color="primary">
                  Log In
                </Button>
              </Link>
            </div>

            <div className="button-section">
              <Link to="/signup">
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default LogIn;
