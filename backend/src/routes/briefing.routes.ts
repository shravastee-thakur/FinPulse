import { Router } from "express";

import { createBriefing } from "../controllers/briefing.controller.js";

const router = Router();

router.post("/briefing", createBriefing);

export { router as briefingRouter };
