//

import mongoose from "mongoose";

const feedbackAndAIResponseSchema = new mongoose.Schema({
  feedback: { type: String, required: true },
  advice: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  responseNumber: { type: Number },
});

const feedbackAndAIResponse = mongoose.model(
  "feedbackAndAIResponse",
  feedbackAndAIResponseSchema
);
export default feedbackAndAIResponse;
