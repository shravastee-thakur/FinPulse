import { HumanMessage } from "langchain";
import { finPulseAgent } from "../agents/finpulse.agent.js";

export const runAgent = async (query: string) => {
  try {
    const response = await finPulseAgent.invoke({
      messages: [new HumanMessage(query)],
    });

    const messages = response.messages;
    const finalMessage = messages[messages.length - 1];

    const resultString =
      typeof finalMessage.content === "string"
        ? finalMessage.content
        : finalMessage.content
            .map((b) => ("text" in b ? b.text : ""))
            .join("\n");

    return {
      status: "success",
      result: resultString,
    };
  } catch (error) {
    return {
      status: "error",
      result: error instanceof Error ? error.message : "Agent execution failed",
    };
  }
};
