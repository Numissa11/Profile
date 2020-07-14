import React from "react";
import './Profile.css'
import { ListItemText, ListItem, List } from '@material-ui/core';

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
      <div>
        <h1 className="sign">Profile</h1>
        <div className="form-section">

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
         
      
      </div>
      </div>


    );
  }
}

export default Profile;
