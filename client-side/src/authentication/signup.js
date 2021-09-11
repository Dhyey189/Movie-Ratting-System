import { Button, Input, Link} from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect ,props} from "react";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import MailOutlineSharpIcon from "@material-ui/icons/MailOutlineSharp";
import LockIcon from "@material-ui/icons/Lock";

var styles={
    Icons:{color:'blue', verticalAlign:'middle' ,fontSize:'25px' , marginRight:10},
    Inputs:{
      Color:'black',
      backgroundColor:'white', 
      fontSize:'15px',
      '&:hover':{
        color:'green !important',
      }
    },
    header:{Color:'black', fontSize:'30px', fontWeight:'normal'},
    buttons:{border: 'none', width:'inherit', size:'15px', color:'blue'}
  }

const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      color: "black",
      fontSize: "30px",
      backgroundColor: "#fff",
      "border-radius": "20px",
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}



function Signup({parentCallback})
{
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [openSignup, setOpenSignup] = useState(false);
    const [modalStyle] = React.useState(getModalStyle);
    const [emailVerify, setEmailVerify] = useState(null);
    const classes = useStyles();

    const signup = (event) => {
        event.preventDefault();
        const user = {
          displayName: name,
          email: email,
          password: password,
        };
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setOpenSignup(false);
        return fetch("http://localhost:8000/signup/usersignup", {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => parentCallback(data));
      };
    
    const isPresentEmail = () => {
      const e={
        email:email
      };
      return fetch("http://localhost:8000/signup/verifyEmail", 
      {
        method: "POST",
        body: JSON.stringify({email:email}),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {console.log("Hello");setEmailVerify(data.success);});
    }

    var check = () => {
      isPresentEmail();
      console.log(emailVerify);
      if(name!="" && emailVerify && /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/.test(email) && password!="" && confirmpassword!="" && password == confirmpassword) 
      {
        return false;
      }
      return true;
    }

    return (
        <>
        <Button
              color="inherit"
              onClick={() => {
                setOpenSignup(true);
              }}
            >
              Sign Up
            </Button>

        <Modal
        open={openSignup}
        onClose={() => {
          setOpenSignup(false);
        }}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app-signin-form">
            <h1 className="header" style={styles.header}>
              Sign Up
            </h1>
            <div>
              <AccountCircleOutlinedIcon color="primary" style={styles.Icons} />
              <Input
                className="inputs"
                placeholder="Name"
                type="text"
                value={name}
                style={styles.Inputs}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div>
              <MailOutlineSharpIcon
                className="Icon"
                color="primary"
                style={styles.Icons}
              />
              <Input
                placeholder="Email"
                type="email"
                value={email}
                style={styles.Inputs}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div>
              <LockIcon color="primary" style={styles.Icons} />
              <Input
                placeholder="Password"
                type="password"
                value={password}
                style={styles.Inputs}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div>
              <LockIcon color="primary" style={styles.Icons} />
              <Input
                placeholder="Confirm Password"
                type="password"
                value={confirmpassword}
                style={styles.Inputs}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>
            <Button
              type="submit"
              width="inherit"
              color="primary"
              onClick={signup}
              disabled={check()}
            >
              Sign Up
            </Button>
          </form>
        </div>
      </Modal>
      </>
    )
}

export default Signup;