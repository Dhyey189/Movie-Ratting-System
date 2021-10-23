import ReactDOM from 'react-dom';
import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { BrowserRouter as Router, Switch, Route, Link, useHistory, useRouteMatch } from "react-router-dom";
import MovieDetails from "./MovieDetails";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import "./movies.css";

function Movies({ movieData ,render,setrender}) {
    const { path, url } = useRouteMatch();
    const history = useHistory();
    const [movieDetails, setMovieDetails] = useState({});
    const [routeValue, setRouteValue] = useState("");

    const [item, setItem] = useState(null);
    useEffect(() => {
        if (item) {
            return (fetch(`http://www.omdbapi.com/?apikey=92ca64f5&i=${item.imdbID}`)// searching from OMDB.com using Rest API.
                .then(res => res.json())
                .then(
                    (result) => {
                        setMovieDetails(result);
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

    const options = [
        {
            label: "Sort by Newest",
            value: "new",
        },
        {
            label: "Sort by Oldest",
            value: "old",
        },
        {
          label: "A-to-Z",
          value: "atoz",
        },
        {
          label: "Z-to-A",
          value: "ztoa",
        },
    ];
    
    const [sort, setSort] = useState("new");
    
    function handleChange(e) {
        setSort(e.target.value);
    }

    if(sort === "new")
    {
        if (movieData != null && movieData.Response === 'True') 
        {
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
    }
    else if(sort === "old")
    {
        if (movieData != null && movieData.Response === 'True') 
        {
            
            movieData.Search.sort(function (a, b) {
                let dateA = parseInt(a.Year);
                let dateB = parseInt(b.Year);
                if (dateA < dateB) {
                    return -1;
                }
                else if (dateA > dateB) {
                    return 1;
                }
                return 0;
            });
        }
    }
    else if(sort === "atoz")
    {
        if (movieData != null && movieData.Response === 'True') 
        {
            movieData.Search.sort(function (a, b) {
                let dateA = a.Title;
                let dateB = b.Title;
                if (dateA < dateB) {
                    return -1;
                }
                else if (dateA > dateB) {
                    return 1;
                }
                return 0;
            });
        }
    }
    else if(sort === "ztoa")
    {
        if (movieData != null && movieData.Response === 'True') 
        {
            movieData.Search.sort(function (a, b) {
                let dateA = a.Title;
                let dateB = b.Title;
                if (dateA < dateB) {
                    return 1;
                }
                else if (dateA > dateB) {
                    return -1;
                }
                return 0;
            });
        }
    }

    return (
        <Router>
            <Switch>
                <Route path={`/search/details/`}><MovieDetails render={render} setrender={setrender}/></Route>
                <Route path="/search/">
                    <div className="d-flex justify-content-end" >
                        <select value={sort} onChange={handleChange} className="select dropdown-menu">
                            {options.map((option) => (
                                <option value={option.value} className="dropdown-item">{option.label}</option>
                            ))}
                        </select>
                    </div>
                    <span style={{ 'display': 'flex', 'flexDirection': 'row', 'flexWrap': 'wrap' }}>
                        {
                            (movieData && movieData.Response === "True") ?
                                movieData.Search.map((item, index) => (
                                    <div style={{ 'height': '60%', 'width': '300px', 'margin': '20px auto' }}>
                                        <Link  style={{textDecoration: 'none'}} key={index} to={`/search/details/?id=${item.imdbID}`} >
                                            <Card key={index} sx={{ maxWidth: 345 }} >
                                                <CardActionArea className="moviecard" onClick={(e) => { setItem(item); setRouteValue(`${item.imdbID}`);if(item.Poster=="N/A"); }}>
                                                    <CardMedia
                                                        component="img"
                                                        height="350px"
                                                        image={item.Poster}
                                                        alt="green iguana"
                                                    />
                                                    <CardContent>
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