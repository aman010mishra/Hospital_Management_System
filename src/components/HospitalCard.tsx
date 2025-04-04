
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Hospital, MapPin, Star, Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Hospital as HospitalType } from "@/types/hospital";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DeleteConfirmation from "./DeleteConfirmation";

interface HospitalCardProps {
  hospital: HospitalType;
  onDelete: (id: string) => void;
}

const HospitalCard: React.FC<HospitalCardProps> = ({ hospital, onDelete }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    onDelete(hospital.id);
    setShowDeleteModal(false);
  };

  return (
    <>
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-md">
        <div className="relative h-48 w-full overflow-hidden bg-muted">
          <img
            src={hospital.imageUrl}
            alt={hospital.name}
            className={cn(
              "h-full w-full object-cover transition-opacity duration-500",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Hospital className="h-8 w-8 animate-pulse text-muted-foreground" />
            </div>
          )}
        </div>

        <CardHeader className="p-4">
          <div className="flex justify-between">
            <CardTitle className="line-clamp-1 text-xl">{hospital.name}</CardTitle>
            <div className="flex items-center text-amber-500">
              <Star className="mr-1 h-4 w-4 fill-current" />
              <span>{hospital.rating.toFixed(1)}</span>
            </div>
          </div>
          <CardDescription className="flex items-center text-muted-foreground">
            <MapPin className="mr-1 h-3 w-3" />
            {hospital.city}
          </CardDescription>
        </CardHeader>

        <CardContent className="px-4 py-2">
          <div className="flex flex-wrap gap-2">
            {hospital.specialities.slice(0, 3).map((speciality) => (
              <Badge key={speciality} variant="secondary" className="text-xs">
                {speciality}
              </Badge>
            ))}
            {hospital.specialities.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{hospital.specialities.length - 3} more
              </Badge>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between p-4">
          <Button variant="outline" size="sm" asChild>
            <Link to={`/hospital/${hospital.id}`}>View Details</Link>
          </Button>
          <div className="flex space-x-2">
            <Button size="sm" variant="ghost" asChild>
              <Link to={`/edit/${hospital.id}`}>
                <Edit className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="sm" variant="ghost" onClick={handleDelete}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </CardFooter>
      </Card>

      <DeleteConfirmation
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete Hospital"
        description="Are you sure you want to delete this hospital? This action cannot be undone."
      />
    </>
  );
};

export default HospitalCard;
