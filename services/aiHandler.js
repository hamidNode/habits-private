//
import AIResponse from "../models/feedbackAndAIResponse.js";
import fetchOpenAIResponse from "./fetchOpenAIResponse.js";

export const fetchAIAdvice = async (userId, userInputFeedback) => {
  // Get last 5 advices from DB
  const last5Advices = await AIResponse.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(5);

  // Format the history for better AI comprehension
  const formattedHistory = last5Advices
    .map(
      (advice, index) =>
        `Advice #${
          index + 1
        } (${advice.createdAt.toLocaleDateString()}):\n${
          advice.feedback
        }`
    )
    .join("\n\n");

  // Create the content object
  const content = {
    instructions:
      "Analyze this user's feedback history and provide personalized advice. Consider patterns in their previous feedback.",
    userHistory:
      formattedHistory || "No previous advice history found",
    currentFeedback: userInputFeedback,
    responseFormat: {
      advice: "string (concise, actionable advice)",
      reasoning: "string (brief explanation of your analysis)",
      tags: "array (keywords identifying main topics)",
    },
  };

  // Convert to string for the API (or send as structured object if API supports)
  const contentString = JSON.stringify(content, null, 2);
  console.log(contentString);

  const result = await fetchOpenAIResponse(contentString);

  // Send to OpenAI
  return result;
};
