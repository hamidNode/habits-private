import dotenv from "dotenv";
import axios from "axios";

import fs from "fs";
const config = JSON.parse(fs.readFileSync("./config.json", "utf-8"));

dotenv.config({ path: "./config.env" });

import { SocksProxyAgent } from "socks-proxy-agent";

// Define your API key and endpoint
const apiKey = process.env.ChatgptOpenAIApiKey; // Replace with your real API key
// console.log(apiKey);

const apiEndpoint = "https://api.openai.com/v1/chat/completions";

// Configure the SOCKS proxy
const proxy = "socks5://127.0.0.1:1081"; // Psiphon's SOCKS proxy just in case you are restricted to openAI in your region
const agent = new SocksProxyAgent(proxy);

// Send the request
async function fetchOpenAIResponse(content) {
  try {
    const response = await axios.post(
      apiEndpoint,
      {
        model: "gpt-4o-mini",
        messages: [{ role: "user", content }],
        store: true,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        httpAgent: agent, // Attach the SOCKS proxy agent
        httpsAgent: agent,
      }
    );

    console.log(response.data.choices);
    // console.log("OpenAI Response:", response.data);
    return response.data.choices;
  } catch (error) {
    console.error(
      "Error with OpenAI API:",
      error.response?.data || error.message
    );
  }
}

export default fetchOpenAIResponse;
