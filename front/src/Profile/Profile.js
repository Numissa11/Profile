import React from "react";
import './Profile.css'
import { ListItemText, ListItem, List, Button } from '@material-ui/core';
import { Link } from "react-router-dom";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {
            email:  "Tom.Jerry@wildcodeschool.fr",
            name:  "Tom",
            lastname:  "Jerry"
        }
  }

}

  render() {

    return (
      <div className="box">
        <h1 className="sign">Profile</h1>
       

<List>
    <ListItem>
        <ListItemText 
        primary="Name" 
        secondary={this.state.profile.name}
      name="email"
        />
        <ListItemText 
        primary="Lastname" 
        secondary={this.state.profile.lastname}
      name="lastname"
        />
        <ListItemText 
        primary="e-mail" 
        secondary={this.state.profile.email}
      name="email"
        />
    </ListItem>
</List>
         
<div className="button-section logout">
              <Link to="/login">
                <Button variant="contained" color="primary">
                  Log Out
                </Button>
              </Link>
            </div>

      </div>


    );
  }
}

export default Profile;
