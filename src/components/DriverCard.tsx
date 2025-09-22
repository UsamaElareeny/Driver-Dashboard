import { Badge } from "@/components/ui/badge";
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
interface DriverCardProps {
  driver: Driver;
  routes: Route[];
}

export default function DriverCard({ driver, routes }: DriverCardProps) {
  return (
    <div className="p-4 rounded-lg bg-background-secondary border border-border/30 hover:border-secondary/30 transition-smooth hover-elevate">
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
          <h3 className="font-semibold">{driver.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Badge
              variant={
                driver.availability === "Available"
                  ? "default"
                  : driver.availability === "Assigned"
                  ? "secondary"
                  : "destructive"
              }
              className={
                driver.availability === "Available"
                  ? "gradient-success"
                  : driver.availability === "Assigned"
                  ? "gradient-warning"
                  : "gradient-danger"
              }
            >
              {driver.availability}
            </Badge>
            {driver.assignedRoute && (
              <span className="text-xs text-muted-foreground">
                Route: {routes.find((r) => r.id === driver.assignedRoute)?.name}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
