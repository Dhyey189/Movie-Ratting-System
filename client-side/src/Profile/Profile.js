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
    
  }, [localStorage]);

  return data !== null ? (
    <>
      <div className="container border border-primary bg-primary main-profile">
        <div className="row gutters">
          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 pading">
            <div className="card h-100">
              <div className="card-body">
                <div className="account-settings">
                  <div className="user-profile">
                    <div className="user-avatar">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar7.png"
                        alt="Maxwell Admin"
                      />
                    </div>
                    <h5 className="user-name">{data.user.displayName}</h5>
                    <h6 className="user-email">{data.user.email}</h6>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label className="label" for="fullName">Full Name</label>
                      <div className="content">{data.user.displayName}</div>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label  className="label" for="eMail">Email</label>
                      <div className="content">{data.user.email}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12 pading">
            <div className="card h-100">
              <div className="card-body">
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 className="mb-2 text-primary">Recently Rated</h6>
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
