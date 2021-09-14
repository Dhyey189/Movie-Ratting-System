import { Button, Input } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import MailOutlineSharpIcon from "@material-ui/icons/MailOutlineSharp";
import LockIcon from "@material-ui/icons/Lock";


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
  header: { Color: 'black', fontSize: '30px', fontWeight: 'normal' },
  buttons: { border: 'none', width: 'inherit', size: '15px', marginTop: '10px', marginBottom: '' }
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
  };
}


function Login({ parentCallback }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalStyle] = React.useState(getModalStyle);
  const [openLogin, setOpenLogin] = useState(false);
  const classes = useStyles();

  const login = (event) => {
    event.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    setEmail("");
    setPassword("");
    setOpenLogin(false);
    return fetch("http://localhost:8000/signup/getUser", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => { parentCallback(data) });
  };

  const check = () => {
    if (/^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/.test(email) && password !== "") {
      return false;
    }
    return true;
  }

  return (
    <>
      <Button
        style={{ margin: "0 10px" }}
        variant="contained"
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
            <h1 style={styles.header}>Login</h1>
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