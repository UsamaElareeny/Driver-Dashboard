import { useState, useRef } from "react";
import { X, Upload, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImageCropper } from "./ImageCropper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface DriverFormProps {
  onSubmit: (data: {
    name: string;
    availability: "Available" | "Unavailable";
    photo?: string;
  }) => void;
  onClose: () => void;
}

export default function DriverForm({ onSubmit, onClose }: DriverFormProps) {
  const [name, setName] = useState("");
  const [availability, setAvailability] = useState<"Available" | "Unavailable">(
    "Available"
  );
  const [photo, setPhoto] = useState("");
  const [showCropper, setShowCropper] = useState(false);
  const [imageToEdit, setImageToEdit] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImageToEdit(result);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCroppedImage = (croppedImage: string) => {
    setPhoto(croppedImage);
    setShowCropper(false);
    setImageToEdit("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSubmit({
      name: name.trim(),
      availability,
      photo: photo || undefined,
    });

    // reset form
    setName("");
    setAvailability("Available");
    setPhoto("");
    onClose(); // ✅ close modal after adding driver
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-card rounded-2xl p-6 w-full max-w-md shadow-elegant relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-4 right-4 hover:bg-destructive/10 hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </Button>

          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full gradient-primary mb-4">
                <User className="h-6 w-6 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold">Add New Driver</h2>
              <p className="text-muted-foreground">
                Create a new driver profile
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Photo Upload */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-primary/20">
                    <AvatarImage src={photo} />
                    <AvatarFallback className="gradient-card text-2xl">
                      {name
                        ? name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .substring(0, 2)
                        : "?"}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 gradient-secondary"
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <p className="text-sm text-muted-foreground text-center">
                  Click the upload button to add a profile photo
                </p>
              </div>

              {/* Driver Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Driver Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter driver name (e.g., Ahmed Hassan)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-background border-border/50 focus:border-primary/50"
                  required
                />
              </div>

              {/* Availability */}
              <div className="space-y-2">
                <Label htmlFor="availability" className="text-sm font-medium">
                  Availability Status
                </Label>
                <Select
                  value={availability}
                  onValueChange={(value: "Available" | "Unavailable") =>
                    setAvailability(value)
                  }
                >
                  <SelectTrigger className="bg-background border-border/50 focus:border-primary/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Unavailable">Unavailable</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 hover:border-destructive/50 hover:text-destructive"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 gradient-primary btn-ripple"
                  disabled={!name.trim()}
                >
                  Add Driver
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {showCropper && (
        <ImageCropper
          imageSrc={imageToEdit}
          onCropComplete={handleCroppedImage}
          onClose={() => {
            setShowCropper(false);
            setImageToEdit("");
          }}
        />
      )}
    </>
  );
}
