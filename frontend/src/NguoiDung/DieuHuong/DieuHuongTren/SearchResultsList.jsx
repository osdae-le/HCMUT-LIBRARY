import "./SearchResultsList.css";
import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({ results, setResults }) => {
  return (
    <div className="results-list">
      {results.map((result, id) => {
        return (
          <SearchResult
            result={result.bookName}
            key={id}
            setResults={setResults}
          />
        );
      })}
    </div>
  );
};
