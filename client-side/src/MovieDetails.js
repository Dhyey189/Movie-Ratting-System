import ReactDOM from "react-dom";
import React, { useState, useEffect } from "react";
import { Button, Input } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  Redirect,
  useRouteMatch,
  useLocation,
} from "react-router-dom";
import "./App.css";

function getVideoIndex(item) {
  for (var i = item.length - 1; i >= 0; i--) {
    if (item[i].type === "Trailer" && item[i].official && item[i].site === "YouTube") {
      return i;
    }
  }
  return 0;
}
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    color: "black",
    fontSize: "30px",
    backgroundColor: "#fff",
    "borderRadius": "20px",
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 1000,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
function MovieDetails() {
  const query = new URLSearchParams(useLocation().search);
  const [movie, setMovie] = useState({});
  const [video, setVideo] = useState(null);
  const [type, setType] = useState("");
  const [openRatting, setOpenRatting] = useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const classes = useStyles();

  useEffect(() => {
    return (
      fetch(`https://api.themoviedb.org/3/find/${query.get("id")}?api_key=ec2573c833f28eda19e0f31ac19ec943&language=en-US&external_source=imdb_id`) // searching from OMDB.com using Rest API.
        .then((res) => res.json())
        .then(
          (result) => {
            if (result.movie_results.length > 0) {
              fetch(`http://api.themoviedb.org/3/movie/${result.movie_results[0].id}?api_key=ec2573c833f28eda19e0f31ac19ec943&append_to_response=videos`)
                .then((r) => r.json())
                .then((details) => {
                  setType("movie");
                  console.log(details);
                  if (details.videos.results.length > 0)
                    setVideo(details.videos.results);
                  console.log(video);
                });
            }
            else if (result.tv_results.length > 0) {
              fetch(`http://api.themoviedb.org/3/tv/${result.tv_results[0].id}?api_key=ec2573c833f28eda19e0f31ac19ec943&append_to_response=videos`)
                .then((r) => r.json())
                .then((details) => {
                  setType("series");
                  if (details.videos.results.length > 0)
                    setVideo(details.videos.results);
                  console.log(details);
                });
            }
          },
          (error) => {
            console.error(error);
          }
        )
    );
    // fetch(`http://www.omdbapi.com/?apikey=92ca64f5&i=${query.get("id")}`)

  }, [query.get("id")]);

  useEffect(() => {
    return (
      fetch(`http://www.omdbapi.com/?apikey=92ca64f5&i=${query.get("id")}`)// searching from OMDB.com using Rest API.
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result);
            setMovie(result);

            // setItem(null);
          },
          (error) => {
            console.error(error);
          }
        )
    );
  }, [query.get("id")]);


  return (
    <>
      <div className="titleBar">
        <div className="titleDetails">
          <div className="title">
            <span>{movie.Title}</span>
          </div>
          <div className="details">
            <div className="detail">
              {movie.Type}
            </div>
            <div className="detail">
              {movie.Released}
            </div>
          </div>
        </div>
        <div className="rattings">
          <div className="ratting">
            <div className="rate">Rattings</div>
            <div className="value">{movie.imdbRating}/10</div>
          </div>
          <div className="ratting">
            <div className="rate">Your Ratting</div>
            <div className="value">-/10</div>
          </div>
          <div>
            <Button onClick={() => setOpenRatting(true)}>Give Ratting</Button>
          </div>
        </div>
      </div>
      <Router>
        <div className="trailer">
          {
            video != null ?
              <iframe
                width="853"
                height="450"
                src={`https://www.youtube.com/embed/${video[getVideoIndex(video)].key}`}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
              : null
          }

        </div>
        <table class="rwd-table rwd-table-width-2">
          <tr>
            <th>Story-Line<div className="genre">
              {
                movie.Genre?.split(",").map((genre, index) => (
                  <span>{genre}</span>
                ))
              }
            </div></th>
            <th>
            </th>
          </tr>
          <tr>
            <td data-th="Directors">{movie.Plot}</td>
          </tr>
        </table>
        <div className="DetailsTables">
          <table class="rwd-table rwd-table-width">
            <tr>
              <th>Director</th>
            </tr>
            <tr>
              <td data-th="Director">{movie.Director}</td>
            </tr>
          </table>
          <table class="rwd-table rwd-table-width">
            <tr>
              <th>Actor</th>
            </tr>
            <tr>
              <td data-th="Actor">{movie.Actors}</td>
            </tr>
          </table>

          <table class="rwd-table rwd-table-width">
            <tr>
              <th>Awards</th>
            </tr>
            <tr>
              <td data-th="Awards">{movie.Awards}</td>
            </tr>
          </table>
          <table class="rwd-table rwd-table-width">
            <tr>
              <th>Awards</th>
            </tr>
            <tr>
              <td data-th="Awards">{movie.Awards}</td>
            </tr>
          </table>
          <table class="rwd-table rwd-table-width">
            <tr>
              <th>Awards</th>
            </tr>
            <tr>
              <td data-th="Awards">{movie.Awards}</td>
            </tr>
          </table>
          <table class="rwd-table rwd-table-width">
            <tr>
              <th>Awards</th>
            </tr>
            <tr>
              <td data-th="Awards">{movie.Awards}</td>
            </tr>
          </table>
        </div>
      </Router>
      <Modal
        open={openRatting}
        onClose={() => {
          setOpenRatting(false);
        }}
      >
        <div style={modalStyle} className={classes.paper} >
          <div class="item">
            <div><h3>Give Rattings</h3></div>
            <fieldset class="rating">
              <input type="radio" id="star10" name="rating" value="10" /><label class="full" for="star10" title="10 stars"></label>
              <input type="radio" id="star9" name="rating" value="9" /><label class="full" for="star9" title="9 stars"></label>
              <input type="radio" id="star8" name="rating" value="8" /><label class="full" for="star8" title="8 stars"></label>
              <input type="radio" id="star7" name="rating" value="7" /><label class="full" for="star7" title="7 stars"></label>
              <input type="radio" id="star6" name="rating" value="6" /><label class="full" for="star6" title="6 stars"></label>
              <input type="radio" id="star5" name="rating" value="5" /><label class="full" for="star5" title="5 stars"></label>
              <input type="radio" id="star4" name="rating" value="4" /><label class="full" for="star4" title="4 stars"></label>
              <input type="radio" id="star3" name="rating" value="3" /><label class="full" for="star3" title="3 stars"></label>
              <input type="radio" id="star2" name="rating" value="2" /><label class="full" for="star2" title="2 stars"></label>
              <input type="radio" id="star1" name="rating" value="1" /><label class="full" for="star1" title="1 star" checked ></label>
            </fieldset>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default MovieDetails;
