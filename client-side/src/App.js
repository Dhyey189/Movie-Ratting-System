import { Button } from "@material-ui/core";
import React, { useState } from "react";
import "./App.css";
import Signup from "./authentication/signup";
import Login from "./authentication/login";
import Search from "./API/search";
import Movies from "./API/movies";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { makeStyles, alpha } from "@material-ui/core/styles";
import MovieDetails from'./MovieDetails.js';
// App component is starting component of project

function App() {
  const [data, setData] = useState(JSON.parse(localStorage.getItem("userinfo")));
  const [movieData, setMovie] = useState(null);
  const [searched,setSearched] = useState(null);
  const [movieDetails, setMovieDetails] = useState({});
  const [routeValue,setRouteValue] = useState(null);

  function handleCallback(childData) {
    setData(childData);
    localStorage.setItem("userinfo", JSON.stringify(childData));
  }
  function handleMovieSearch(childData,search) {
    setMovie(childData);
    setSearched(search);
  }

  function movieCallBack(movieDetails) {
    setMovieDetails(movieDetails);
    setRouteValue("/"+movieDetails.result.imdbID);
    console.log(routeValue);
  }
  // For logging out the client.
  const logout = (event) => {
    event.preventDefault();
    localStorage.clear();
    setData(null);
  }

  return (
    <Router>

    <div className="app">
      <div className="nav-5">
        <nav>
          
          <div className="mainbar">
            
          </div>

          <div className="account">
            <div className="search">
              <Search parentCallback={handleMovieSearch} />
            </div>
            {
              data ?
                data.success ?
                  <>
                    <h3>{data.user.displayName}</h3>
                    <Button
                      variant="contained"
                      type="submit"
                      width="inherit"
                      color="primary"
                      onClick={logout}
                    >
                      Logout
                    </Button>
                  </>
                  :
                  <>
                    <Signup className="signup" parentCallback={handleCallback} />
                    <Login className="login" parentCallback={handleCallback} />
                  </>
                :
                <>

                  <Signup className="signup" parentCallback={handleCallback} />
                  <Login className="login" parentCallback={handleCallback} />
                </>
            }
          </div>
        </nav>
      </div>
          {
            movieData ?
              <Movies movieData={movieData} searched={searched} movieCallBack={movieCallBack}/>
              : null}{
                routeValue?
                <>
                <Switch>
                <Route name="movieRoute" path={routeValue}>
                  <MovieDetails />
                </Route>
                </Switch>
                </>
                :null
          }
      </div>
      </Router>
  );
}
export default App;