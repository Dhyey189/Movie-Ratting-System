import ReactDOM from "react-dom";
import React, { useState, useEffect } from "react";
import { Button, Input } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Rating from '@mui/material/Rating';
// import Box from '@mui/material/Box';
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
    width: 650,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function MovieDetails() {
  const [userinfo, setUserinfo] = useState(JSON.parse(localStorage.getItem("userinfo")));
  const query = new URLSearchParams(useLocation().search);
  const [movie, setMovie] = useState({});
  const [video, setVideo] = useState(null);
  const [type, setType] = useState("");
  const [openRatting, setOpenRatting] = useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const [feedback,setFeedback] = useState("");
  const [rating,setRating] = useState(0);
  const classes = useStyles();

  const rateit = (event) => {
    event.preventDefault();
    // body = {title,imdbid,ratting,userid,imdbvotes,imdbratting}
    const body = {
      title:movie.Title,
      imdbid:movie.imdbID,
      ratting:rating,
      userid:userinfo.user._id,
      imdbvotes:movie.imdbVotes,
      imdbratting:movie.imdbRating,
    };
    console.log(body);
    return fetch("http://localhost:8000/movieapi/setratting/", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {setOpenRatting(false);setUserinfo(localStorage.setItem("userinfo", JSON.stringify(data))); console.log(data); });
  };
  useEffect(()=>{
    console.log(userinfo);
    const info = JSON.parse(localStorage.getItem('userinfo'))
    const index = info.user.userratting.findIndex(element => element.imdbid === query.get("id"));
    console.log("index=",index)
    console.log(info.user.userratting);
    if(index!==-1)
    setRating(parseInt(info.user.userratting[index].ratting));
  },[query.get("id"),localStorage])

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
          <div class="item" align="center">
            <form>
            <div className="modal-head">Give Your Rattings to<i><b> {movie.Title}</b></i></div>
            <div classNmae="modal-ratting"><Rating name="m-reviews-ratting" value={rating} onChange={(event, newValue) => {setRating(newValue);}} defaultValue={rating} max={10} size="large" /></div>
            <div className="modal-input"><Input
                className="inputs"
                placeholder="Give Your thoughts!!"
                type="text"
                onChange={(e) => {
                  setFeedback(e.target.value)
                }}
              /></div>
              <div className="modal-button">
              <Button
              
              type="submit"
              width="inherit"
              color="primary"
              variant="contained"
              onClick={rateit}          
            >
              Rate It
            </Button>
            </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default MovieDetails;
