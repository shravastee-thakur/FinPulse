import { tavily } from "@tavily/core";
import { env } from "../config/env.js";

export const searchNews = async (query: string, maxResults: number) => {
  try {
    const client = tavily({ apiKey: env.TAVILY_API_KEY });

    const response = (await client.search(query, {
      maxResults: maxResults,
    })) as { results?: Array<{ title?: string; url?: string }> };

    const headlines: string[] = [];
    const links: string[] = [];

    for (const item of response.results ?? []) {
      if (item.title) headlines.push(item.title);
      if (item.url) links.push(item.url);
    }

    return {
      status: "success",
      query,
      headlines,
      links,
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "News search failed",
    };
  }
};
