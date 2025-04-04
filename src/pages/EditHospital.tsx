
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useHospitals } from "@/context/HospitalContext";
import HospitalForm from "@/components/HospitalForm";
import { Hospital, HospitalUpdateInput } from "@/types/hospital";
import { ArrowLeft, Hospital as HospitalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const EditHospital: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getHospital, updateHospitalById } = useHospitals();
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        setLoading(true);
        if (id) {
          const data = await getHospital(id);
          if (data) {
            setHospital(data);
          } else {
            setError("Hospital not found");
          }
        }
      } catch (err) {
        setError("Failed to load hospital details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHospital();
  }, [id, getHospital]);

  const handleSubmit = async (data: HospitalUpdateInput) => {
    try {
      if (id) {
        const updatedHospital = await updateHospitalById(id, data);
        if (updatedHospital) {
          navigate(`/hospital/${id}`);
        }
      }
    } catch (error) {
      console.error("Failed to update hospital:", error);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4 pt-16">
        <div className="text-center">
          <HospitalIcon className="mx-auto h-12 w-12 animate-pulse text-primary/70" />
          <p className="mt-4 text-lg text-muted-foreground">Loading hospital details...</p>
        </div>
      </div>
    );
  }

  if (error || !hospital) {
    return (
      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 pt-16">
        <div className="w-full max-w-md rounded-lg border bg-background p-6 text-center shadow-sm">
          <HospitalIcon className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
          <h2 className="text-xl font-semibold">{error || "Hospital not found"}</h2>
          <p className="mt-2 text-muted-foreground">
            The hospital you're trying to edit might have been removed or doesn't exist.
          </p>
          <Button className="mt-6" onClick={() => navigate("/hospitals")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to hospitals
          </Button>
        </div>
      </div>
    );
  }

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
          Edit Hospital
        </h1>
        <p className="mt-2 text-muted-foreground">
          Update details for {hospital.name}
        </p>
      </div>

      <div className="mx-auto max-w-3xl rounded-lg border bg-background p-6 shadow-sm">
        <HospitalForm onSubmit={handleSubmit} initialData={hospital} isEditing={true} />
      </div>
    </div>
  );
};

export default EditHospital;
