import React from 'react';
import { connect } from 'react-redux';
import { List, ListItem, ListItemText } from '@material-ui/core';
import './Profile.css'
// import { Button } from '@material-ui/core';


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {
        email: "yourEmail@gmail.com",
        name: "Tom",
        lastname: "Jerry",
        redirect: false
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


  getOut = () => {
    console.log("sign out");
    this.setState({ redirect: true }) 
    
  }


  render() {
  //  const { email, name, lastname } = this.props.user

    console.log('props', this.props)
    return (
      <div >
        <div className='MyProfile'>My Awesome profile</div>
        <div className="Profile">
        <List>
          <ListItem>
            <ListItemText primary="Email" 
            secondary={this.props.user.email ? this.props.user.email : null} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Name" 
            secondary={this.props.user.name ? this.props.user.name : null} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Last Name" 
            secondary={this.props.user.lastname ? this.props.user.lastname : null} />
          </ListItem>
        </List>

        </div>
       

        
       {/* { <Button variant="contained" color="primary" onClick={this.getOut}  secondary={this.state.redirect ? (<Redirect push to="/"/>) : null}>Sign Out</Button>} */}
          
       

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