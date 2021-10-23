import "./About.css";
import React from "react";
import { useHistory } from "react-router-dom";



function About() {
  const history = useHistory();

  function RedirectForMail(email) {
    const url = "https://mail.google.com/mail/?view=cm&fs=1&to=" + email;
    window.open(url);
  }

  return (
    <div className="about">
      <div className="about-section">
        <h1 className="about-title">About Us</h1>
        <p className="text">M-Reviews is a online Movie rating and information collection system build to collect data about public interest, from their reviews about movies and Web-Shows.  </p>
        <div className="display text"><p> Data Credits :&nbsp;&nbsp;</p> <span>OMDb and TMDb</span></div>
      </div>
        <h1 className="about-title-2">Developer Team</h1>
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-30 my-border-left colm">
            <div className="fotcont">
              <div className="fothead">
                <p>Dhyey Patel</p>
              </div>
              <p>dhyeypatel1612@gmail.com</p>
              <div><button className="button" size="small" onClick={()=>(RedirectForMail("dhyeypatel1612@gmail.com"))}>Contact</button></div>
            </div>
          </div>
          <div className="col-md-4 mb-30 my-border-left colm">
            <div className="fotcont">
              <div className="fothead">
                <p>Ronak Padaliya</p>
              </div>
              <p>ronakpadaliya77@gmail.com</p>
              <div><button className="button" size="small" onClick={()=>(RedirectForMail("ronakpadaliya77@gmail.com"))}>Contact</button></div>
            </div>
          </div>
          <div className="col-md-4 mb-30 my-border-left colm">
            <div className="fotcont">
              <div className="fothead">
                <p>Darshan Parmar</p>
              </div>
              <p>
                  darshanparmar272002@gmail.com
              </p>
              <div><button className="button" size="small" onClick={()=>(RedirectForMail("darshanparmar272002@gmail.com"))}>Contact</button></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;