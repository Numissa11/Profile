import React from "react";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      lastname: "",
      email: "",
      password: "",
      passwordconf: "",
    };
  }

  handleChange = (event) => {
    console.log(this.state)
    this.setState({ 
      email: event.target.value,
      lastname: event.target.value
     });
    console.log(this.state.email);
  };

  render() {
    return (
      <div className="mx-auto mt-4 mb-4" style={{ width: "287px" }}>
        <h1>e-mail : {this.state.email}</h1>

        <form>
          <input
            id="name"
            placeholder="enter your name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <input
            id="lastname"
            placeholder="enter your lastname"
            value={this.state.lastname}
            onChange={this.handleChange}
          />
          <input
            id="email"
            placeholder="enter your email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <input
            id="password"
            placeholder="enter your password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <input
            id="passwordconf"
            placeholder="enter your password confirmation"
            value={this.state.passwordconf}
            onChange={this.handleChange}
          />
        </form>
      </div>
    );
  }
}

export default SignUp;
