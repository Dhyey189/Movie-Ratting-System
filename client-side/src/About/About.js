import "./About.css";
import React from "react";
import {useHistory, Redirect} from "react-router-dom";

function About() {

    const history = useHistory();

    function RedirectForMail (email)
    {
        const url="https://mail.google.com/mail/?view=cm&fs=1&to="+email;
        window.open(url)
    }

    return ( 
        <div>
            <div className="about-section">
                <h1 style={{color:"yellow"}}>About Us Page</h1>
                <p>Some text about who we are and what we do.</p>
                <p>Resize the browser window to see that this page is responsive by the way.</p>
            </div>

            <div>
                <h2 className="title">Our Team</h2>
            </div>
            <div className="row">
                <div className="column">
                    <div className="card">
                        <div className="container">
                            <h2>Patel Dhyey</h2>
                            <p className="title">SEM-5</p>
                            <h3>Dharmsinh Desai University,Nadiad</h3>
                            <p>dhyeypatel1612@gmail.com</p>
                            <p><button className="button" onClick={()=>(RedirectForMail("dhyeypatel1612@gmail.com"))}>Contact</button></p>
                        </div>
                    </div>
                </div>

                <div className="column">
                    <div className="card">
                        <div className="container">
                            <h3>Padaliya Ronak</h3>
                            <p className="title">SEM-5</p>
                            <h4>Dharmsinh Desai University,Nadiad</h4>
                            <p>ronakpadaliya77@gmail.com</p>
                            <p><button className="button" onClick={()=>(RedirectForMail("ronakpadaliya77@gmail.com"))}>Contact</button></p>
                        </div>
                    </div>
                </div>
            
                <div className="column">
                    <div className="card">
                        <div className="container">
                            <h2>Parmar Darshan</h2>
                            <p className="title">SEM-5</p>
                            <h3>Dharmsinh Desai University,Nadiad</h3>
                            <p>darshanparmar272002@gmail.com</p>
                            <p><button className="button" onClick={()=>(RedirectForMail("darshanparmar272002@gmail.com"))}>Contact</button></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default About;