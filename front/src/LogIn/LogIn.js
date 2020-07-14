import React from "react";
import "./Login.css";
import { Button, TextField } from "@material-ui/core";

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

  handleSubmit = (event) => {
    const { ...newUser } = this.state;
    event.preventDefault();
    console.log(newUser);

    fetch("/auth/signin", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(newUser),
    }).then((res) => res.json());
  };

  render() {
    return (
      <div>
        <h1 className="sign">Log in!</h1>
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
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleSubmit}
              >
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default LogIn;
