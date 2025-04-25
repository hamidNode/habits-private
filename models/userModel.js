//
import mongoose from "mongoose";
import validator from "validator";

import feedbackAndAIResponse from "./feedbackAndAIResponse.js";

const user = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "every user must have a username"],
      validate: {
        validator: function (v) {
          return v.length >= 5 && v.length <= 25;
        },
        message:
          "the length should be between 5 and 25 charachters! ",
      },
    },
    email: {
      type: String,
      required: [true, "every user must have a email"],
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email address.",
      },
    },
    dob: {
      type: Date,
      required: [true, "every user must have a date of birth"],
      validate: {
        validator: validator.isDate,
        message: "Please provide a valid date of birth",
      },
    },
    gender: {
      type: String,
      required: [
        true,
        "every user must have a gender, eighter male or female",
      ],
      enum: {
        values: ["male", "female"],
        message:
          "{VALUE} is not a valid gender. Choose either male or female.",
      },
    },
    medicalHistory: [
      {
        type: String,
        validate: {
          validator: function (v) {
            return v.length <= 500;
          },
          message:
            "Please provide description less that 500 charachters",
        },
      },
    ],
    password: {
      type: String,
      required: [true, "every user must have a password"],
      select: false,
    },
    userRole: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    height: {
      type: Number,
      validate: {
        validator: function (v) {
          return v >= 50 && v <= 250;
        },
        message: "Please provide a height between 50 and 250 cm",
      },
      required: [true, "Height is required"],
    },
    weight: {
      type: Number,
      validate: {
        validator: function (v) {
          return v <= 250 && v >= 25;
        },
        message: "Please provide a weight between 25 and 250 kg",
      },
      required: [true, "Weight is required"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    aiRequestStats: {
      onlineAI: { type: Number, default: 0 },
      offlineAI: { type: Number, default: 0 },
    },
    currentLifestyle: {
      type: String,
      required: [true, "every user must have a description"],
      validate: {
        validator: function (v) {
          return v.length <= 500;
        },
        message:
          "Please provide a description less than 500 charachters",
      },
    },
    goalsMotivations: [
      {
        type: String,
        required: [true, "every user must have motives"],
        validate: {
          validator: function (v) {
            return v.length <= 50;
          },
          message: "Every motive need to be less than 50 charachters",
        },
      },
    ],
    personalPreferences: [
      {
        type: String,
        required: [true, "every user must have personal preferences"],
        validate: {
          validator: function (v) {
            return v.length <= 50;
          },
          message:
            "Every preference need to be less than 50 charachters",
        },
      },
    ],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

user.virtual("age").get(function () {
  const now = new Date();
  return now.getFullYear() - this.dob.getFullYear();
});

user.virtual("feedbackAndAIResponse", {
  ref: "feedbackAndAIResponse", // Reference the feedbackAndProgress schema
  localField: "_id", // The field in User that connects to feedbackAndProgress
  foreignField: "user", // The field in feedbackAndProgress schema that connects to User
});

const User = mongoose.model("User", user);
export default User;
