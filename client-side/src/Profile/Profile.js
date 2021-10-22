// import { Button, Input } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import "./Profile.css";

function Profile() {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("userinfo"))
  );
  var arr = [];
  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("userinfo")));
    console.log(JSON.parse(localStorage.getItem("userinfo")).user.userratting.slice(-5)[0]);
  }, [localStorage]);

  return data !== null ? (
    <>
      <div class="container border border-primary bg-primary main-profile">
        <div class="row gutters">
          <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 pading">
            <div class="card h-100">
              <div class="card-body">
                <div class="account-settings">
                  <div class="user-profile">
                    <div class="user-avatar">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar7.png"
                        alt="Maxwell Admin"
                      />
                    </div>
                    <h5 class="user-name">{data.user.displayName}</h5>
                    <h6 class="user-email">{data.user.email}</h6>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label class="label" for="fullName">Full Name</label>
                      <div class="content">{data.user.displayName}</div>
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label  class="label" for="eMail">Email</label>
                      <div class="content">{data.user.email}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12 pading">
            <div class="card h-100">
              <div class="card-body">
                <div class="row gutters">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 class="mb-2 text-primary">Personal Details</h6>
                  </div>
                  <div className="tableT">
                      <div className="tr"  style={{fontWeight:"Bolder"}}>
                          <div className="td"><label for="fullName">Movie</label></div>
                          <div className="td"><label for="fullName">Rattings</label></div>
                          </div>
                  {JSON.parse(localStorage.getItem("userinfo")).user.userratting.slice(-5).reverse().map((item) => (
                      <div className="tr">
                      <div className="td"><label for="fullName">{item.name}</label></div>
                      <div className="td">
                        {item.ratting}
                      </div>
                      </div>
                  ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Redirect to="/" />
  );
}

export default Profile;
