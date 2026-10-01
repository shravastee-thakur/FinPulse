import type { FinancialBriefing } from "../types/finpulse";

interface Props {
  data: FinancialBriefing;
}

export default function NewsList({ data }: Props) {
  if (data.top_headlines.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
      <h3 className="text-xl font-semibold text-white border-b border-gray-700 pb-2 mb-4">Recent Headlines</h3>
      <ul className="space-y-4">
        {data.top_headlines.map((headline, index) => (
          <li key={index} className="flex flex-col">
            <span className="text-white font-medium">{headline}</span>
            {data.source_links[index] && (
              <a 
                href={data.source_links[index]} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 text-sm hover:underline truncate"
              >
                {data.source_links[index]}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}