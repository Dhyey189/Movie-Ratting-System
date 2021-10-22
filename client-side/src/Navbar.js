import React, { useState,useEffect } from "react";
import "./App.css";
import Signup from "./authentication/signup";
import Login from "./authentication/login";
// import Search from "./API/search";
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
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

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
function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}

function Nav({is_search}) {

  const [render,setRender]=useState(null);
  const [search, setSearch] = useState("");
  const forceUpdate = useForceUpdate();
  const history = useHistory();
  const logout = (event) => {
    event.preventDefault();
    localStorage.clear();
    history.push("/");
  };

  useEffect(()=>{
    console.log(localStorage);

  },[localStorage]);

  /** For profile dropdown */
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
        <div className="nav-5">
          <nav>
            <div className="mainbar">
            <Link to="/" className="link"><div className="linktext">Home</div></Link>
              <Link to="/about" className="link"><div className="linktext">About</div></Link>
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
              {JSON.parse(localStorage.getItem("userinfo")) ? (
                JSON.parse(localStorage.getItem("userinfo")).success ? (
                  <>
                    <React.Fragment>
                      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                        <Tooltip title="Account">
                          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                            <Avatar sx={{ width: 32, height: 32 }}></Avatar>
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
                        <MenuItem style={{margin:"0 10px"}}>
                          <ListItemIcon>
                            <AccountCircleIcon />
                          </ListItemIcon>
                          <Link to="/profile">Profile</Link>
                        </MenuItem><br/>
                        <Divider />
                        <MenuItem style={{margin:"0 10px"}}>
                          <ListItemIcon>
                            <SettingsIcon />
                          </ListItemIcon>
                          Settings
                        </MenuItem><br/>
                        <MenuItem style={{margin:"0 10px"}}>
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
                    <Signup className="signup"  render={render} setrender={setRender}/>
                    <Login className="login"  render={render} setrender={setRender}/>
                  </>
                )
              ) : (
                <>
                  <Signup className="signup" render={render} setrender={setRender} />
                  <Login className="login" render={render} setrender={setRender}/>
                </>
              )}
            </div>
          </nav>
        </div>
  );
}

export default Nav;
