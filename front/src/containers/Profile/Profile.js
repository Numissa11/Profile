import React from 'react';
import { connect } from  'react-redux';
import { List, ListItem, ListItemText, Button } from '@material-ui/core';
import { Link }  from 'react-router-dom';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state  = {
      profile: {
        email:  "yourEmail@gmail.com",
        name:  "Tom",
        lastname:  "Jerry"
      }
    }
  }

  componentDidMount = () => {
    console.log("profile");
    fetch('/auth/profile',
      {
        headers: {
         'Authorization': 'Bearer ' + this.props.token,
        }
      })
    .then(res => res.json())
    .then(res => {this.setState({ profile: res })})
  }



  getSignOut = () => {
    const { history } = this.props;
    console.log("sign out");
    // this.props.dispatch({ type: "" });
   history.push({pathname: '/'});
  }

  render() {
    const { email , name, lastname } = this.state.profile;

    return(
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

function  mapStateToProps(state) {
  return {
    token: state.auth.token,
  }
};

export default connect(mapStateToProps)(Profile);