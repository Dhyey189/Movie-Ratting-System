import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link ,Redirect} from "react-router-dom";
import {useState,useEffect} from 'react'
import './Footer.css';

const Footer = ()=>{
  return(
  <footer className="footer">
    <Router>
    <div className="foot-head">M-Reviews is an online Movie Rating and Information System</div>
    <div className="foot-content">
    <div className="foot-aboutus"><Link to="">About Us</Link></div>
    
    </div>
    
    </Router>
  </footer>
  )
}

  
export default Footer;