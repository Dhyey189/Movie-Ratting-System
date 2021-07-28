import './App.css';
import {Button , Input, Link,} from "@material-ui/core";
import  Modal  from '@material-ui/core/Modal';
import {makeStyles} from "@material-ui/core/styles";
// import { SocialIcon } from 'react-social-icons';
import React, { useState, useEffect } from 'react';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import MailOutlineSharpIcon from '@material-ui/icons/MailOutlineSharp';
import LockIcon from '@material-ui/icons/Lock';
// import axios from 'axios';
// import bcrypt from 'bcrypt';

function getModalStyle() {
  const top = 50  ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const [modalStyle] = React.useState(getModalStyle);
  const classes = useStyles();
  const [openSignup,setOpenSignup] = useState(false);
  const [openLogin,setOpenLogin] = useState(false);
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [confirmpassword,setConfirmPassword] = useState('');

  const signup = (event) => {
    event.preventDefault();
    const user = {
      displayName:name,
      email:email,
      password:password,
    }
    setName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setOpenSignup(false)
    return fetch('http://localhost:8000/signup/usersignup', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(res => res.json())
    .then(data => console.log(data)); 
  }
  const login = (event) => {
    event.preventDefault();
    const data = {
      email:email,
      password:password,
    }
    // setName('')
    setEmail('')
    setPassword('')
    // setConfirmPassword('')
    setOpenLogin(false)
    return fetch('http://localhost:8000/signup/getUser2', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(res => res.json())
    .then(data => console.log(data.message)); 
  }

  // const login = (event) => {
  //   event.preventDefault();
  //   setPassword('');
  //   setEmail('');
  //   setName('');
  //   setOpenLogin(false);
  //   axios.get(`http://localhost:8000/signup/getUser/`+email)
  //       .then(res => {
            
  //           if (res.data.password==bcrypt(password,salt))
  //           {
  //             console.log("Login Success!")
  //           }
  //       })
  //       .catch(function (error) {
  //   console.log("Hello:1")
  //           console.log(error);
  //       })
  // }

  return (
    <div className="app">
        <Modal open={openSignup} onClose={()=>{setOpenSignup(false)}}>
        
        
        <div style={modalStyle} className={classes.paper}>
        <form className="app-signin-form">
          <div className="app-title">Sign Up</div>
        <div><AccountCircleOutlinedIcon color="primary" style={{paddingTop:3 ,fontSize:25 , marginRight:10}}/><Input
            placeholder="Name"
            type="text"
            value={name}
            onChange={(e)=>{setName(e.target.value)}}

          /></div>
          <div><MailOutlineSharpIcon color="primary" style={{paddingTop:3 ,fontSize:25 , marginRight:10}}/><Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}

          /></div>
          <div><LockIcon color="primary" style={{paddingTop:3 ,fontSize:25 , marginRight:10}}/><Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}

          /></div>
          <div><LockIcon color="primary" style={{paddingTop:3 ,fontSize:25 , marginRight:10}}/><Input
            placeholder="Confirm Password"
            type="password"
            value={confirmpassword}
            onChange={(e)=>{setConfirmPassword(e.target.value)}}

          /></div>
          <Button type="submit" width="inherit" color="primary" onClick={signup}>Sign Up</Button>
      
          </form>
          </div>
          </Modal>
          <Modal open={openLogin} onClose={()=>{setOpenLogin(false)}}>
        
        
        <div style={modalStyle} className={classes.paper}>
        <form className="app-signin-form">
          <p>Login</p>
          <div><MailOutlineSharpIcon color="primary" style={{paddingTop:3 ,fontSize:25 , marginRight:10}}/><Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}

          /></div>
          <div><LockIcon color="primary" style={{paddingTop:3 ,fontSize:25 , marginRight:10}}/><Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}

          /></div>
          <Button type="submit" width="inherit" color="primary" onClick={login}>Login</Button>
          </form>
          </div>
          </Modal>
        <div className="nav-5">
          <nav>
            <div className="mainbar">
              <div className="logo">
                
              </div>
              <ul>
                <li><Link >home</Link></li>
                <li><Link>discover</Link></li>
                
              </ul>
            </div>
            <div className="account">
              <Button color="inherit" onClick={()=>{setOpenSignup(true)}}>Sign Up</Button>
              
              <Button color="inherit" onClick={()=>{setOpenLogin(true)}}>Login</Button>
            </div>
          </nav>
        </div>
    </div>
  );
}

export default App;
