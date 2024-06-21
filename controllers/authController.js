const authService = require("../services/authService");

const register = async (req, res) => {
  try {
    let newUser = await authService.createUser(req.body);

    const token = await authService.generateAuthTokens(newUser);
    let resObj = {
      user: newUser,
      token,
      message: "User registered successfully",
    };

    res
      .status(201)
      .json(resObj);
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: error.message });
  }
};
const login = async (req, res) => {
    try {
      let user = await authService.loginUser(req.body.email, req.body.password);
      if (user) {
        const token = await authService.generateAuthTokens(user);
        let resObj = {
          user: user,
          token
        };
        res.status(200).json({ resObj, message: "user login sucessfully" });
      }
    } catch (error) {
      console.error("Error during login:", error);
      res.status(error.statusCode).json({ error: error.message});
    }
  };
  
  module.exports = {
    register,
    login
  };