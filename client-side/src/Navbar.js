import React, { useState } from "react";
import "./App.css";
import Signup from "./authentication/signup";
import Login from "./authentication/login";
// import Search from "./API/search";
import { BrowserRouter as Router, Switch, Route, Link, useHistory, Redirect, useRouteMatch } from "react-router-dom";
import { Button, Input } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';

import Search from "./search";

var styles = {
  Inputs: {
    Color: 'black',
    backgroundColor: 'white',
    fontSize: '15px',
    '&:hover': {
      color: 'green !important',
    }
  },
  search: {
    backgroundColor: 'white',
    color: 'inherit',
    borderRadius: '5px',
    padding: '0 10px',
  }
}

function Nav({is_search}) {
  const [data, setData] = useState(JSON.parse(localStorage.getItem("userinfo")));
  const [search, setSearch] = useState("");
  function handleCallback(childData) {
    setData(childData);
    localStorage.setItem("userinfo", JSON.stringify(childData));
  }
  const history = useHistory();
  const logout = (event) => {
    event.preventDefault();
    localStorage.clear();
    setData(null);
  };

  return (
        <div className="nav-5">
          <nav>
            <div className="mainbar">
              <Link to="/">Home</Link>
            </div>

            <div className="account">
              <div className="search">
                {
                  is_search?
                <div style={styles.search}>
                  <form>
                    <Input placeholder="Search for a movie..." type="text" value={search} style={styles.Inputs}
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                    />

                    <IconButton type="submit" color="primary" title="click here to search" aria-label="add to shopping cart" onClick={(e) => { e.preventDefault(); }}
                    >
                      {search ?
                        <Link to={`/search/?movies=${search}`} >
                          <SearchIcon />
                        </Link>
                        :
                        <Link to="/" >
                          <SearchIcon />
                        </Link>
                      }
                    </IconButton>

                  </form>
                </div>:null}
              </div>
              {data ? (
                data.success ? (
                  <>
                    <h3>{data.user.displayName}</h3>
                    <Button
                      variant="contained"
                      type="submit"
                      width="inherit"
                      color="primary"
                      onClick={logout}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Signup className="signup" parentCallback={handleCallback} />
                    <Login className="login" parentCallback={handleCallback} />
                  </>
                )
              ) : (
                <>
                  <Signup className="signup" parentCallback={handleCallback} />
                  <Login className="login" parentCallback={handleCallback} />
                </>
              )}
            </div>
          </nav>
        </div>
  );
}

export default Nav;
