
import React, { useState, useEffect } from "react";
import { useHospitals } from "@/context/HospitalContext";
import HospitalCard from "@/components/HospitalCard";
import SearchBar from "@/components/SearchBar";
import { Hospital } from "lucide-react";

const Hospitals: React.FC = () => {
  const {
    filteredHospitals,
    loading,
    error,
    selectedCity,
    setSelectedCity,
    removeHospital,
  } = useHospitals();

  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // Set initial load to false after first render
    const timer = setTimeout(() => setIsInitialLoad(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleDelete = async (id: string) => {
    await removeHospital(id);
  };

  return (
    <div className="page-transition container mx-auto min-h-screen px-4 pt-20">
      <div className="mb-8 mt-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Hospitals</h1>
          <p className="mt-1 text-muted-foreground">
            Browse and manage hospitals across different cities
          </p>
        </div>
        <SearchBar
          onCitySelect={setSelectedCity}
          selectedCity={selectedCity}
          className="w-full sm:w-auto"
        />
      </div>

      {loading && isInitialLoad ? (
        <div className="mt-16 flex flex-col items-center justify-center">
          <Hospital className="h-12 w-12 animate-pulse text-primary/70" />
          <p className="mt-4 text-muted-foreground">Loading hospitals...</p>
        </div>
      ) : error ? (
        <div className="flex h-64 items-center justify-center rounded-lg border bg-red-50 p-4 text-center">
          <p className="text-lg text-red-500">{error}</p>
        </div>
      ) : filteredHospitals.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center rounded-lg border p-8 text-center">
          <Hospital className="mb-4 h-12 w-12 text-muted-foreground/50" />
          <h3 className="text-xl font-medium">No hospitals found</h3>
          <p className="mt-2 text-muted-foreground">
            {selectedCity
              ? `No hospitals found in ${selectedCity}. Try a different city or add a new hospital.`
              : "No hospitals available. Add a new hospital to get started."}
          </p>
        </div>
      ) : (
        <>
          {selectedCity && (
            <div className="mb-6">
              <p className="text-md font-medium text-muted-foreground">
                Showing hospitals in <span className="font-semibold text-foreground">{selectedCity}</span>
                <button
                  onClick={() => setSelectedCity("")}
                  className="ml-2 text-sm text-primary underline-offset-4 hover:underline"
                >
                  Clear filter
                </button>
              </p>
            </div>
          )}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredHospitals.map((hospital) => (
              <div
                key={hospital.id}
                className="animate-slide-up"
                style={{
                  animationDelay: `${(parseInt(hospital.id) % 10) * 0.05}s`,
                }}
              >
                <HospitalCard hospital={hospital} onDelete={handleDelete} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Hospitals;
