import { Dispatch, SetStateAction, useRef } from "react";
import { ImCross, ImSearch } from "react-icons/im";
import styled from "styled-components";
const StyledSearch = styled.div`
  padding: 5px;
  background: rgba(255, 255, 255, 0.05);
  margin: 10px;
  display: flex;
  border-radius: 3px;
`;

const SearchInput = styled.input`
  padding: 5px;
  line-height: normal;
  background: none;
  color: #fff;
  width: 100%;
  font-size: 16px;
  border: 0;
  box-sizing: border-box;

  &:focus {
    outline: none;
  }
`;

const SearchIcon = styled.div`
  width: 30px;
  height: 30px;
  margin: auto 0;
  display: flex;
  justify-content: center;

  svg {
    margin: auto;
    opacity: 0.75;
  }
`;
type SearchProps = {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
};

const Search = ({ searchQuery, setSearchQuery }: SearchProps) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <StyledSearch>
      <SearchInput
        ref={searchInputRef}
        type="text"
        placeholder="Circuit zoeken.."
        onChange={({ target }) => setSearchQuery(target.value)}
      />
      {searchQuery ? (
        <SearchIcon
          onClick={() => {
            if (!searchInputRef.current) {
              return;
            }
            searchInputRef.current.value = "";
            setSearchQuery("");
          }}
        >
          <ImCross />
        </SearchIcon>
      ) : (
        <SearchIcon>
          <ImSearch />
        </SearchIcon>
      )}
    </StyledSearch>
  );
};

export default Search;
