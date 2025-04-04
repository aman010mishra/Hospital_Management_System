
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useHospitals } from "@/context/HospitalContext";
import { Hospital as HospitalIcon, MapPin, Star, Users, Building2, Edit, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import { motion } from "framer-motion";

const HospitalDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getHospital, removeHospital } = useHospitals();
  const [hospital, setHospital] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});

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

  const handleDelete = async () => {
    if (id) {
      const success = await removeHospital(id);
      if (success) {
        navigate("/hospitals");
      }
    }
  };

  const handleImageLoad = (index: number) => {
    setImagesLoaded(prev => ({ ...prev, [index]: true }));
  };

  // Prepare images array with cover image first followed by additional images
  const allImages = hospital
    ? [hospital.imageUrl, ...(hospital.images || [])]
    : [];

  const imageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
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
            The hospital you're looking for might have been removed or doesn't exist.
          </p>
          <Button asChild className="mt-6">
            <Link to="/hospitals">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to hospitals
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-transition container mx-auto min-h-screen px-4 pb-16 pt-20">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link to="/hospitals">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to hospitals
          </Link>
        </Button>

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {hospital.name}
          </h1>

          <div className="flex items-center space-x-2">
            <Button variant="outline" asChild>
              <Link to={`/edit/${hospital.id}`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>
            <Button
              variant="destructive"
              onClick={() => setShowDeleteModal(true)}
            >
              Delete
            </Button>
          </div>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground">
          <div className="flex items-center">
            <MapPin className="mr-1 h-4 w-4" />
            <span>{hospital.city}</span>
          </div>
          <div className="flex items-center text-amber-500">
            <Star className="mr-1 h-4 w-4 fill-current" />
            <span>{hospital.rating.toFixed(1)} rating</span>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-lg border bg-muted/30">
            <div className="relative aspect-video w-full overflow-hidden bg-muted">
              {allImages.length > 0 ? (
                <motion.img
                  key={activeImageIndex}
                  src={allImages[activeImageIndex]}
                  alt={`${hospital.name} - Image ${activeImageIndex + 1}`}
                  className="h-full w-full object-cover"
                  initial="hidden"
                  animate="visible"
                  variants={imageVariants}
                  onLoad={() => handleImageLoad(activeImageIndex)}
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <HospitalIcon className="h-16 w-16 text-muted-foreground/30" />
                </div>
              )}

              {!imagesLoaded[activeImageIndex] && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                </div>
              )}
            </div>

            {allImages.length > 1 && (
              <div className="scroll-hide overflow-x-auto p-4">
                <div className="flex space-x-2">
                  {allImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all ${
                        activeImageIndex === index
                          ? "border-primary"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold">About</h2>
            <Separator className="my-3" />
            <p className="text-muted-foreground">
              {hospital.description ||
                "No description available for this hospital."}
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Specialities</h2>
            <Separator className="my-3" />
            <div className="flex flex-wrap gap-2">
              {hospital.specialities.map((speciality: string) => (
                <Badge key={speciality} className="px-3 py-1 text-sm">
                  {speciality}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="glass rounded-lg border p-6">
            <h2 className="text-xl font-semibold">Hospital Information</h2>
            <Separator className="my-3" />

            <div className="space-y-4">
              <div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-2 h-4 w-4" />
                  Location
                </div>
                <div className="mt-1 font-medium">{hospital.city}</div>
              </div>

              <div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Star className="mr-2 h-4 w-4" />
                  Rating
                </div>
                <div className="mt-1 flex items-center">
                  <div className="font-medium">{hospital.rating.toFixed(1)}</div>
                  <div className="ml-2 flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(hospital.rating)
                            ? "fill-amber-500 text-amber-500"
                            : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="mr-2 h-4 w-4" />
                  Doctors
                </div>
                <div className="mt-1 font-medium">
                  {hospital.numberOfDoctors !== undefined
                    ? hospital.numberOfDoctors
                    : "Not specified"}
                </div>
              </div>

              <div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Building2 className="mr-2 h-4 w-4" />
                  Departments
                </div>
                <div className="mt-1 font-medium">
                  {hospital.numberOfDepartments !== undefined
                    ? hospital.numberOfDepartments
                    : "Not specified"}
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="flex flex-col space-y-3">
              <Button className="w-full">Contact Hospital</Button>
              <Button variant="outline" className="w-full">Book Appointment</Button>
            </div>
          </div>
        </div>
      </div>

      <DeleteConfirmation
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Hospital"
        description="Are you sure you want to delete this hospital? This action cannot be undone."
      />
    </div>
  );
};

export default HospitalDetails;
