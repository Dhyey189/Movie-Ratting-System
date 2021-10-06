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
    <div>
      <Router path="/">
        <Navbar />
      </Router>
    </div>
  );
}
export default App;
