import React, { useState } from "react";
import "./SearchBar.css";

export const DomainsSearchBar = ({ placeholder, addDomains }) => {
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchText.trim() !== "") {
      addDomains(searchText.trim());
      setSearchText("");
    }
  };

  return (
    <div className="search">
      <form onSubmit={handleSubmit}>
        <input
          placeholder={placeholder}
          value={searchText}
          type="text"
          id="search"
          onChange={handleInputChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};
