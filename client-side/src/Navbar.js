import React, { useState, useEffect } from "react";
import "./App.css";
import Signup from "./authentication/signup";
import Login from "./authentication/login";
import { BrowserRouter as Router, Switch, Route, Link, useHistory, Redirect, useRouteMatch } from "react-router-dom";
import { Button, Input } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import logo from "./Reviews.png";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

var styles = {
  Inputs: {
    Color: 'black',
    backgroundColor: 'transparent',
    fontSize: '15px',

    '&:hover': {
      color: 'green !important',
    }
  },
  search: {
    backgroundColor: '#FFF',
    color: 'inherit',
    borderRadius: '5px',
    padding: '0px 10px',
    margin: 'auto'
  }
}

function Nav({ is_search ,pcallback}) {

  const [render, setRender] = useState(null);
  const [search, setSearch] = useState("");
  const history = useHistory();
  const logout = (event) => {
    event.preventDefault();
    localStorage.clear();
    history.push("/");
  };

  useEffect(() => {
    pcallback(render,setRender);
  }, [localStorage]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-light bg-black navbar-2">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/"><img width="100" height="60" src={logo} alt="M-Reviews" /></Link>
          <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className=" link " aria-current="page" to="/"><div className="linktext">Home</div></Link>
              </li>
              <li className="nav-item">
                <Link className=" link" aria-current="page" to="/about"><div className="linktext">About</div></Link>
              </li>
            </ul>
            <div className="d-flex justify-content-center">
              {
                is_search ?
                  <div style={styles.search}>
                    <form>
                      <Input placeholder="Search for a movie..." className="search-input" type="text" value={search} style={styles.Inputs}
                        onChange={(e) => {
                          setSearch(e.target.value);
                        }}
                      />

                      <IconButton type="submit" color="primary" title="click here to search" aria-label="Search" onClick={(e) => { history.push('/search/?movies='+search);e.preventDefault(); }}
                      >
                          <Link to={`/search/?movies=${search}`} >
                            <SearchIcon />
                          </Link>
                        
                      </IconButton>

                    </form>
                  </div> : null
              }

            </div>
            <div className="nav-item d-flex justify-content-center">
              {JSON.parse(localStorage.getItem("userinfo")) ? (
                JSON.parse(localStorage.getItem("userinfo")).success ? (
                  <>
                    <React.Fragment>
                      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                        <Tooltip title="Account">
                          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                            <Avatar sx={{ width: 35, height: 35,marginLeft:3 }}></Avatar>
                          </IconButton>
                        </Tooltip>
                      </Box>
                      <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                          elevation: 0,
                          sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                              width: 32,
                              height: 32,
                              ml: -0.5,
                              mr: 1,
                            },
                            '&:before': {
                              content: '""',
                              display: 'block',
                              position: 'absolute',
                              top: 0,
                              right: 14,
                              width: 10,
                              height: 10,
                              bgcolor: 'background.paper',
                              transform: 'translateY(-50%) rotate(45deg)',
                              zIndex: 0,
                            },
                          },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                      >
                        <MenuItem style={{ margin: "0 10px" }}>
                          <ListItemIcon>
                            <AccountCircleIcon />
                          </ListItemIcon>
                          <Link to="/profile" style={{textDecoration:'none'}}>Profile</Link>
                        </MenuItem><br />
                        <Divider />
                        <br />
                        <MenuItem style={{ margin: "0 10px" }}>
                          <Button
                            variant="contained"
                            type="submit"
                            width="inherit"
                            color="primary"
                            onClick={logout}
                          >
                            Logout
                          </Button>
                        </MenuItem>
                      </Menu>
                    </React.Fragment>
                  </>
                ) : (
                  <>
                    <Signup className="signup" render={render} setrender={setRender} />
                    <Login className="login" render={render} setrender={setRender} />
                  </>
                )
              ) : (
                <>
                  <Signup className="signup" render={render} setrender={setRender} />
                  <Login className="login" render={render} setrender={setRender} />
                </>
              )}
            </div>


          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;
