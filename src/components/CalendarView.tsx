import { useState } from "react";
import { X, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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

interface CalendarViewProps {
  drivers: Driver[];
  routes: Route[];
  onClose: () => void;
}

export default function CalendarView({
  drivers,
  routes,
  onClose,
}: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"week" | "month">("week");

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const getDaysInWeek = (date: Date) => {
    const start = new Date(date);
    start.setDate(date.getDate() - date.getDay());
    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      return day;
    });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const lastDay = new Date(year, month + 1, 0).getDate();
    return Array.from(
      { length: lastDay },
      (_, i) => new Date(year, month, i + 1)
    );
  };

  const navigateCalendar = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    if (viewMode === "week") {
      newDate.setDate(currentDate.getDate() + (direction === "next" ? 7 : -7));
    } else {
      newDate.setMonth(
        currentDate.getMonth() + (direction === "next" ? 1 : -1)
      );
    }
    setCurrentDate(newDate);
  };

  const getRoutesForDay = (date: Date) =>
    routes.filter((route) => route.assignedDriverId).slice(0, 3);

  const renderWeekView = () => {
    const days = getDaysInWeek(currentDate);
    return (
      <div className="grid grid-cols-7 gap-4">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
          (dayName, index) => (
            <div key={dayName} className="text-center">
              <div className="text-sm font-medium text-muted-foreground mb-2">
                {dayName}
              </div>
              <div className="space-y-2">
                <div className="text-lg font-semibold">
                  {days[index].getDate()}
                </div>
                <div className="space-y-1">
                  {getRoutesForDay(days[index]).map((route) => {
                    const driver = drivers.find(
                      (d) => d.id === route.assignedDriverId
                    );
                    return (
                      <div
                        key={route.id}
                        className="bg-primary/10 rounded p-2 text-xs"
                      >
                        <div className="font-medium">{route.time}</div>
                        <div className="text-muted-foreground">
                          {route.name}
                        </div>
                        {driver && (
                          <div className="flex items-center gap-1 mt-1">
                            <Avatar className="h-4 w-4">
                              <AvatarImage src={driver.photo} />
                              <AvatarFallback className="text-xs">
                                {driver.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="truncate">{driver.name}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    );
  };

  const renderMonthView = () => {
    const days = getDaysInMonth(currentDate);
    return (
      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((dayName) => (
          <div
            key={dayName}
            className="text-center text-sm font-medium text-muted-foreground p-2"
          >
            {dayName}
          </div>
        ))}
        {days.map((day) => {
          const routesForDay = getRoutesForDay(day);
          return (
            <div
              key={day.toISOString()}
              className="min-h-24 p-2 border border-border/30 rounded-lg hover:border-primary/30 transition-smooth"
            >
              <div className="text-sm font-medium mb-1">{day.getDate()}</div>
              <div className="space-y-1">
                {routesForDay.slice(0, 2).map((route) => (
                  <div
                    key={route.id}
                    className="bg-primary/10 rounded p-1 text-xs"
                  >
                    <div className="font-medium">{route.time}</div>
                  </div>
                ))}
                {routesForDay.length > 2 && (
                  <div className="text-xs text-muted-foreground">
                    +{routesForDay.length - 2} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 modal-backdrop flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto shadow-elegant modal-content relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute top-4 right-4 hover:bg-destructive/10 hover:text-destructive z-10"
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="space-y-6">
          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateCalendar("prev")}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h3 className="text-xl font-semibold">
                {formatDate(currentDate)}
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateCalendar("next")}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "week" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("week")}
              >
                Week
              </Button>
              <Button
                variant={viewMode === "month" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("month")}
              >
                Month
              </Button>
            </div>
          </div>

          <div className="bg-background/50 rounded-lg p-4 border border-border/30">
            {viewMode === "week" ? renderWeekView() : renderMonthView()}
          </div>
        </div>
      </div>
    </div>
  );
}
