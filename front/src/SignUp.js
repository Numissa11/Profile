import React from "react";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }

  handleChange = (event) => {
    this.setState({ email: event.target.value });
    console.log(this.state.email);
  };

  render() {
    return (
      <div className="mx-auto mt-4 mb-4" style={{ width: "287px" }}>
        <h1>e-mail : {this.state.email}</h1>

        <input
          id="input"
          placeholder="enter your email"
          value={this.state.email}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default SignUp;
