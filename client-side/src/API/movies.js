import ReactDOM from 'react-dom';
import React,{useState,useEffect} from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

function Movies({ movieData, searched,movieCallBack }) 
{
    //first we sort the "movieData" in recently release movie
    if(movieData!=null && movieData.Response=='True')
    {
        movieData.Search.sort(function(a, b){   
            let dateA = parseInt(a.Year);
            let dateB = parseInt(b.Year);
            if (dateA < dateB) 
            {
            return 1;
            }    
            else if (dateA > dateB)
            {
            return -1;
            }   
            return 0;
        });
    }
    const [item,setItem] = useState(null);
    useEffect(() => {
        if(item)
        {
            return (fetch(`http://www.omdbapi.com/?apikey=92ca64f5&i=${item.imdbID}`)// searching from OMDB.com using Rest API.
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    movieCallBack({result:result,success:true});
                    setItem(null);
                },
                (error) => {
                    console.error(error);
                    movieCallBack({success:false});
                }
            ))
        }
        else
        {
            return false;
        }
      }, [item])

    return (

        <span style={{ 'display': 'flex', 'flexDirection': 'row', 'flexWrap': 'wrap' }}>
            {
                (movieData && movieData.Response === "True") ?
                    movieData.Search.map((item, index) => (
                        <div style={{ 'height': '60%', 'width': '300px', 'margin': '10px auto' }}>
                            <Link to={item.imdbID} >
                            <Card sx={{ maxWidth: 345 }} >
                                
                                <CardActionArea onClick={(e)=>setItem(item)}>
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
                    :
                    <Redirect to="/" />
                    // searched !== "" ?
                    //     <h1>Movie not found with the name {searched} please search precisely!!</h1>
                    //     :
                    //     <h1>Please Enter any Movie to search for!!</h1>
            }
        </span>

    )
}
export default Movies;