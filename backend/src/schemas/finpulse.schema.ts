import { z } from "zod";

export const StockPriceInputSchema = z.object({
  symbol: z.string().describe("Stock ticker symbol, example AAPL"),
});

export const NewsSearchInputSchema = z.object({
  query: z.string().describe("Search query, example Apple supply chain"),
  max_results: z
    .int()
    .min(1)
    .max(10)
    .default(3)
    .describe("Number of results to return"),
});

// export const CalculateInputSchema = z.object({
//   expression: z.string().describe("Arithmetic expression, example 100 * 0.05"),
// });

export const FinancialBriefingSchema = z.object({
  summary: z.string().describe("Short executive summary"),
  stock_symbol: z
    .string()
    .nullable()
    .optional()
    .describe("Stock ticker symbol"),
  current_price: z
    .number()
    .nullable()
    .optional()
    .describe("Latest stock price"),
  currency: z.string().nullable().optional().describe("Currency of the price"),
  news_summary: z.string().default("").describe("Summary of recent news"),
  top_headlines: z.array(z.string()).default([]).describe("Recent headlines"),
  source_links: z.array(z.string()).default([]).describe("Links to sources"),
  risk_notes: z
    .array(z.string())
    .default([])
    .describe("Risks, caveats, or data limitations"),
});

export type StockPriceInput = z.infer<typeof StockPriceInputSchema>;
export type NewsSearchInput = z.infer<typeof NewsSearchInputSchema>;
// export type CalculateInput = z.infer<typeof CalculateInputSchema>;
export type FinancialBriefing = z.infer<typeof FinancialBriefingSchema>;
