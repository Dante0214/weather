import React, { useState } from "react";
interface SearchBarProps {
  onSearch: (city: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(city);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="도시를 입력하세요"
        value={city}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setCity(e.target.value)
        }
      />
      <button type="submit">검색</button>
    </form>
  );
};

export default SearchBar;
