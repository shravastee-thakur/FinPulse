export interface FinancialBriefing {
  summary: string;
  stock_symbol: string | null;
  current_price: number | null;
  currency: string | null;
  news_summary: string;
  top_headlines: string[];
  source_links: string[];
  risk_notes: string[];
}

export interface BriefingResponse {
  status: "success" | "error";
  raw_report?: string;
  structured_data?: FinancialBriefing;
  message?: string;
}
