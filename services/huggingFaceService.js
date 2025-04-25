// const fetch = require("node-fetch");

import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

const analyzeFeedback = async (feedback) => {
  try {
    // console.log(process.env.HuggingFace_APIKEY);
    const model1 = "facebook/bart-large-cnn";
    const model2 = "distilbert-base-uncased-finetuned-sst-2-english";
    // const model3 = "facebook/bart-large-cnn";
    const model4 = "t5-large";
    const model5 = "google/t5-v1_1-large";
    const model6 = "distilbert-base-cased-distilled-squad";
    const model7 = "EleutherAI/gpt-neo-2.7B";
    const model8 = "EleutherAI/gpt-j-6B";

    const response = await fetch(
      `https://api-inference.huggingface.co/models/${model8}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HuggingFace_APIKEY}`, // Replace YOUR_API_KEY with your Hugging Face API token
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: feedback }),
      }
    );

    const data = await response.json(); // Parse the API response
    return data; // Return the response for processing in other layers
  } catch (err) {
    console.error("Error with Hugging Face API:", err.message);
    throw new Error("Failed to analyze feedback");
  }
};

export default analyzeFeedback;
