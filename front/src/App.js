import React from "react";
import { MuiThemeProvider, Grid, Paper } from "@material-ui/core";
import "./index.css";
import SignUp from "./SignUp/SignUp";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Profile from "./Profile/Profile";
import LogIn from "./LogIn/LogIn";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <Grid container style={{ height: "100%" }}>
            <Grid item xs={12}>
              <Paper elevation={4} style={{ margin: 32 }}>
                <Grid container justify="center">
                  <Grid item xs={12} sm={6} style={{ textAlign: "center" }}>
                    <img
                      src="https://i.pinimg.com/originals/22/6a/59/226a59abacc9c9bc41a2907e63d8aea8.jpg"
                      alt="Homer"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <BrowserRouter>
                      <Switch>
                      <Route exact path="/" component={LogIn} />

                        <Route exact path="/signUp" component={SignUp} />
                        <Route exact path="/logIn" component={LogIn} />
                        <Route exact path="/profile" component={Profile} />
                      </Switch>
                    </BrowserRouter>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </MuiThemeProvider>
      </div>
    );
  }
}
export default App;
