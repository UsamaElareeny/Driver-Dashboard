import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserX } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

interface RouteCardProps {
  route: Route;
  getDriverById: (id: string) => Driver | undefined;
  handleUnassignDriver: (routeId: string) => void;
  setSelectedRouteForAssignment: (route: Route) => void;
  setActiveModal: (modal: string | null) => void;
}

export default function RouteCard({
  route,
  getDriverById,
  handleUnassignDriver,
  setSelectedRouteForAssignment,
  setActiveModal,
}: RouteCardProps) {
  const assignedDriver = route.assignedDriverId
    ? getDriverById(route.assignedDriverId)
    : null;

  return (
    <div
      key={route.id}
      className="p-4 rounded-lg bg-background-secondary border border-border/30 hover:border-primary/30 transition-smooth hover-elevate"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-lg">{route.name}</h3>
        <Badge
          variant={assignedDriver ? "default" : "destructive"}
          className={assignedDriver ? "gradient-success" : "gradient-danger"}
        >
          {assignedDriver ? "Assigned" : "Unassigned"}
        </Badge>
      </div>

      <div className="space-y-2 text-sm text-muted-foreground">
        <p>
          {route.startLocation} → {route.endLocation}
        </p>
        <p>Departure: {route.time}</p>
      </div>

      {assignedDriver ? (
        <div className="mt-3 space-y-2">
          <div className="flex items-center gap-3 p-2 rounded-md bg-success/10">
            <Avatar className="h-8 w-8 avatar-hover">
              <AvatarImage src={assignedDriver.photo} />
              <AvatarFallback className="gradient-primary text-primary-foreground text-xs">
                {assignedDriver.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium flex-1">
              {assignedDriver.name}
            </span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleUnassignDriver(route.id)}
              className="flex-1 hover:border-destructive/50 hover:text-destructive btn-ripple"
            >
              <UserX className="h-3 w-3 mr-1" />
              Unassign
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedRouteForAssignment(route);
                setActiveModal("assignment");
              }}
              className="flex-1 hover:border-primary/50 btn-ripple"
            >
              Reassign
            </Button>
          </div>
        </div>
      ) : (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setSelectedRouteForAssignment(route);
            setActiveModal("assignment");
          }}
          className="mt-3 w-full btn-ripple hover:border-primary/50"
        >
          Assign Driver
        </Button>
      )}
    </div>
  );
}
