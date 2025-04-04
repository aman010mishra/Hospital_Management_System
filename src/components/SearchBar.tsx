
import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { availableCities } from "@/services/hospitalService";

interface SearchBarProps {
  onCitySelect: (city: string) => void;
  selectedCity: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onCitySelect, selectedCity, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCities, setFilteredCities] = useState<string[]>(availableCities);

  useEffect(() => {
    if (searchTerm) {
      setFilteredCities(
        availableCities.filter(city =>
          city.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredCities(availableCities);
    }
  }, [searchTerm]);

  const handleCitySelect = (city: string) => {
    onCitySelect(city);
    setSearchTerm(city);
    setIsOpen(false);
  };

  const handleClear = () => {
    setSearchTerm("");
    onCitySelect("");
    setIsOpen(false);
  };

  return (
    <div className={cn("relative w-full max-w-md", className)}>
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search hospitals by city..."
          className="w-full rounded-md border border-border bg-background px-10 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="glass absolute z-10 mt-1 w-full rounded-md border border-border shadow-lg">
          <ul className="max-h-60 overflow-auto py-1">
            {filteredCities.length > 0 ? (
              filteredCities.map((city) => (
                <li
                  key={city}
                  onClick={() => handleCitySelect(city)}
                  className={cn(
                    "cursor-pointer px-4 py-2 hover:bg-accent",
                    city === selectedCity && "bg-accent"
                  )}
                >
                  {city}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-muted-foreground">No cities found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
