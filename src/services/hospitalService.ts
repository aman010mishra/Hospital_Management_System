
import { Hospital, HospitalCreateInput, HospitalDetailsInput, HospitalUpdateInput } from "@/types/hospital";

// Mock data for development (will be replaced with actual API calls)
let mockHospitals: Hospital[] = [
  {
    id: "1",
    name: "Apollo Hospital",
    city: "Delhi",
    imageUrl: "https://images.unsplash.com/photo-1587351021759-3e566b3db538?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    specialities: ["Cardiology", "Neurology", "Orthopedics"],
    rating: 4.5,
    description: "Apollo Hospital is a state-of-the-art medical facility providing high-quality healthcare services.",
    images: [
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1504439468489-c8920d796a29?q=80&w=2971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    numberOfDoctors: 150,
    numberOfDepartments: 20,
  },
  {
    id: "2",
    name: "Max Healthcare",
    city: "Mumbai",
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2953&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    specialities: ["Oncology", "Pediatrics", "Gastroenterology"],
    rating: 4.2,
    description: "Max Healthcare is committed to providing excellent medical care and patient services.",
    images: [
      "https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=2952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    numberOfDoctors: 120,
    numberOfDepartments: 15,
  },
  {
    id: "3",
    name: "Fortis Healthcare",
    city: "Bangalore",
    imageUrl: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=2928&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    specialities: ["Dermatology", "Psychiatry", "Endocrinology"],
    rating: 4.0,
    description: "Fortis Healthcare delivers comprehensive healthcare services with cutting-edge technology.",
    images: [
      "https://images.unsplash.com/photo-1504439468489-c8920d796a29?q=80&w=2971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    numberOfDoctors: 100,
    numberOfDepartments: 12,
  },
  {
    id: "4",
    name: "AIIMS",
    city: "Delhi",
    imageUrl: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    specialities: ["Neurosurgery", "Cardiothoracic Surgery", "Nephrology"],
    rating: 4.8,
    description: "AIIMS is a premier medical institution known for its advanced research and exceptional patient care.",
    images: [
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    numberOfDoctors: 300,
    numberOfDepartments: 30,
  },
  {
    id: "5",
    name: "Manipal Hospital",
    city: "Bangalore",
    imageUrl: "https://images.unsplash.com/photo-1596541223130-5d31a73fb6c6?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    specialities: ["Urology", "Gynecology", "Ophthalmology"],
    rating: 4.3,
    description: "Manipal Hospital offers world-class healthcare services with a patient-centric approach.",
    images: [
      "https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=2952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    numberOfDoctors: 180,
    numberOfDepartments: 22,
  }
];

// Available specialities for dropdown
export const availableSpecialities = [
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Oncology",
  "Pediatrics",
  "Gastroenterology",
  "Dermatology",
  "Psychiatry",
  "Endocrinology",
  "Neurosurgery",
  "Cardiothoracic Surgery",
  "Nephrology",
  "Urology",
  "Gynecology",
  "Ophthalmology"
];

// Available cities for dropdown
export const availableCities = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Chennai",
  "Kolkata",
  "Hyderabad",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow"
];

// Get all hospitals
export const getAllHospitals = async (): Promise<Hospital[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockHospitals;
};

// Get hospitals by city
export const getHospitalsByCity = async (city: string): Promise<Hospital[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (!city) return mockHospitals;
  
  return mockHospitals.filter(
    hospital => hospital.city.toLowerCase() === city.toLowerCase()
  );
};

// Get hospital by ID
export const getHospitalById = async (id: string): Promise<Hospital | undefined> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return mockHospitals.find(hospital => hospital.id === id);
};

// Create hospital
export const createHospital = async (hospital: HospitalCreateInput): Promise<Hospital> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newHospital: Hospital = {
    id: Date.now().toString(),
    ...hospital
  };
  
  mockHospitals = [...mockHospitals, newHospital];
  return newHospital;
};

// Update hospital
export const updateHospital = async (id: string, updates: HospitalUpdateInput): Promise<Hospital | undefined> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const index = mockHospitals.findIndex(hospital => hospital.id === id);
  
  if (index === -1) return undefined;
  
  const updatedHospital = {
    ...mockHospitals[index],
    ...updates
  };
  
  mockHospitals[index] = updatedHospital;
  return updatedHospital;
};

// Add hospital details
export const addHospitalDetails = async (id: string, details: HospitalDetailsInput): Promise<Hospital | undefined> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const index = mockHospitals.findIndex(hospital => hospital.id === id);
  
  if (index === -1) return undefined;
  
  const updatedHospital = {
    ...mockHospitals[index],
    ...details
  };
  
  mockHospitals[index] = updatedHospital;
  return updatedHospital;
};

// Delete hospital
export const deleteHospital = async (id: string): Promise<boolean> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const initialLength = mockHospitals.length;
  mockHospitals = mockHospitals.filter(hospital => hospital.id !== id);
  
  return mockHospitals.length < initialLength;
};
