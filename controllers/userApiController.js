import factory from "../services/factory.js";
import credentialFactory from "../services/credentialsFactory.js";
import User from "../models/userModel.js";
import { fetchAIAdvice } from "../services/aiHandler.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import feedbackAndAIResponse from "../models/feedbackAndAIResponse.js";

// Authentication
export const loginUser = credentialFactory.login;
export const signupUser = credentialFactory.signup;

// CRUD Operations
export const getUserById = factory(User).getOne;
export const updateUser = factory(User).updateOne;
export const getRoot = (req, res, next) => {
  res.status(200).json({
    status: "success",
    endpoints: {
      signup: "/api/v1/users/signup",
      login: "/api/v1/users/login",
      getUserById: "/api/v1/users/:id",
    },
  });
};

export const postFeedback = asyncWrapper(async (req, res, next) => {
  const aiResponse = await fetchAIAdvice(
    req.user.id,
    req.body.feedback
  );

  const adviceContent =
    aiResponse[0]?.message?.content || "No advice generated";

  const newResponse = await feedbackAndAIResponse.create({
    user: req.user.id,
    feedback: req.body.feedback,
    advice: adviceContent,
    responseNumber:
      (await feedbackAndAIResponse.countDocuments({
        user: req.user.id,
      })) + 1,
  });

  res.status(201).json({
    status: "success",
    data: {
      advice: newResponse.advice,
      responseNumber: newResponse.responseNumber,
    },
  });
});
