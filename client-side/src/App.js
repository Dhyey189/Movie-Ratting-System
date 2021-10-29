import React, { useState ,useEffect} from "react";
import "./App.css";
import Search from "./search";
import { BrowserRouter as Router, Switch, Route, Link ,Redirect} from "react-router-dom";
import Navbar from "./Navbar.js";
import Profile from "./Profile/Profile.js";
import Home from "./Home/Home.js";
import About from "./About/About.js";
import Footer from "./Footer/Footer.js";

function App() {

  const [render,setRender]=useState(null);

  function set(r)
  {
    setRender(r);
  }

  return (
    <>
    <div className="app-main-div">
      <Router>                    
        <Route exact path="/">
          <Navbar is_search={true} pcallback={set}/>
          <Home />
        </Route>
        <Route  path="/search"><Navbar is_search={false} pcallback={set}/></Route>
        <Switch>
          <Route path={`/search`}  >
            <Search render={render} setrender={setRender} />
          </Route>
          <Route path={`/profile`}>
            <Navbar is_search={true} pcallback={set}/>
            <Profile />
          </Route>

          <Route path={`/about`}>
            <Navbar is_search={true} pcallback={set}/>
            <About />
          </Route>
        </Switch>
        <Footer/>
      </Router>
    </div>
    </>
  );
}
export default App;
