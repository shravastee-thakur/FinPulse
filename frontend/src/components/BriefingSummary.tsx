import type { FinancialBriefing } from "../types/finpulse";

interface Props {
  data: FinancialBriefing;
}

export default function BriefingSummary({ data }: Props) {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 space-y-4">
      <h3 className="text-xl font-semibold text-white border-b border-gray-700 pb-2">Executive Summary</h3>
      <p className="text-gray-300 leading-relaxed">{data.summary}</p>
      
      {data.news_summary && (
        <div>
          <h4 className="text-lg font-medium text-white mt-4 mb-2">News Context</h4>
          <p className="text-gray-400 text-sm">{data.news_summary}</p>
        </div>
      )}

      {data.risk_notes.length > 0 && (
        <div className="mt-4 p-4 bg-red-900/20 border border-red-800 rounded-lg">
          <h4 className="text-lg font-medium text-red-400 mb-2">Risk Notes</h4>
          <ul className="list-disc list-inside text-red-300 text-sm space-y-1">
            {data.risk_notes.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}