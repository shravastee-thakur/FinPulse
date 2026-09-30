import { tool } from "@langchain/core/tools";

import { getStockPrice } from "../services/stock.service.js";
import { searchNews } from "../services/news.service.js";
import {
  NewsSearchInputSchema,
  StockPriceInputSchema,
} from "../schemas/finpulse.schema.js";

export const stockPriceTool = tool(
  async (input) => {
    const result = await getStockPrice(input.symbol);
    return JSON.stringify(result);
  },
  {
    name: "stock_price",
    description: "Get the latest available stock price for a ticker symbol.",
    schema: StockPriceInputSchema,
  },
);

export const newsSearchTool = tool(
  async (input) => {
    const result = await searchNews(input.query, input.max_results);
    return JSON.stringify(result);
  },
  {
    name: "search_news",
    description: "Search recent financial news headlines using Tavily.",
    schema: NewsSearchInputSchema,
  },
);

export const FINPULSE_TOOLS = [stockPriceTool, newsSearchTool];
