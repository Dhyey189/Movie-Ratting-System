import { Button, Input, Link } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./App.css";
import Signup from "./authentication/signup";
import Login from "./authentication/login"

function App() {
  const [data, setData] = useState(null);
  
  function handleCallback(childData){
    setData(childData);
    console.log("Hello");
    window.location.reload(false);
  }

  const logout = () =>{
    localStorage.removeItem("data");
    window.location.reload(false);
  }

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]); 
  

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
              JSON.parse(localStorage.getItem("data"))?
              JSON.parse(localStorage.getItem("data")).success?
                  (<>
                  <h2>
                  {JSON.parse(localStorage.getItem("data")).user.displayName}
                  </h2>
                  <Button
                    type = "button"
                    width="inherit"
                    color="primary"
                    variant="contained"
                    onClick={logout} 
                  >
                   Logout 
                  </Button>
                  </>)
                  :
                  (<>
                    <Signup parentCallback={handleCallback}/>
                    <Login parentCallback={handleCallback}/>
                  </>)
                
                :
                (<>
                  <Signup parentCallback={handleCallback}/>
                  <Login parentCallback={handleCallback}/>
                </>)
            }
          </div>
        </nav>
      </div>
    </div>
  );
}

export default App;
