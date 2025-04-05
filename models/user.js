//
const mongoose = require("mongoose");

const user = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "every user must have a username"],
    },
    email: {
      type: String,
      required: [true, "every user must have a email"],
    },
    DOB: {
      type: Date,
      required: [true, "every user must have a date of birth"],
    },
    gender: {
      type: String,
      required: [true, "every user must have a gender"],
      enum: ["male", "female"],
    },
    injuriesOrDiseases: [
      {
        type: String,
      },
    ],
    password: {
      type: String,
      required: [true, "every user must have a password"],
      minlength: 8, // Ensure strong passwords
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    activityLevel: {
      type: String,
      enum: [
        "sedentary",
        "moderately active",
        "active",
        "very active",
      ],
    },
    height: {
      type: Number, // in cm
    },
    weight: {
      type: Number, // in kg
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

user.virtual("age").get(function () {
  const now = new Date();
  return now.getFullYear() - this.DOB.getFullYear();
});

const User = mongoose.model("User", user);
module.exports = User;
