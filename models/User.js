
const mongoose = require("mongoose");



const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      validate(value) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const newUser = emailRegex.test(value);
        if (!newUser) {
          throw new Error("Unique LowerCase validate email format");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
     
    },
    username: {
        type: String,
        required: true,
    }
},
{ timestamps: true }
);






const User = mongoose.model("User", userSchema);
module.exports = { User };
