import { Button, Input } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import MailOutlineSharpIcon from "@material-ui/icons/MailOutlineSharp";
import LockIcon from "@material-ui/icons/Lock";
// Here Material-UI is used for styles so make sure to add below funtions & objects and to download material-ui dependencies.

var styles = {
  Icons: { color: 'blue', verticalAlign: 'middle', fontSize: '25px', marginRight: 10 },
  Inputs: {
    Color: 'black',
    backgroundColor: 'white',
    fontSize: '15px',
    '&:hover': {
      color: 'green !important',
    }
  },
  header: { color: 'black', fontSize: '30px', fontWeight: 'normal', marginBottom:"10px" },
  buttons: { border: 'none', width: 'inherit', size: '15px', marginTop: '15px', marginBottom: '' },
  error:{fontSize:"15px", color:"red", marginTop: '10px', align: 'right'}
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
    "borderRadius": "20px",
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    maxWidth:"100%"
  };
}

// Login component to provide client login UI.
function Login({render,setrender,r=null,sr=null}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalStyle] = React.useState(getModalStyle);
  const [openLogin, setOpenLogin] = useState(false);
  const classes = useStyles();
  const [error,setError]=useState(false);
  // For Logging in client using Email & Password.
  
  const login = (event) => {
    event.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    setEmail("");
    setPassword("");
    return fetch("http://localhost:8000/signup/getUser", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => { 
        if(data.success)
        {
          localStorage.setItem("userinfo", JSON.stringify(data));
          setOpenLogin(false);
          setrender(222);
          if(r!==null && sr!==null)
          {
            sr(false);
            sr(true);
          }
        }
        else
          setError(true);
         });
  };

  // For validation of email & password on client-side no backend.
  const check = () => {
    if (/^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/.test(email) && password !== "") {
      return false;
    }
    return true;
  }

  return (
    <>
      <Button
      className="authbtn"
        style={{ margin: "10px" }}
        variant="contained"
        color="primary"
        onClick={() => {
          setOpenLogin(true);
        }}
      >
        Login
      </Button>
      <Modal
        open={openLogin}
        onClose={() => {
          setOpenLogin(false);
        }}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app-signin-form">
            {
              error?
              <h1 style={styles.header}>Login Failed!</h1>
              :
              <h1 style={styles.header}>Login</h1>
            }
            <div>
              <MailOutlineSharpIcon color="primary" style={styles.Icons} />
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
            {
              error?
                <p style={styles.error}> Invalid email or password! </p>
                : null
            }
            <Button
              variant="contained"
              type="submit"
              width="inherit"
              color="primary"
              onClick={login}
              style={styles.buttons}
              disabled={check()}
            >
              Login
            </Button>
          </form>
        </div>
      </Modal>
    </>
  )
}
export default Login;