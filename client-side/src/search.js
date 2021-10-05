import { Button, Input } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles, alpha } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import { BrowserRouter as Router, Switch, Route, Link, useHistory, Redirect, useRouteMatch,useLocation } from "react-router-dom";
import Movies from "./movies";

function Search({ match }) {
  const [movieData, setMovieData] = useState(null);
  const history = useHistory();
  const query = new URLSearchParams(useLocation().search);
  const { path, url } = useRouteMatch();
  console.log(match);
  useEffect(() => {
    return (fetch(`http://www.omdbapi.com/?apikey=92ca64f5&s=${query.get('movies')}`)// searching from OMDB.com using Rest API.
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result,"hello1");
          setMovieData(result);
        },
        (error) => {
          console.error(error);
        }
      ))
  }, [query.get('movies')])

  return (
    <Router>
      <Switch>
        {
          (query.get('movies') && movieData && movieData.Response==="True") ?
            <Movies movieData={movieData} /> :
            <h1>Please Enter Valid Movie Title!!</h1>
        }
      </Switch>
    </Router>
  )
}
export default Search;