import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(4000),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  GROQ_API_KEY: z.string().min(1, "GROQ_API_KEY is required"),
  GROQ_BASE_URL: z.string().url().default("https://api.groq.com/openai/v1"),
  GROQ_MODEL_NAME: z.string().default("llama-3.1-70b-versatile"),
  TAVILY_API_KEY: z.string().min(1, "TAVILY_API_KEY is required"),
  CLIENT_URL: z.string().url().default("http://localhost:5173"),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("Invalid environment variables:");
  console.error(_env.error.format());
  process.exit(1);
}

export const env = _env.data;
