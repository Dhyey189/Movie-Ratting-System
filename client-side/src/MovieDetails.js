import ReactDOM from 'react-dom';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link, useHistory, Redirect, useRouteMatch, useLocation } from "react-router-dom";
// import Search from "./search";

function MovieDetails() {
    const query = new URLSearchParams(useLocation().search);
    const [movie, setMovie] = useState({});
    useEffect(() => {
        return (fetch(`http://www.omdbapi.com/?apikey=92ca64f5&i=${query.get('id')}`)// searching from OMDB.com using Rest API.
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    setMovie(result);
                },
                (error) => {
                    console.error(error);
                }
            ))
    }, [query.get('id')])

    return (
        <>
            <Router>
                {
                    (movie?.Response === "False") ? <Redirect to="/search" /> : null
                }
                <h1>Hello From Movie Details </h1>
                <h1> {movie.Title}</h1>
                <h1>
                    <iframe width="853" height="480" src="https://www.youtube.com/embed/TcMBFSGVi1c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </h1>
            </Router>
        </>
    );
}

export default MovieDetails;