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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center p-4"
    >
      <input
        className="border rounded p-2 mr-2"
        type="text"
        placeholder="도시를 입력하세요"
        value={city}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setCity(e.target.value)
        }
      />
      <button
        type="submit"
        className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        검색
      </button>
    </form>
  );
};

export default SearchBar;
