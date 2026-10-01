import { useState } from "react";
import { fetchBriefing } from "./api/finpulse.api";
import type { BriefingResponse } from "./types/finpulse";

import SearchBar from "./components/SearchBar";
import StockCard from "./components/StockCard";
import BriefingSummary from "./components/BriefingSummary";
import NewsList from "./components/NewsList";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<BriefingResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetchBriefing(query);
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch briefing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2">FinPulse</h1>
        <p className="text-gray-400 text-center mb-8">
          AI Financial & Market Research Assistant
        </p>

        <SearchBar onSearch={handleSearch} isLoading={loading} />

        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-200 p-4 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-400">
              The agent is researching and formatting your report...
            </p>
          </div>
        )}

        {data && data.status === "success" && data.structured_data && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <StockCard data={data.structured_data} />
            </div>

            <div className="md:col-span-2 space-y-6">
              <BriefingSummary data={data.structured_data} />
              <NewsList data={data.structured_data} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
