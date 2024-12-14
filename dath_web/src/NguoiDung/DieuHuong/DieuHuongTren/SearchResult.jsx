import "./SearchResult.css";
import { setSearchResult } from "../../../redux/authSlice";
import { useDispatch } from "react-redux";
export const SearchResult = ({ result, setResults }) => {
  const dispatch = useDispatch();
  return (
    <div
      className="search-result"
      onClick={() => {
        console.log("You clicked on ", result);
        dispatch(setSearchResult(result));
        setResults([]);
      }}
    >
      {result}
    </div>
  );
};
