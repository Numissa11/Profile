import React from "react";
import { MuiThemeProvider, Grid, Paper } from "@material-ui/core";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import SignUp from "./containers/SignUp/SignUp";
import SignIn from "./containers/SignIn/SignIn";
import Profile from "./containers/Profile/Profile";
import requireAuth from "./hoc/requireAuth";
import requireNotAuth from "./hoc/requireNotAuth";

function App() {
  return (
    <div className="App">
      <MuiThemeProvider>
        <Grid container alignItems="center" style={{ height: "100%" }}>
          <Grid item xs={12}>
            <Paper elevation={4} style={{ margin: 32 }}>
              <Grid container alignItems="center" justify="center">
                <Grid item xs={12} sm={6} style={{ textAlign: "center" }}>
                  <img
                    src="https://images.all-free-download.com/images/graphiclarge/tomjerry_6821722.jpg"
                    alt="TomJerry"
                  />
                </Grid>
                <Grid item xs={12} sm={6} alignContent="center">
                  <BrowserRouter>
                    <Switch>
                      <Redirect exact from="/" to="/signin" />
                      <Route
                        exact
                        path="/profile"
                        component={requireAuth(Profile)}
                      />
                      <Route
                        exact
                        path="/signin"
                        component={requireNotAuth(SignIn)}
                      />
                      <Route
                        exact
                        path="/signup"
                        component={requireNotAuth(SignUp)}
                      />
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

export default App;
