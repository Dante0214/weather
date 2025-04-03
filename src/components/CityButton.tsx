interface CityButtonProps {
  city: { display: string; value: string }[];
  onCitySelect: (city: string) => void;
  currentCity?: string | null;
  isCurrent: boolean;
}

const CityButton = ({
  city,
  onCitySelect,
  currentCity,
  isCurrent,
}: CityButtonProps) => {
  return (
    <div className="flex gap-2 mt-4 flex-wrap justify-center">
      {city.map(({ display, value }) => {
        const isSelected =
          value === "now"
            ? isCurrent
            : currentCity?.toLowerCase() === value.toLowerCase();

        return (
          <button
            key={value}
            onClick={() => onCitySelect(value)}
            className={`
              px-4 py-2 rounded transition-colors text-white
              ${
                value === "now"
                  ? isSelected
                    ? "bg-green-900" // 현재 위치 선택됨
                    : "bg-green-500 hover:bg-green-600" // 현재 위치 기본
                  : isSelected
                  ? "bg-blue-700" // 일반 도시 선택됨
                  : "bg-blue-500 hover:bg-blue-600"
              }
            `}
          >
            {value === "now" ? "📍 현재 위치" : display}
          </button>
        );
      })}
    </div>
  );
};

export default CityButton;
