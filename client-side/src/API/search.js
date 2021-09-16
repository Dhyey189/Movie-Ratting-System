import { Button, Input } from "@material-ui/core";
import React, { useState } from "react";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles, alpha } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';

var styles = {
    Inputs: {
      Color: 'black',
      backgroundColor: 'white',
      fontSize: '15px',
      '&:hover': {
        color: 'green !important',
      }
    },
    search:{
        backgroundColor: 'white',
        color:'inherit',
        borderRadius:'5px',
        padding: '0 10px',
    }
  }

 

function Search({parentCallback}) {
    const [search, setSearch] = useState("");

    const searchMovie = (e) => {
        e.preventDefault();
        return (fetch(`http://www.omdbapi.com/?apikey=92ca64f5&s=${search}`)
        .then(res => res.json())
        .then(
          (result) => {
              parentCallback(result);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            console.error(error);
          }
        ))
      }

    return (
        <div style={styles.search}>
            <form>
            <Input
                placeholder="Search for a movie..."
                type="text"
                value={search}
                style={styles.Inputs}
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
            />
            <IconButton type="submit" color="primary" title="click here to search" aria-label="add to shopping cart" onClick={searchMovie}>
                <SearchIcon />
            </IconButton>
            </form>
        </div>
    )
}
export default Search;