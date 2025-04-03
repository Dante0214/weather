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
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto my-6">
      <div className=" relative">
        <input
          className="w-full px-4 py-3 rounded-full bg-white/80 backdrop-blur-sm
                     border border-gray-200 focus:border-blue-500 focus:ring-2 
                     focus:ring-blue-500 outline-none transition-all"
          type="text"
          placeholder="도시를 입력하세요"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2
                     bg-blue-500 text-white px-4 py-2 rounded-full
                     hover:bg-blue-600 transition-colors"
        >
          검색
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
