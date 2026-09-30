import { Request, Response } from "express";

import { generateBriefing } from "../services/orchestrator.service.js";

export const createBriefing = async (req: Request, res: Response) => {
  try {
    const { query } = req.body;

    if (!query || typeof query !== "string") {
      res.status(400).json({
        status: "error",
        message: "Request body must include a valid query string",
      });
      return;
    }

    const result = await generateBriefing(query);

    if (result.status === "error") {
      res.status(500).json(result);
      return;
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
};
