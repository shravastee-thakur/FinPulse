import type { BriefingResponse } from "../types/finpulse";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchBriefing(query: string): Promise<BriefingResponse> {
  try {
    const response = await axios.post(`${API_BASE_URL}/briefing`, { query });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      throw new Error(`API request failed: ${message}`);
    }
    throw error;
  }
}
