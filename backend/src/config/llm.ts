import { ChatGroq } from "@langchain/groq";
import { env } from "./env.js";

export const groqModel = new ChatGroq({
  apiKey: env.GROQ_API_KEY,
  model: env.GROQ_MODEL_NAME,
  temperature: 0,
});
