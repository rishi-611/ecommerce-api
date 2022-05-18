const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../config/config");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      min: [8, "password must be atleast 8 characters long"],
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
    },
    userType: {
      type: String,
      required: true,
      enum: [...config.USER_TYPES],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.isUsernameTaken = async function (username) {
  let User = this;
  try {
    const existingUser = await User.findOne({ username });
    return existingUser ? true : false;
  } catch (error) {
    return false;
  }
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 9);
  }
  next();
});

//check if the input password matches with this user's password
userSchema.methods.isPasswordMatch = async function (candidatePassword) {
  const isPasswordCorrect = await bcrypt.compare(
    candidatePassword,
    this.password
  );
  return isPasswordCorrect;
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
