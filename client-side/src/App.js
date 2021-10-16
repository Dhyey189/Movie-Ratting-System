import { Button } from "@material-ui/core";
import React, { useState } from "react";
import "./App.css";
import Signup from "./authentication/signup";
import Login from "./authentication/login";
import Search from "./search";
import Movies from "./movies";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MovieDetails from "./MovieDetails.js";
import Navbar from "./Navbar.js";
// App component is starting component of project

function App() {
  return (
    <>
    {/* <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"/>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script> */}
    <div>
      <Router> 
      <Route exact path="/"><Navbar is_search={true}/></Route>
      <Route  path="/search"><Navbar is_search={false}/></Route>
      <Switch>
        <Route path={`/search`} component={Search} />
      </Switch>
      </Router>
    </div>
    </>
  );
}
export default App;
