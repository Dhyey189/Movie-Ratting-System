import React, { useState, useEffect } from "react";
import { Button, Input } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Rating from '@mui/material/Rating';
import Login from './authentication/login';
import Signup from './authentication/signup';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import {
  BrowserRouter as Router,
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
    maxWidth: "100%"
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

function MovieDetails({render,setrender}) {
  const query = new URLSearchParams(useLocation().search);
  const [movie, setMovie] = useState({});
  const [video, setVideo] = useState(null);
  const [openRatting, setOpenRatting] = useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [final_rating,setfinalrating] = useState();
  const classes = useStyles();


  const rateit = (event) => {

    event.preventDefault();
    // body = {title,imdbid,ratting,userid,imdbvotes,imdbratting}
    const info = JSON.parse(localStorage.getItem('userinfo'))
    const body = {
      title: movie.Title,
      imdbid: movie.imdbID,
      ratting: rating,
      userid: info.user?._id,
      imdbvotes: movie.imdbVotes,
      imdbratting: movie.imdbRating,
      feedback: feedback,
    };
    if (body.ratting == null || isNaN(body.ratting)) body.ratting = 0;
    console.log(body);
    return fetch("http://localhost:8000/movieapi/setratting/", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOpenRatting(false);
        if (data.error === null || data.error === undefined) {
          console.log(data);
          localStorage.setItem('userinfo',JSON.stringify(data));
          setfinalrating(body.ratting);
        }
      });
  };
  useEffect(() => {
    const info = JSON.parse(localStorage.getItem('userinfo'))
    if(info!==null){
      const index = info.user.userratting.findIndex(element => element.imdbid === query.get("id"));
      if (index !== -1)
      {
        setRating(parseInt(info.user.userratting[index].ratting));
        setfinalrating(parseInt(info.user.userratting[index].ratting));
        setFeedback(info.user.userratting[index].feedback)
      }
    }
  }, [query.get("id"), localStorage,openRatting])

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
          },
          (error) => {
            console.error(error);
          }
        )
    );
  }, [query.get("id")]);


  return (
    <>
      <div className="titleBar d-flex flex-wrap">
        <div className="titleDetails m-3">
          <div className="title">
            <span>{movie.Title} <span className="runtime">({movie.Runtime})</span></span>
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
            <div className="rate">Ratings</div>
            <div className="value">{movie.imdbRating}/10</div>
          </div>
          <div className="ratting">
            <div className="rate">Your Rating</div>
            <div className="value">{
              (final_rating==null || isNaN(final_rating) || final_rating===0)?
              <>-/10</>:
              <>{final_rating}/10</>
            }</div>
          </div>
          <div  className="ratting">
            <Button variant="contained" color="primary" onClick={() => setOpenRatting(true)}>Rate</Button>
          </div>
        </div>
      </div>
      <Router>
        <div className="trailer">
          {
            video != null ?
              <div className="iframe-block ">
                <iframe
                  className="responsive-iframe"
                  src={`https://www.youtube.com/embed/${video[getVideoIndex(video)].key}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              : null
          }

        </div>
        <div>
          <table className="rwd-table rwd-table-width-2">
            <tbody>
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
              <td data-th="Story-Line">{movie.Plot}</td>
            </tr>
            </tbody>
          </table>
          <div className="DetailsTables">
            <table className="rwd-table rwd-table-width">
              <tbody>
              <tr>
                <th>Director</th>
              </tr>
              <tr>
                <td data-th="Director">{movie.Director}</td>
              </tr>
              </tbody>
            </table>
            <table className="rwd-table rwd-table-width">
              <tbody>
              <tr>
                <th>Actor</th>
              </tr>
              <tr>
                <td data-th="Actor">{movie.Actors}</td>
              </tr>
              </tbody>
            </table>

            <table className="rwd-table rwd-table-width">
              <tbody>
              <tr>
                <th>Writer/s</th>
              </tr>
              <tr>
                <td data-th="Awards">{movie.Writer}</td>
              </tr>
              </tbody>
            </table>
            <table className="rwd-table rwd-table-width">
              <tbody>
              <tr>
                <th>Awards</th>
              </tr>
              <tr>
                <td data-th="Awards">{movie.Awards}</td>
              </tr>
              </tbody>
            </table>
            <table className="rwd-table rwd-table-width">
              <tbody>
              <tr>
                <th>Collections</th>
              </tr>
              <tr>
                <td data-th="Awards">{movie.BoxOffice}</td>
              </tr>
              </tbody>
            </table>
            <table className="rwd-table rwd-table-width">
              <tbody>
              <tr>
                <th>Language</th>
              </tr>
              <tr>
                <td data-th="Awards">{movie.Language}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Router>
      <Modal
        open={openRatting}
        onClose={() => {
          setOpenRatting(false);
        }}
      >
        <div style={modalStyle} className={classes.paper} >
        {
        (JSON.parse(localStorage.getItem('userinfo')))!==null?
          (<div className="item" align="center">
            <form>
              <div className="modal-head">Give Your Ratings to<i><b> {movie.Title}</b></i></div>
              <div classNmae="modal-ratting"><Rating name="m-reviews-ratting" value={rating} onChange={(event, newValue) => { setRating(newValue); }} defaultValue={rating} max={10} size="large" /></div>
              <div className="modal-input">
                <Input
                className="inputs"
                placeholder="Give Your thoughts!!"
                type="text"
                value={feedback}
                onChange={(e) => {
                  setFeedback(e.target.value)
                }}
                />
              </div>
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
          </div>):
          <div className="item" align="center">
            <div className="modal-head">Click <Login render={render} setrender={setrender} r={openRatting} sr={setOpenRatting}/> to rate this<i><b> {movie.Type}</b></i></div>
            <div className="modal-head">Don't have an account click <Signup render={render} setrender={setrender} /> to create one</div>          
        </div>
        
        }
        </div>
      </Modal>
    </>
  );
}

export default MovieDetails;