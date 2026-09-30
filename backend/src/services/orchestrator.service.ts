import { runAgent } from "./agent.service.js";
import { formatReport } from "./formatter.service.js";

export const generateBriefing = async (query: string) => {
  // Stage 1: The Researcher (Agent)
  const agentResult = await runAgent(query);

  if (agentResult.status === "error") {
    return {
      status: "error",
      message: agentResult.result,
    };
  }

  const rawReport = agentResult.result;

  // Stage 2: The Formatter (Structured Output)
  const structuredData = await formatReport(rawReport);

  return {
    status: "success",
    raw_report: rawReport,
    structured_data: structuredData,
  };
};
