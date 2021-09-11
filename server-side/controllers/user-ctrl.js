const User = require("../models/user-models");
const bcrypt = require("bcrypt");
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
        .json({ success: true, message: "user created successfully" ,user_id:user.id});
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "User not created!",
      });
    });
};

getUser2 = async (req, res) => {
  const body = req.body;
  const user = await User.findOne({ email: body.email });
  if (user) {
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(body.password, user.password);
    if (validPassword) {
      res.status(200).json({ message: "Valid password" });
    } else {
      res.status(400).json({ error: "Invalid Password" });
    }
  } else {
    res.status(401).json({ error: "User does not exist" });
  }
};

getUser = async (req, res) => {
  await User.findOne({ email: req.params.email }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!user) {
      return res.status(404).json({ success: false, error: `User not found` });
    }
    return res.status(200).json({ success: true, data: user });
  }).catch((err) => console.log(err));
};

verifyEmail = async (req,res) => {
  await User.findOne({ email: req.body.email}, (err, user) => {
    console.log(req.body.email);
    console.log(user);
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (user==null) {
      return res.status(200).json({ success: true});
    }
    return res.status(400).json({ success: false});
  }).catch((err) => console.log(err));
};

module.exports = { createUser, getUser, getUser2 ,verifyEmail};