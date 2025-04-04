
export interface Hospital {
  id: string;
  name: string;
  city: string;
  imageUrl: string;
  specialities: string[];
  rating: number;
  description?: string;
  images?: string[];
  numberOfDoctors?: number;
  numberOfDepartments?: number;
}

export interface HospitalCreateInput {
  name: string;
  city: string;
  imageUrl: string;
  specialities: string[];
  rating: number;
}

export interface HospitalDetailsInput {
  description: string;
  images: string[];
  numberOfDoctors: number;
  numberOfDepartments: number;
}

export interface HospitalUpdateInput extends Partial<HospitalCreateInput>, Partial<HospitalDetailsInput> {}
