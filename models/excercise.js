//
const mongoose = require("mongoose");

const exercise = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "every exercise need to have a name"],
    },
    difficulty: {
      type: String,
      required: [true, "every exercise need to have a difficulty"],
      enum: ["easy", "medium", "intense"],
    },
    targetMuscle: {
      type: String,
      required: [true, "every exercise need to have a targetMuscle"],
      enum: [
        "chest",
        "legs",
        "biceps",
        "forearms",
        "triceps",
        "calves",
        "abdominals",
        "trapezius",
        "lats",
      ],
    },
    duration: {
      type: Number,
      required: [true, "every exercise needs to have a duration"],
    },
    ageSpecific: { type: String },
    equipmentRequired: {
      type: String,
      required: [true, "every exercise needs to have a requirement"],
      enum: ["none", "dumbbells", "barbells", "wireMachine"],
      default: "none",
    },

    videosOrImages: {
      type: [String],
      default: [],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
