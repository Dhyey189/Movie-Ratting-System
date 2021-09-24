import React, { useState } from "react";
import "./App.css";
import Signup from "./authentication/signup";
import Login from "./authentication/login";
import Search from "./API/search";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Button, Input } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import { Redirect } from "react-router-dom";
import Movies from "./API/movies";
import MovieDetails from "./MovieDetails";

var styles = {
  Inputs: {
    Color: 'black',
    backgroundColor: 'white',
    fontSize: '15px',
    '&:hover': {
      color: 'green !important',
    }
  },
  search:{
      backgroundColor: 'white',
      color:'inherit',
      borderRadius:'5px',
      padding: '0 10px',
  }
}

function Nav() 
{
  const [data, setData] = useState(JSON.parse(localStorage.getItem("userinfo")));
  const [movieData, setMovieData] = useState(null);
  const [search, setSearch] = useState("");
  const [movieDetails, setMovieDetails] = useState({});
  const [routeValue, setRouteValue] = useState(null);
  const [rd,setRd]=useState(false);
  function handleCallback(childData) {
    setData(childData);
    localStorage.setItem("userinfo", JSON.stringify(childData));
  }

  const logout = (event) => {
    event.preventDefault();
    localStorage.clear();
    setData(null);
  };

  const searchMovie = (e) => {
      e.preventDefault();
      return (fetch(`http://www.omdbapi.com/?apikey=92ca64f5&s=${search}`)// searching from OMDB.com using Rest API.
      .then(res => res.json())
      .then(
        (result) => {
            setSearch(search);
            setMovieData(result);
            setRd(true);
        },
        (error) => {
          console.error(error);
        }
      ))
    }
  
  function movieCallBack(movieDetails) {
    setMovieDetails(movieDetails);
    setRouteValue("/" + movieDetails.result.imdbID);
    console.log(routeValue);
  }

  return (
    <Router>
    <div>
      <div className="nav-5">
        <nav>
          <div className="mainbar"></div>

          <div className="account">
            <div className="search">
              <div style={styles.search}>
                <form>
                  <Input placeholder="Search for a movie..." type="text" value={search} style={styles.Inputs}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                  <IconButton type="submit" color="primary" title="click here to search" aria-label="add to shopping cart" onClick={searchMovie}>
                    <SearchIcon />
                  </IconButton>
                </form>
              </div>
            </div>
            {data ? (
              data.success ? (
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
              ) : (
                <>
                  <Signup className="signup" parentCallback={handleCallback} />
                  <Login className="login" parentCallback={handleCallback} />
                </>
              )
            ) : (
              <>
                <Signup className="signup" parentCallback={handleCallback} />
                <Login className="login" parentCallback={handleCallback} />
              </>
            )}
          </div>
        </nav>
      </div>
      <div>
          {
            rd===true?
              <Redirect to="/show"/>
            :null
          }
        <Switch>
          <Route exact path="/"><p>You are at home!</p></Route>
          <Route exact path="/show"><Movies movieData={movieData} searched={search} movieCallBack={movieCallBack} /></Route>
          <Route exact path={routeValue}><MovieDetails/></Route>
        </Switch>
      </div>
    </div>
    </Router>
  );
}

export default Nav;
