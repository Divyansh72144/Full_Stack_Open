import React from "react";

const SearchFilter = ({ searchName, handleSearchName }) => {
  return (
    <div>
      filter shown with:{" "}
      <input value={searchName} onChange={handleSearchName} />
    </div>
  );
};

export default SearchFilter;
