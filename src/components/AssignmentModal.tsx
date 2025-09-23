import { useState } from "react";
import { X, UserCheck, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Driver {
  id: string;
  name: string;
  availability: "Available" | "Assigned" | "Unavailable";
  photo?: string;
  assignedRoute?: string;
}

interface Route {
  id: string;
  name: string;
  startLocation: string;
  endLocation: string;
  time: string;
  assignedDriverId?: string;
}

interface AssignmentModalProps {
  route: Route;
  availableDrivers: Driver[];
  onAssign: (driverId: string) => void;
  onClose: () => void;
}

export default function AssignmentModal({
  route,
  availableDrivers,
  onAssign,
  onClose,
}): AssignmentModalProps {
  const [selectedDriverId, setSelectedDriverId] = useState<string>("");
  const [isAssigning, setIsAssigning] = useState(false);

  const handleAssign = async () => {
    if (!selectedDriverId) return;

    setIsAssigning(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onAssign(selectedDriverId);
    setIsAssigning(false);
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
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full gradient-warning mb-4">
              <UserCheck className="h-6 w-6 text-warning-foreground" />
            </div>
            <h2 className="text-2xl font-bold">Assign Driver</h2>
            <p className="text-muted-foreground">
              Select a driver for this route
            </p>
          </div>

          {/* Route Information */}
          <div className="bg-background/50 rounded-lg p-4 border border-border/30">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              {route.name}
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-success" />
                <span className="text-muted-foreground">From:</span>
                <span className="font-medium">{route.startLocation}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-danger" />
                <span className="text-muted-foreground">To:</span>
                <span className="font-medium">{route.endLocation}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-warning" />
                <span className="text-muted-foreground">Departure:</span>
                <span className="font-medium">{route.time}</span>
              </div>
            </div>
          </div>

          {/* Available Drivers */}
          <div className="space-y-4">
            <h3 className="font-semibold">
              Available Drivers ({availableDrivers.length})
            </h3>

            {availableDrivers.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-muted-foreground mb-2">
                  No available drivers
                </div>
                <p className="text-sm text-muted-foreground">
                  All drivers are currently assigned or unavailable
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {availableDrivers.map((driver) => (
                  <div
                    key={driver.id}
                    onClick={() => setSelectedDriverId(driver.id)}
                    className={`p-4 rounded-lg border transition-smooth cursor-pointer hover-elevate ${
                      selectedDriverId === driver.id
                        ? "border-primary bg-primary/10 shadow-primary"
                        : "border-border/30 hover:border-primary/30"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 avatar-hover">
                        <AvatarImage src={driver.photo} />
                        <AvatarFallback className="gradient-secondary text-secondary-foreground">
                          {driver.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-semibold">{driver.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className="gradient-success">
                            {driver.availability}
                          </Badge>
                        </div>
                      </div>
                      {selectedDriverId === driver.id && (
                        <div className="text-primary">
                          <UserCheck className="h-5 w-5" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
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
              type="button"
              onClick={handleAssign}
              disabled={
                !selectedDriverId ||
                isAssigning ||
                availableDrivers.length === 0
              }
              className="flex-1 gradient-success btn-ripple hover-elevate shadow-success"
            >
              {isAssigning ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-success-foreground/30 border-t-success-foreground rounded-full animate-spin"></div>
                  Assigning...
                </div>
              ) : (
                <>
                  <UserCheck className="h-4 w-4 mr-2" />
                  Assign Driver
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
