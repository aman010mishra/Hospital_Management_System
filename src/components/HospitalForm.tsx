import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { HospitalCreateInput, HospitalUpdateInput, Hospital } from "@/types/hospital";
import { availableSpecialities, availableCities } from "@/services/hospitalService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  city: z.string().min(1, "City is required"),
  imageUrl: z.string().url("Must be a valid URL"),
  specialities: z.array(z.string()).min(1, "At least one speciality is required"),
  rating: z.coerce.number().min(0, "Minimum rating is 0").max(5, "Maximum rating is 5"),
  description: z.string().optional(),
  images: z.array(z.string().url("Must be a valid URL")).optional(),
  numberOfDoctors: z.coerce.number().min(0, "Cannot be negative").optional(),
  numberOfDepartments: z.coerce.number().min(0, "Cannot be negative").optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface HospitalFormProps {
  onSubmit: (data: HospitalCreateInput | HospitalUpdateInput) => void;
  initialData?: Hospital;
  isEditing?: boolean;
}

const HospitalForm: React.FC<HospitalFormProps> = ({
  onSubmit,
  initialData,
  isEditing = false,
}) => {
  const [additionalImages, setAdditionalImages] = useState<string[]>(
    initialData?.images || []
  );
  const [newImageUrl, setNewImageUrl] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      city: initialData?.city || "",
      imageUrl: initialData?.imageUrl || "",
      specialities: initialData?.specialities || [],
      rating: initialData?.rating || 0,
      description: initialData?.description || "",
      numberOfDoctors: initialData?.numberOfDoctors || 0,
      numberOfDepartments: initialData?.numberOfDepartments || 0,
      images: initialData?.images || [],
    },
  });

  const { control, handleSubmit, formState, setValue, watch } = form;
  const selectedSpecialities = watch("specialities");

  const handleSpecialityToggle = (speciality: string) => {
    const currentSpecialities = [...selectedSpecialities];
    const specialityIndex = currentSpecialities.indexOf(speciality);
    
    if (specialityIndex > -1) {
      currentSpecialities.splice(specialityIndex, 1);
    } else {
      currentSpecialities.push(speciality);
    }
    
    setValue("specialities", currentSpecialities, { shouldValidate: true });
  };

  const removeSpeciality = (speciality: string) => {
    setValue(
      "specialities",
      selectedSpecialities.filter((s) => s !== speciality),
      { shouldValidate: true }
    );
  };

  const addImage = () => {
    if (newImageUrl && newImageUrl.trim() !== "") {
      setAdditionalImages((prev) => [...prev, newImageUrl]);
      setNewImageUrl("");
    }
  };

  const removeImage = (index: number) => {
    setAdditionalImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onFormSubmit = (data: FormValues) => {
    const formData = {
      ...data,
      images: additionalImages,
    };
    onSubmit(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hospital Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter hospital name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a city" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {availableCities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.jpg" {...field} />
              </FormControl>
              <FormDescription>Provide a URL for the hospital's main image</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="specialities"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Specialities</FormLabel>
              <FormControl>
                <div className="border border-input rounded-md p-4">
                  <div className="mb-2 text-sm text-muted-foreground">
                    Select at least one speciality
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {availableSpecialities.map((speciality) => (
                      <div key={speciality} className="flex items-center space-x-2">
                        <Checkbox
                          id={`speciality-${speciality}`}
                          checked={field.value.includes(speciality)}
                          onCheckedChange={() => handleSpecialityToggle(speciality)}
                        />
                        <label
                          htmlFor={`speciality-${speciality}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {speciality}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </FormControl>
              {field.value.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {field.value.map((speciality) => (
                    <Badge key={speciality} variant="secondary" className="gap-1">
                      {speciality}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeSpeciality(speciality)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating (0-5)</FormLabel>
              <FormControl>
                <Input type="number" min="0" max="5" step="0.1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {(isEditing || initialData) && (
          <>
            <Separator className="my-6" />
            
            <h3 className="text-lg font-medium">Additional Details</h3>
            
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter hospital description"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={control}
                name="numberOfDoctors"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Doctors</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="numberOfDepartments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Departments</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <FormLabel>Additional Images</FormLabel>
              <div className="flex space-x-2">
                <Input
                  placeholder="Image URL"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="flex-1"
                />
                <Button type="button" onClick={addImage}>
                  Add
                </Button>
              </div>

              {additionalImages.length > 0 && (
                <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {additionalImages.map((img, index) => (
                    <div
                      key={index}
                      className="relative overflow-hidden rounded-md border"
                    >
                      <img
                        src={img}
                        alt={`Hospital ${index + 1}`}
                        className="h-40 w-full object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute right-2 top-2"
                        onClick={() => removeImage(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        <div className="mt-6 flex justify-end">
          <Button
            type="submit"
            className="px-6"
            disabled={formState.isSubmitting}
          >
            {formState.isSubmitting
              ? "Submitting..."
              : isEditing
              ? "Update Hospital"
              : "Create Hospital"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default HospitalForm;
