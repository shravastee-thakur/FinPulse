import type { FinancialBriefing } from "../types/finpulse";

interface Props {
  data: FinancialBriefing;
}

export default function StockCard({ data }: Props) {
  if (!data.stock_symbol || data.current_price === null) {
    return null;
  }

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold text-white">{data.stock_symbol}</h2>
        <span className="text-sm text-gray-400 uppercase">{data.currency}</span>
      </div>
      <p className="text-4xl font-bold text-green-400">
        {data.current_price.toFixed(2)}
      </p>
    </div>
  );
}
