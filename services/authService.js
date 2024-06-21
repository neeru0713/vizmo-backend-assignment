const { User } = require("../models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

var SALT_WORK_FACTOR = 10;

async function createUser(userBody) {
  console.log(userBody);
  try {
    let userExists = await User.findOne({ email: userBody.email });
    if (userExists) {
      throw new Error("Email already taken");
    } else {
      const newUser = new User(userBody);
      const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
      const hash = await bcrypt.hash(newUser.password, salt);
      newUser.password = hash;
      const result = await newUser.save();
      return result;
    }
  } catch (error) {
    console.error("Error creating user: ", error.message);
    throw error;
  }
}

const generateToken = (userId, secret = "vizmobackend") => {
    const payload = { _id: userId.toString()};
    const token = jwt.sign(payload, secret);
    return token;
  };
  
  const generateAuthTokens = async (user) => {
    let token = generateToken(user?._id);
    return token;
  };
  
  async function matchPassword(clientPassword, storedPassword) {
    const isMatchPassword = await bcrypt.compare(clientPassword, storedPassword);
    return isMatchPassword;
  }
  
  async function loginUser(email, password) {
    try {
      let user = await User.findOne({ email: email });
      if (!user) {
        throw new Error({ message: "User doesn't exsit" , statusCode: 404});
      }
  
      const isMatchPassword = await matchPassword(password, user.password);
  
      if (!isMatchPassword) {
        throw new Error({ message: "Password doesn't match" , statusCode: 403});
        // return null;
      } else {
        return user;
      }
    } catch (error) {
      console.error("Error creating user: ", error.message);
    }
  }
module.exports = {
    createUser,
    loginUser,
    generateAuthTokens,
    
  
  };