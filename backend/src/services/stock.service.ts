import YahooFinance from "yahoo-finance2";

// Initialize a new client instance
const yahooFinance = new YahooFinance();

export const getStockPrice = async (symbol: string) => {
  const cleanSymbol = symbol.trim().toUpperCase();

  try {
    const quote = (await yahooFinance.quote(cleanSymbol)) as {
      regularMarketPrice?: number;
      currency?: string;
      regularMarketPreviousClose?: number;
    };

    return {
      status: "success",
      symbol: cleanSymbol,
      price: quote.regularMarketPrice ?? null,
      currency: quote.currency ?? null,
      previous_close: quote.regularMarketPreviousClose ?? null,
    };
  } catch (error) {
    return {
      status: "error",
      symbol: cleanSymbol,
      message: error instanceof Error ? error.message : "Stock lookup failed",
    };
  }
};
