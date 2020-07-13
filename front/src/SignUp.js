import React from "react";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flash: "",
      name: "",
      lastname: "",
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

  getData = () => {
    const { flash, ...newUser } = this.state;
    fetch('/auth/signup', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then(
        (res) => this.setState({ flash: res.flash }),
        (err) => this.setState({ flash: err.flash }),
      );
    
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.getData();
  };



  render() {
    return (
      <div style={{ width: "1500px" }}>
        <h1>{JSON.stringify(this.state)}</h1>

        <form>
          <input
            id="name"
            placeholder="enter your name"
            value={this.state.name}
            name="name"
            onChange={this.handleChange}
          />
          <input
            id="lastname"
            placeholder="enter your lastname"
            value={this.state.lastname}
            name="lastname"
            onChange={this.handleChange}
          />
          <input
            id="email"
            placeholder="enter your email"
            value={this.state.email}
            name="email"
            onChange={this.handleChange}
          />
          <input
            id="password"
            placeholder="enter your password"
            value={this.state.password}
            name="password"
            onChange={this.handleChange}
          />
          {/* <input
            id="passwordconf"
            placeholder="confirm your password"
            value={this.state.passwordconf}
            name="passwordconf"
            onChange={this.handleChange}
          /> */}
          <button type="submit" value="Submit" onClick={this.handleSubmit}>
            Send
          </button>
        </form>
      </div>
    );
  }
}

export default SignUp;
