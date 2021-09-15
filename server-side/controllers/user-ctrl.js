const User = require("../models/user-models");
// bcrypt is for encrypting passwords so make sure to download in server side dependencies.
const bcrypt = require("bcrypt");

//  For signUp : createUser, verifyEmail.
// For login : getUser. 

// User is created using MongoDb database when client tries to signUp.
createUser = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a User",
    });
  }
  const user = new User(body);
  if (!user) {
    return res.status(400).json({ success: false, error: err });
  }
  const salt = await bcrypt.genSalt(8);
  user.password = await bcrypt.hash(user.password, salt);
  user
    .save()
    .then(() => {
      return res
        .status(200)
        .json({ success: true, message: "user created successfully", user: user });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "User not created!",
      });
    });
};

// Email is verified at backend whether it is already taken or not when client tries to signUp using new Email.
verifyEmail = async (req, res) => {
  await User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (user == null) {
      return res.status(200).json({ success: true });
    }
    return res.status(400).json({ success: false });
  }).catch((err) => console.log(err));
};


// Checking For User authentication when client Tries to Login using Email & Password. 
getUser = async (req, res) => {
  const body = req.body;
  const user = await User.findOne({ email: body.email });
  if (user) {
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(body.password, user.password);
    if (validPassword) {
      res.status(200).json({ success: true, message: "Valid password", user: user });
    } else {
      res.status(400).json({ success: false, message: "Invalid Password", user: null });
    }
  } else {
    res.status(401).json({ success: false, message: "User does not exist", user: null });
  }
};

module.exports = { createUser, getUser, verifyEmail };