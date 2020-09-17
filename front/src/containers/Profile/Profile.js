import React from 'react';
import { connect } from 'react-redux';
import { List, ListItem, ListItemText, Button } from '@material-ui/core';



class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {
        email: "yourEmail@gmail.com",
        name: "Tom",
        lastname: "Jerry"
      }
    }
  }


  componentDidMount() {
    if (this.props.token) {
      // http://localhost:5000/auth/profile
      fetch("/auth/profile", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + this.props.token,
        },
      })
        .then((res) => res.json())
        .then(res => this.setState(res));
    }
  }


  render() {
    const { email, name, lastname } = this.state.profile;
    console.log(this.props)
    return (
      <div className="Profile">
        <List>
          <ListItem>
            <ListItemText primary="Email" secondary={email} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Name" secondary={name} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Last Name" secondary={lastname} />
          </ListItem>
        </List>



      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.auth.token,
    user: state.auth.user
  }
};

export default connect(mapStateToProps)(Profile);