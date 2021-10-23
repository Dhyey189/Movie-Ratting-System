import React,{ useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import { useHistory} from "react-router-dom";

function Latest() {

    const [list,setList]=useState(null);
    const history = useHistory();

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=bf8456bc049664835ee919f3b16f65cb&language=en-US&page=${Math.floor(Math.random() * 10)+1}`)// searching from OMDB.com using Rest API.
        .then(res => res.json())
        .then(
            (result) => {
                setList(result);
            },
            (error) => {
                console.error(error);
            }
        )
    }, []);
    function redirect(title)
    {
        const url="/search/?movies="+title;
        history.push(url);
    }

    return ( 
        <>

            <div style={{ display: 'block',margin:"auto 0",justifyContent:"center",maxWidth:"fitContent" }}>
                <Carousel fade="true" variant="dark">
                    <Carousel.Item interval={5000}>
                        <div style={{display: "flex",flexDirection:"row"}}>
                            {
                                list!==null?
                                list.results.slice(0,3).map((item,index) => (
                                    // data.push("https://image.tmdb.org/t/p/w500"+item.poster_path)
                                    <img className="d-block w-100" key={index} onClick={()=>{redirect(item.title)}} src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} style={{padding:"5px",height:"550px"}} alt="Image One"/>
                                ))
                                :null
                            }
                        </div>
                    </Carousel.Item>
                    <Carousel.Item interval={5000}>
                        <div style={{display: "flex",flexDirection:"row"}}>
                            {
                                list!==null?
                                list.results.slice(3,6).map((item,index) => (
                                    // data.push("https://image.tmdb.org/t/p/w500"+item.poster_path)
                                    <img className="d-block w-100" key={index} onClick={()=>{redirect(item.title)}} src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} style={{padding:"5px",height:"550px"}} alt="Image One"/>
                                ))
                                :null
                            }
                        </div>
                    </Carousel.Item>
                    <Carousel.Item interval={5000}>
                        <div style={{display: "flex",flexDirection:"row"}}>
                            {
                                list!==null?
                                list.results.slice(6,9).map((item,index) => (
                                    // data.push("https://image.tmdb.org/t/p/w500"+item.poster_path)
                                    <img className="d-block w-100" key={index} onClick={()=>{redirect(item.title)}} src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} style={{padding:"5px",height:"550px"}} alt="Image One"/>
                                ))
                                :null
                            }
                        </div>
                    </Carousel.Item>
                    <Carousel.Item interval={5000}>
                        <div style={{display: "flex",flexDirection:"row"}}>
                            {
                                list!==null?
                                list.results.slice(9,12).map((item,index) => (
                                    // data.push("https://image.tmdb.org/t/p/w500"+item.poster_path)
                                    <img className="d-block w-100" key={index} onClick={()=>{redirect(item.title)}} src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} style={{padding:"5px",height:"550px"}} alt="Image One"/>
                                ))
                                :null
                            }
                        </div>
                    </Carousel.Item>
                    <Carousel.Item interval={5000}>
                        <div style={{display: "flex",flexDirection:"row"}}>
                            {
                                list!==null?
                                list.results.slice(12,15).map((item,index) => (
                                    // data.push("https://image.tmdb.org/t/p/w500"+item.poster_path)
                                    <img className="d-block w-100" key={index} onClick={()=>{redirect(item.title)}} src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} style={{padding:"5px",height:"550px"}} alt="Image One"/>
                                ))
                                :null
                            }
                        </div>
                    </Carousel.Item>
                    <Carousel.Item interval={5000}>
                        <div style={{display: "flex",flexDirection:"row"}}>
                            {
                                list!==null?
                                list.results.slice(15,18).map((item,index) => (
                                    // data.push("https://image.tmdb.org/t/p/w500"+item.poster_path)
                                    <img className="d-block w-100" key={index} onClick={()=>{redirect(item.title)}} src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} style={{padding:"5px",height:"550px"}} alt="Image One"/>
                                ))
                                :null
                            }
                        </div>
                    </Carousel.Item>
                </Carousel>
                </div>

        </>
    )
};
  

export default Latest;