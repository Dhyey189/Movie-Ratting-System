import ReactDOM from 'react-dom';
import React from "react";

function Movies({ movieData }) {
    return (
        <span style={{ 'display': 'flex', 'flexWrap': 'nowrap' }}>
            {movieData.Search.map((item, index) => (
                <img src={item.Poster}></img>
            )
            )};
        </span>
    )
}
export default Movies;