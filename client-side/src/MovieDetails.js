import ReactDOM from "react-dom";
import React, { useState, useEffect } from "react";
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
// import Search from "./search";

function getVideoIndex(item)
{
    for(var i=item.length-1;i>=0;i--)
    {
        if(item[i].type==="Trailer" && item[i].official && item[i].site==="YouTube")
        {
            return i;
        }
    }
    return 0;
}

function MovieDetails() {
  const query = new URLSearchParams(useLocation().search);
  const [movie, setMovie] = useState({});
  const [video, setVideo] =  useState(null);
  const [type, setType] = useState("");
  useEffect(() => {
    return(
      fetch(`https://api.themoviedb.org/3/find/${query.get("id")}?api_key=ec2573c833f28eda19e0f31ac19ec943&language=en-US&external_source=imdb_id`) // searching from OMDB.com using Rest API.
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.movie_results.length>0) {
            fetch(`http://api.themoviedb.org/3/movie/${result.movie_results[0].id}?api_key=ec2573c833f28eda19e0f31ac19ec943&append_to_response=videos`)
              .then((r) => r.json())
              .then((details) => {
                setMovie(details);
                setType("movie");
                console.log(details);
                if(details.videos.results.length>0)
                  setVideo(details.videos.results);
                console.log(video);
              });
          }
          else if(result.tv_results.length>0)
          {
            fetch(`http://api.themoviedb.org/3/tv/${result.tv_results[0].id}?api_key=ec2573c833f28eda19e0f31ac19ec943&append_to_response=videos`)
                .then((r) => r.json())
                .then((details) => {
                  setMovie(details);
                  setType("series");
                    if(details.videos.results.length>0)
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


  return (
    <>
      <div className="titleBar">
        <div className="titleDetails">
          <div className="title">
            {
              type==="movie"?
              <span>{movie.title}</span>
                :
                <span>{movie.name}</span>
            }
          </div>
          <div className="details">
            <div className="detail">
              {
                type==="movie"?
                <span>Movie</span>
                :
                <span>Series</span>
              }
            </div>
            <div className="detail">
              {
                type==="movie"?
                <span>{movie.release_date}</span>
                :
                <span>{movie.first_air_date}</span>
              }
            </div>
          </div>
        </div>
        <div className="rattings">
          <div className="ratting">
            <div className="rate">Rattings</div>
            <div className="value">9.2/10</div>
          </div>
          <div className="ratting">
            <div className="rate">Your Ratting</div>
            <div className="value">-/10</div>
            </div>
        </div>
      </div>
      <Router>
        <div className="trailer">
            {
            video!=null?
                <iframe
                width="853"
                height="480"
                src={`https://www.youtube.com/embed/${video[getVideoIndex(video)].key}`}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>  
            :null
            }
          
        </div>
        <hr/>
        
      </Router>
    </>
  );
}

export default MovieDetails;
