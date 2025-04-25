import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import { HfInference } from "@huggingface/inference";
import fs from "fs";
const config = JSON.parse(fs.readFileSync("./config.json", "utf-8"));

dotenv.config({ path: "./config.env" });

const inference = new HfInference(process.env.HuggingFace_APIKEY);

import axios from "axios";
import { SocksProxyAgent } from "socks-proxy-agent";

// Define your API key and endpoint
const apiKey = process.env.ChatgptOpenAIApiKey; // Replace with your real API key
// console.log(apiKey);

const apiEndpoint = "https://api.openai.com/v1/chat/completions";

// Configure the SOCKS proxy
const proxy = "socks5://127.0.0.1:1081"; // Psiphon's SOCKS proxy
const agent = new SocksProxyAgent(proxy);

// Define the request payload
const payloadCreator = (content) => {
  return {
    model: "gpt-4o-mini", // Select your model
    messages: [{ role: "user", content }],
    store: true, // Optional parameter
  };
};

const payload = payloadCreator("how to laugh very intensely?");

// Send the request
async function fetchOpenAIResponse() {
  try {
    const response = await axios.post(apiEndpoint, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      httpAgent: agent, // Attach the SOCKS proxy agent
      httpsAgent: agent,
    });

    console.log(response.data.choices);
    // console.log("OpenAI Response:", response.data);
  } catch (error) {
    console.error(
      "Error with OpenAI API:",
      error.response?.data || error.message
    );
  }
}

fetchOpenAIResponse();
