import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, useLocation,useHistory } from "react-router-dom";
import Movies from "./movies";
import MovieDetails from "./MovieDetails";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';


function Search({ match ,render,setrender}) {
  const [movieData, setMovieData] = useState(null);
  const query = new URLSearchParams(useLocation().search);
  const history = useHistory();
  useEffect(() => {
    return (fetch(`http://www.omdbapi.com/?apikey=92ca64f5&s=${query.get('movies')}`)// searching from OMDB.com using Rest API.
      .then(res => res.json())
      .then(
        (result) => {
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
          (query.get('movies') && movieData && movieData.Response === "True") ?
            <Movies movieData={movieData} render={render} setrender={setrender}/> :
            (
              (query.get('id')) ?
                <Route path={`/search/details/`}><MovieDetails render={render} setrender={setrender}/></Route> 
              :
              (
                // <h1>Please enter valid input to search for movie!!</h1>
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                  <strong>Movie not prsent! </strong> Please enter valid input to search for movie!!
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={()=>history.push("/")}></button>
                </div>
              )
            )
        }
      </Switch>
    </Router>
  )
}
export default Search;