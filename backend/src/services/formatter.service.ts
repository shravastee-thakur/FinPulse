import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";

import { groqModel } from "../config/llm.js";
import { FinancialBriefingSchema } from "../schemas/finpulse.schema.js";

const formatterPrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are a financial report formatter. Convert the assistant research notes into the required structured JSON briefing. Use only information from the research notes. Do not invent prices, headlines, links, or risks. If a field is not available, use null or an empty array.",
  ],
  [
    "human",
    "Research notes:\n{raw_report}\n\nReturn the structured financial briefing.",
  ],
]);

export async function formatReport(rawReport: string) {
  try {
    // This forces Groq to return JSON matching your Zod schema
    const structuredLlm = groqModel.withStructuredOutput(
      FinancialBriefingSchema,
    );

    // This is the LCEL pipe in TypeScript. It connects the prompt directly to the structured LLM
    const chain = RunnableSequence.from([formatterPrompt, structuredLlm]);

    const result = await chain.invoke({ raw_report: rawReport });

    return result;
  } catch (error) {
    console.error("Formatter error:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to format report",
    );
  }
}
