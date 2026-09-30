import { groqModel } from "../config/llm.js";
import { createAgent } from "langchain";
import { FINPULSE_TOOLS } from "../tools/finpulse.tools.js";

export const finPulseAgent = createAgent({
  model: groqModel,
  tools: FINPULSE_TOOLS,
});
