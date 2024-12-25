const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
      
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("invalid email address" + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
     
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
     enum : {
      values: [ "male","female","others","Male","Female"],
      message: `{VALUE} is not a valid gender type`
     },
    },
    photoUrl: {
      type: String,
      default:
        "https://tse3.mm.bing.net/th?id=OIP.UJ2vACrcxBESNGI8HPeckQHaGv&pid=Api&P=0&h=180",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("invalid photourl:" + value);
        }
      },
    },
    about: {
      type: String,
      default: "this is default about of user",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT =  async function () {
  const user = this;
 const token = await jwt.sign({ _id: user._id }, "vipul@123", {expiresIn: "1d",});
 return token;
};
userSchema.methods.validatePassword =  async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
 const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
 return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);
