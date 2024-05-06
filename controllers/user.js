
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userSchema = require('../models/addUser')


const userSignup = async (req, res) => {
    try {
      const isEmailExist = await userSchema.findOne({
        userEmail: req.body.userEmail,
      });
      if (isEmailExist) {
        res.status(400).json({
          success: "failure",
          message: "User with this email is already exist",
        });
      } else {
        const userData = await new userSchema(req.body);
        try {
          const salt = await bcrypt.genSalt(10);
          userData.userPassword = await bcrypt.hash(req.body.userPassword, salt);;
          const info = userData.save();
          res.status(201).json({
            success: "success",
            message: "Signup successfully",
          });
        } catch (err) {
          res.status(400).json({
            success: "failure",
            error: err.message,
          });
        }
      }
    } catch (err) {
      res.status(400).json({
        success: "failure",
        error: err.message,
      });
    }
  };

  const userLogin = async (req, res) => {
    try {
      const { userEmail, userPassword } = req.body;
      if (userEmail && userPassword) {
        const user = await userSchema.findOne({ userEmail: userEmail });
        if (user != null) {
          const isMatch = await bcrypt.compare(userPassword, user.userPassword);
          if (user.userEmail === userEmail && isMatch) {
            const token = jwt.sign(
              { userId: user._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "10d" }
            );
            res.status(200).json({
              success: "success",
              message: "Successfully login",
              user_details: user,
              token: token,
            });
          } else {
            res.status(400).json({
              success: "failure",
              message: "Email or password is not valid",
            });
          }
        } else {
          res.status(400).json({
            success: "failure",
            message: "Invalid credentials",
          });
        }
      }
    } catch (err) {
      res.status(400).json({
        success: "failure",
        error: err.message,
      });
    }
  };

  module.exports = {
    userSignup,
    userLogin
  }


  