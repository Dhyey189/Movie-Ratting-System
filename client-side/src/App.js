import { Link, Button } from "@material-ui/core";
import React, { useState } from "react";
import "./App.css";
import Signup from "./authentication/signup";
import Login from "./authentication/login";


// App component is starting component of project
function App() {
  const [data, setData] = useState(JSON.parse(localStorage.getItem("userinfo")));

  function handleCallback(childData) {
    setData(childData);
    localStorage.setItem("userinfo", JSON.stringify(childData));
  }

  // For logging out the client.
  const logout = (event) => {
    event.preventDefault();
    localStorage.clear();
    setData(null);
  }

  return (
    <div className="app">
      <div className="nav-5">
        <nav>
          <div className="mainbar">
            <div className="logo"></div>
            <ul>
              <li>
                <Link>home</Link>
              </li>
              <li>
                <Link>discover</Link>
              </li>
            </ul>
          </div>
          <div className="account">
            {
              data ?
                data.success ?
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
                  :
                  <>
                    <h2>Login Falides!!</h2>
                    <Signup parentCallback={handleCallback} />
                    <Login parentCallback={handleCallback} />
                  </>
                :
                <>
                  <Signup parentCallback={handleCallback} />
                  <Login parentCallback={handleCallback} />
                </>
            }
          </div>
        </nav>
      </div>
    </div>
  );
}

export default App;
