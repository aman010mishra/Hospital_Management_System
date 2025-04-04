
import React from "react";
import { useNavigate } from "react-router-dom";
import { useHospitals } from "@/context/HospitalContext";
import HospitalForm from "@/components/HospitalForm";
import { HospitalCreateInput } from "@/types/hospital";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const CreateHospital: React.FC = () => {
  const navigate = useNavigate();
  const { addHospital } = useHospitals();

  const handleSubmit = async (data: HospitalCreateInput) => {
    try {
      const newHospital = await addHospital(data);
      if (newHospital) {
        navigate(`/hospital/${newHospital.id}`);
      }
    } catch (error) {
      console.error("Failed to create hospital:", error);
    }
  };

  return (
    <div className="page-transition container mx-auto min-h-screen px-4 py-20">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate(-1)}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Create New Hospital
        </h1>
        <p className="mt-2 text-muted-foreground">
          Add a new hospital to the database with all its details
        </p>
      </div>

      <div className="mx-auto max-w-3xl rounded-lg border bg-background p-6 shadow-sm">
        <HospitalForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default CreateHospital;
