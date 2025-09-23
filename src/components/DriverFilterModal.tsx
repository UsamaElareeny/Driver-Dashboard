import { useState } from "react";
import { X, Filter, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface DriverFilterModalProps {
  onClose: () => void;
  onApplyFilters: (filters: {
    availability: string[];
    searchTerm: string;
  }) => void;
  currentFilters: {
    availability: string[];
    searchTerm: string;
  };
}
export default function DriverFilterModal({
  onClose,
  onApplyFilters,
  currentFilters,
}: DriverFilterModalProps) {
  const [filters, setFilters] = useState(currentFilters);

  const availabilityOptions = [
    { value: "Available", label: "Available", color: "gradient-success" },
    { value: "Assigned", label: "Assigned", color: "gradient-warning" },
    { value: "Unavailable", label: "Unavailable", color: "gradient-danger" },
  ];

  const handleAvailabilityToggle = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      availability: prev.availability.includes(value)
        ? prev.availability.filter((a) => a !== value)
        : [...prev.availability, value],
    }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters = { availability: [], searchTerm: "" };
    setFilters(resetFilters);
    onApplyFilters(resetFilters);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 modal-backdrop flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl p-6 w-full max-w-md shadow-elegant modal-content relative">
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
              <Filter className="h-6 w-6 text-secondary-foreground" />
            </div>
            <h2 className="text-2xl font-bold">Filter Drivers</h2>
            <p className="text-muted-foreground">Customize your driver view</p>
          </div>

          {/* Search */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Search by Name</label>
            <input
              type="text"
              placeholder="Enter driver name..."
              value={filters.searchTerm}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, searchTerm: e.target.value }))
              }
              className="w-full px-3 py-2 rounded-lg border border-border/50 bg-background focus:border-primary/50 focus:outline-none transition-smooth"
            />
          </div>

          {/* Availability Filter */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Availability Status</label>
            <div className="space-y-2">
              {availabilityOptions.map((option) => {
                const isSelected = filters.availability.includes(option.value);
                return (
                  <div
                    key={option.value}
                    onClick={() => handleAvailabilityToggle(option.value)}
                    className={`p-3 rounded-lg border cursor-pointer transition-smooth hover-elevate ${
                      isSelected
                        ? "border-primary bg-primary/10 shadow-primary"
                        : "border-border/30 hover:border-primary/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge className={option.color}>{option.label}</Badge>
                      </div>
                      {isSelected && <Check className="h-4 w-4 text-primary" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Filters Summary */}
          {(filters.availability.length > 0 || filters.searchTerm) && (
            <div className="p-3 rounded-lg bg-background-secondary border border-border/30">
              <div className="text-sm font-medium mb-2">Active Filters:</div>
              <div className="flex flex-wrap gap-2">
                {filters.searchTerm && (
                  <Badge variant="outline" className="text-xs">
                    Name: "{filters.searchTerm}"
                  </Badge>
                )}
                {filters.availability.map((status) => (
                  <Badge key={status} variant="outline" className="text-xs">
                    {status}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="flex-1 hover:border-destructive/50 hover:text-destructive"
            >
              Reset All
            </Button>
            <Button
              type="button"
              onClick={handleApply}
              className="flex-1 gradient-primary btn-ripple hover-elevate shadow-primary"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
