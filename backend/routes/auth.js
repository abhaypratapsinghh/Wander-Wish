const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET_KEY;

const User = require("../models/User");

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({
        message: "User already exist",
      });
    }

    const salt = await bcrypt.genSalt();

    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    await newUser.save();
    res.status(200).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({
        message: "User doesn't exist",
      });
    }

    const ismatch = await bcrypt.compare(password, user.password);

    if (!ismatch) {
      res.status(404).json({
        message: "Enter Valid Credentials",
      });
    }

      const token = jwt.sign({ userId: user._id }, JWT_SECRET);
      delete user.password;

    return res.status(200).json({
      message: "Signed in successfully",
      token: token,
      user: user,
    });
  } catch (err) {
      console.log(err);
      res.status(500).json({
          error: err.message
      })
  }
});

module.exports = router;
