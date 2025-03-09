const router = require("express").Router();
const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// sign in APIs
router.post("/sign-in", async (req, res) => {
  try {
    const { username, email } = req.body;
    const existingUser = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "username already exists" });
    } else if (username.length < 3) {
      return res
        .status(400)
        .json({ message: "username should have atleast 4 characters" });
    }

    if (existingEmail) {
      return res.status(400).json({ message: "email already exists" });
    }

    const hashpass = await bcrypt.hash(req.body.password, 10); // use the password from the body and encrypt in lenght of 10

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashpass,
    });
    await newUser.save();
    return res.status(200).json({ message: "SignIn successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "internal server error" });
  }
});

// login
router.post("/log-in", async (req, res) => {
  const { username,password } = req.body;
  const existingUser = await User.findOne({ username: username });
  if (!existingUser) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }

  bcrypt.compare(password,existingUser.password, (err,data) => {
    if (data) {
      const authClaims = [{ name: username },{ jti:jwt.sign( {}, "tcmTM" ) }];
      const token = jwt.sign({authClaims}, "tcmTM", {expiresIn: "2d"});
      res.status(200).json({ id: existingUser._id , token: token });
    }
    else {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
  })
});
module.exports = router;
