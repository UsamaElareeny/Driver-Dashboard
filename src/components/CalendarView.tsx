import React, { useState } from "react";
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
}: CalendarViewProps): JSX.Element {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"week" | "month">("week");

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  const getDaysInWeek = (date: Date) => {
    const start = new Date(date);
    start.setDate(date.getDate() - date.getDay());

    const days: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    const days: Date[] = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
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

  const getDriversForDay = (date: Date) => {
    return drivers
      .filter((driver) => driver.availability === "Available")
      .slice(0, 2);
  };

  const getRoutesForDay = (date: Date) => {
    return routes.filter((route) => route.assignedDriverId).slice(0, 3);
  };

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
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full gradient-warning mb-4">
              <Calendar className="h-6 w-6 text-warning-foreground" />
            </div>
            <h2 className="text-2xl font-bold">Driver Schedule Calendar</h2>
            <p className="text-muted-foreground">
              View and manage driver availability
            </p>
          </div>

          {/* Calendar Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateCalendar("prev")}
                className="hover:border-primary/50"
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
                className="hover:border-primary/50"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex gap-2">
              <Button
                variant={viewMode === "week" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("week")}
                className="btn-ripple"
              >
                Week
              </Button>
              <Button
                variant={viewMode === "month" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("month")}
                className="btn-ripple"
              >
                Month
              </Button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="bg-background/50 rounded-lg p-4 border border-border/30">
            {viewMode === "week" ? renderWeekView() : renderMonthView()}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full gradient-success"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full gradient-warning"></div>
              <span>Assigned</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full gradient-danger"></div>
              <span>Unavailable</span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg bg-success/10 border border-success/20 hover:border-success/40 transition-smooth hover-elevate cursor-pointer group">
              <div className="text-2xl font-bold text-success group-hover:scale-110 transition-transform">
                {drivers.filter((d) => d.availability === "Available").length}
              </div>
              <div className="text-sm text-muted-foreground group-hover:text-success/80 transition-colors">
                Available Drivers
              </div>
              <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-success/70">
                Ready for assignment
              </div>
            </div>
            <div className="text-center p-4 rounded-lg bg-warning/10 border border-warning/20 hover:border-warning/40 transition-smooth hover-elevate cursor-pointer group">
              <div className="text-2xl font-bold text-warning group-hover:scale-110 transition-transform">
                {drivers.filter((d) => d.availability === "Assigned").length}
              </div>
              <div className="text-sm text-muted-foreground group-hover:text-warning/80 transition-colors">
                Assigned Drivers
              </div>
              <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-warning/70">
                Currently on routes
              </div>
            </div>
            <div className="text-center p-4 rounded-lg bg-primary/10 border border-primary/20 hover:border-primary/40 transition-smooth hover-elevate cursor-pointer group">
              <div className="text-2xl font-bold text-primary group-hover:scale-110 transition-transform">
                {routes.filter((r) => r.assignedDriverId).length}
              </div>
              <div className="text-sm text-muted-foreground group-hover:text-primary/80 transition-colors">
                Active Routes
              </div>
              <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-primary/70">
                Routes with drivers
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
