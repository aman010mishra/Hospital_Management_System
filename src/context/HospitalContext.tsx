import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Hospital, HospitalCreateInput, HospitalDetailsInput, HospitalUpdateInput } from "@/types/hospital";
import { toast } from "sonner";
import {
  getAllHospitals,
  getHospitalsByCity,
  getHospitalById,
  createHospital,
  updateHospital,
  addHospitalDetails,
  deleteHospital
} from "@/services/hospitalService";

interface HospitalContextType {
  hospitals: Hospital[];
  filteredHospitals: Hospital[];
  loading: boolean;
  error: string | null;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  getHospital: (id: string) => Promise<Hospital | undefined>;
  addHospital: (hospital: HospitalCreateInput) => Promise<Hospital>;
  updateHospitalById: (id: string, updates: HospitalUpdateInput) => Promise<Hospital | undefined>;
  addDetails: (id: string, details: HospitalDetailsInput) => Promise<Hospital | undefined>;
  removeHospital: (id: string) => Promise<boolean>;
  refreshHospitals: () => Promise<void>;
}

const HospitalContext = createContext<HospitalContextType | null>(null);

export const useHospitals = () => {
  const context = useContext(HospitalContext);
  if (!context) {
    throw new Error("useHospitals must be used within a HospitalProvider");
  }
  return context;
};

interface HospitalProviderProps {
  children: ReactNode;
}

export const HospitalProvider: React.FC<HospitalProviderProps> = ({ children }) => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>("");

  const loadHospitals = async () => {
    try {
      setLoading(true);
      const data = await getAllHospitals();
      setHospitals(data);
      setFilteredHospitals(data);
      setError(null);
    } catch (err) {
      setError("Failed to load hospitals");
      toast.error("Failed to load hospitals");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHospitals();
  }, []);

  useEffect(() => {
    const filterHospitals = async () => {
      try {
        setLoading(true);
        if (selectedCity) {
          const filtered = await getHospitalsByCity(selectedCity);
          setFilteredHospitals(filtered);
        } else {
          setFilteredHospitals(hospitals);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to filter hospitals");
      } finally {
        setLoading(false);
      }
    };

    filterHospitals();
  }, [selectedCity, hospitals]);

  const getHospital = async (id: string): Promise<Hospital | undefined> => {
    try {
      return await getHospitalById(id);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch hospital details");
      return undefined;
    }
  };

  const addHospital = async (hospital: HospitalCreateInput): Promise<Hospital> => {
    try {
      const newHospital = await createHospital(hospital);
      setHospitals(prev => [...prev, newHospital]);
      toast.success("Hospital created successfully");
      return newHospital;
    } catch (err) {
      console.error(err);
      toast.error("Failed to create hospital");
      throw err;
    }
  };

  const updateHospitalById = async (id: string, updates: HospitalUpdateInput): Promise<Hospital | undefined> => {
    try {
      const updatedHospital = await updateHospital(id, updates);
      if (updatedHospital) {
        setHospitals(prev =>
          prev.map(hospital => (hospital.id === id ? updatedHospital : hospital))
        );
        toast.success("Hospital updated successfully");
      }
      return updatedHospital;
    } catch (err) {
      console.error(err);
      toast.error("Failed to update hospital");
      return undefined;
    }
  };

  const addDetails = async (id: string, details: HospitalDetailsInput): Promise<Hospital | undefined> => {
    try {
      const updatedHospital = await addHospitalDetails(id, details);
      if (updatedHospital) {
        setHospitals(prev =>
          prev.map(hospital => (hospital.id === id ? updatedHospital : hospital))
        );
        toast.success("Hospital details added successfully");
      }
      return updatedHospital;
    } catch (err) {
      console.error(err);
      toast.error("Failed to add hospital details");
      return undefined;
    }
  };

  const removeHospital = async (id: string): Promise<boolean> => {
    try {
      const success = await deleteHospital(id);
      if (success) {
        setHospitals(prev => prev.filter(hospital => hospital.id !== id));
        toast.success("Hospital deleted successfully");
      }
      return success;
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete hospital");
      return false;
    }
  };

  const refreshHospitals = async (): Promise<void> => {
    await loadHospitals();
  };

  const value = {
    hospitals,
    filteredHospitals,
    loading,
    error,
    selectedCity,
    setSelectedCity,
    getHospital,
    addHospital,
    updateHospitalById,
    addDetails,
    removeHospital,
    refreshHospitals
  };

  return <HospitalContext.Provider value={value}>{children}</HospitalContext.Provider>;
};
