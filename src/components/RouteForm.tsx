import React, { useState } from "react";
import { X, Route, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RouteFormProps {
  onSubmit: (data: {
    name: string;
    startLocation: string;
    endLocation: string;
    time: string;
  }) => void;
  onClose: () => void;
}

const egyptianRoutes = [
  { name: "Cairo Express", start: "Cairo", end: "Alexandria" },
  { name: "Giza Luxury", start: "Giza", end: "Luxor" },
  { name: "Capital Route", start: "Cairo", end: "Aswan" },
  { name: "Port Connection", start: "Port Said", end: "Ismailia" },
  { name: "Red Sea Express", start: "Cairo", end: "Hurghada" },
  { name: "Nile Route", start: "Cairo", end: "Edfu" },
  { name: "Desert Highway", start: "Alexandria", end: "Marsa Matrouh" },
  { name: "Delta Connection", start: "Cairo", end: "Mansoura" },
  { name: "Southern Express", start: "Luxor", end: "Abu Simbel" },
  { name: "Sinai Route", start: "Suez", end: "Sharm El Sheikh" },
];

const egyptianCities = [
  "Cairo",
  "Alexandria",
  "Giza",
  "Luxor",
  "Aswan",
  "Port Said",
  "Ismailia",
  "Hurghada",
  "Edfu",
  "Marsa Matrouh",
  "Mansoura",
  "Abu Simbel",
  "Suez",
  "Sharm El Sheikh",
  "Zagazig",
  "Tanta",
  "Faiyum",
  "Beni Suef",
  "Minya",
  "Sohag",
  "Qena",
  "Kom Ombo",
];

export default function RouteForm({ onSubmit, onClose }: RouteFormProps) {
  const [routeName, setRouteName] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [time, setTime] = useState("");
  const [_usePreset, setUsePreset] = useState(false); // Corrected: Renamed usePreset to _usePreset to fix unused variable warning
  const handlePresetSelect = (preset: (typeof egyptianRoutes)[0]) => {
    setRouteName(preset.name);
    setStartLocation(preset.start);
    setEndLocation(preset.end);
    setUsePreset(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !routeName.trim() ||
      !startLocation.trim() ||
      !endLocation.trim() ||
      !time.trim()
    )
      return;

    onSubmit({
      name: routeName.trim(),
      startLocation: startLocation.trim(),
      endLocation: endLocation.trim(),
      time: time.trim(),
    });

    setRouteName("");
    setStartLocation("");
    setEndLocation("");
    setTime("");
    setUsePreset(false);
  };
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 modal-backdrop flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl p-6 w-full max-w-lg shadow-elegant modal-content relative">
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
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full gradient-secondary mb-4">
              <Route className="h-6 w-6 text-secondary-foreground" />
            </div>
            <h2 className="text-2xl font-bold">Add New Route</h2>
            <p className="text-muted-foreground">
              Create a new route for scheduling
            </p>
          </div>

          {/* Preset Routes */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Quick Setup - Egyptian Routes
            </Label>
            <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
              {egyptianRoutes.map((preset, index) => (
                <Button
                  key={index}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handlePresetSelect(preset)}
                  className="text-xs p-2 h-auto hover:border-secondary/50 hover:bg-secondary/10 transition-smooth"
                >
                  <div className="text-left">
                    <div className="font-medium">{preset.name}</div>
                    <div className="text-muted-foreground">
                      {preset.start} → {preset.end}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Route Name */}
            <div className="space-y-2">
              <Label htmlFor="routeName" className="text-sm font-medium">
                Route Name
              </Label>
              <Input
                id="routeName"
                type="text"
                placeholder="Enter route name"
                value={routeName}
                onChange={(e) => setRouteName(e.target.value)}
                className="bg-background border-border/50 focus:border-secondary/50 transition-smooth"
                required
              />
            </div>

            {/* Locations */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="startLocation"
                  className="text-sm font-medium flex items-center gap-1"
                >
                  <MapPin className="h-3 w-3 text-success" />
                  Start Location
                </Label>
                <Select value={startLocation} onValueChange={setStartLocation}>
                  <SelectTrigger className="bg-background border-border/50 focus:border-secondary/50">
                    <SelectValue placeholder="Select start" />
                  </SelectTrigger>
                  <SelectContent>
                    {egyptianCities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="endLocation"
                  className="text-sm font-medium flex items-center gap-1"
                >
                  <MapPin className="h-3 w-3 text-danger" />
                  End Location
                </Label>
                <Select value={endLocation} onValueChange={setEndLocation}>
                  <SelectTrigger className="bg-background border-border/50 focus:border-secondary/50">
                    <SelectValue placeholder="Select end" />
                  </SelectTrigger>
                  <SelectContent>
                    {egyptianCities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Time */}
            <div className="space-y-2">
              <Label htmlFor="time" className="text-sm font-medium">
                Departure Time
              </Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="bg-background border-border/50 focus:border-secondary/50 transition-smooth"
                required
              />
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
                className="flex-1 gradient-secondary btn-ripple hover-elevate shadow-secondary"
                disabled={
                  !routeName.trim() ||
                  !startLocation.trim() ||
                  !endLocation.trim() ||
                  !time.trim()
                }
              >
                Add Route
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
