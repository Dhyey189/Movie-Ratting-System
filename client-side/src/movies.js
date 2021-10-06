import ReactDOM from 'react-dom';
import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { BrowserRouter as Router, Switch, Route, Link, useHistory, Redirect, useRouteMatch } from "react-router-dom";
import MovieDetails from "./MovieDetails";

function Movies({ movieData }) {
    const { path, url } = useRouteMatch();
    const history = useHistory();
    const [movieDetails, setMovieDetails] = useState({});
    const [routeValue, setRouteValue] = useState("");
    //first we sort the "movieData" in recently release movie
    if (movieData != null && movieData.Response === 'True') {
        movieData.Search.sort(function (a, b) {
            let dateA = parseInt(a.Year);
            let dateB = parseInt(b.Year);
            if (dateA < dateB) {
                return 1;
            }
            else if (dateA > dateB) {
                return -1;
            }
            return 0;
        });
    }
    const [item, setItem] = useState(null);
    useEffect(() => {
        if (item) {
            return (fetch(`http://www.omdbapi.com/?apikey=92ca64f5&i=${item.imdbID}`)// searching from OMDB.com using Rest API.
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log(result);
                        console.log(url, path);
                        setMovieDetails(result);

                        // setItem(null);
                    },
                    (error) => {
                        console.error(error);
                        setRouteValue(`${path}`);
                    }
                ))
        }
        else {
            return false;
        }
    }, [item])

    return (
        <Router>
            <Switch>
                <Route path={`/search/details/`}><MovieDetails /></Route>
                <Route path="/search/">
                    <span style={{ 'display': 'flex', 'flexDirection': 'row', 'flexWrap': 'wrap' }}>
                        {
                            (movieData && movieData.Response === "True") ?
                                movieData.Search.map((item, index) => (
                                    <div style={{ 'height': '60%', 'width': '300px', 'margin': '10px auto' }}>
                                        <Link key={index} to={`/search/details/?id=${item.imdbID}`} >
                                            <Card key={index} sx={{ maxWidth: 345 }} >
                                                <CardActionArea onClick={(e) => { setItem(item); setRouteValue(`${item.imdbID}`);if(item.Poster=="N/A"); }}>
                                                    <CardMedia
                                                        component="img"
                                                        height="350px"
                                                        image={item.Poster}
                                                        alt="green iguana"
                                                    />
                                                    <CardContent >
                                                        <Typography gutterBottom variant="h5" component="div">
                                                            <div className="movie-title">{item.Title}</div>
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>

                                            </Card>
                                        </Link>
                                    </div>
                                )
                                )
                                : null
                        }
                    </span>
                </Route>
            </Switch>
        </Router>
    )
}
export default Movies;