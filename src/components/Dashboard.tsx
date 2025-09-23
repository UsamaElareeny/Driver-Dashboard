import { Button } from "@/components/ui/button";
import { Plus, Route, Calendar, Search, Filter, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useState } from "react";
import RouteCard from "./RouteCard";
import DriverCard from "./DriverCard";
import DriverForm from "./DriverForm";
import RouteForm from "./RouteForm";
import CalendarView from "./CalendarView";
import AssignmentModal from "./AssignmentModal";
import DriverFilterModal from "./DriverFilterModal";

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

const initialDrivers: Driver[] = [
  { id: "1", name: "Ahmed Hassan", availability: "Available" },
  {
    id: "2",
    name: "Youssef Mohamed",
    availability: "Assigned",
    assignedRoute: "1",
  },
  { id: "3", name: "Omar Ali", availability: "Available" },
  { id: "4", name: "Mahmoud Ibrahim", availability: "Unavailable" },
];

const initialRoutes: Route[] = [
  {
    id: "1",
    name: "Cairo Express",
    startLocation: "Cairo",
    endLocation: "Alexandria",
    time: "08:00",
    assignedDriverId: "2",
  },
  {
    id: "2",
    name: "Giza Luxury",
    startLocation: "Giza",
    endLocation: "Luxor",
    time: "10:30",
  },
  {
    id: "3",
    name: "Capital Route",
    startLocation: "Cairo",
    endLocation: "Aswan",
    time: "14:00",
  },
  {
    id: "4",
    name: "Port Connection",
    startLocation: "Port Said",
    endLocation: "Ismailia",
    time: "16:45",
  },
];

function Dashboard() {
  const [drivers, setDrivers] = useState<Driver[]>(initialDrivers);
  const [routes, setRoutes] = useState<Route[]>(initialRoutes);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "All" | "Assigned" | "Unassigned"
  >("All");
  const [activeModal, setActiveModal] = useState<
    "driver" | "route" | "calendar" | "assignment" | "driverFilter" | null
  >(null);
  const [selectedRouteForAssignment, setSelectedRouteForAssignment] =
    useState<Route | null>(null);
  const [driverFilters, setDriverFilters] = useState<{
    availability: string[];
    searchTerm: string;
  }>({ availability: [], searchTerm: "" });

  const filteredDrivers = drivers.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.name.toLowerCase().includes(driverFilters.searchTerm.toLowerCase());

    const matchesAvailability =
      driverFilters.availability.length === 0 ||
      driverFilters.availability.includes(d.availability);

    return matchesSearch && matchesAvailability;
  });

  const filteredRoutes = routes.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.startLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.endLocation.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterStatus === "All") return matchesSearch;
    if (filterStatus === "Assigned") return matchesSearch && r.assignedDriverId;
    if (filterStatus === "Unassigned")
      return matchesSearch && !r.assignedDriverId;
    return matchesSearch;
  });
  const getDriverById = (id: string) => drivers.find((d) => d.id == id);

  const handleAddDriver = (driverData: Omit<Driver, "id">) => {
    const newDriver: Driver = {
      ...driverData,
      id: (drivers.length + 1).toString(),
    };
    setDrivers([...drivers, newDriver]);
    setActiveModal(null);
  };
  const handleAddRoute = (routeData: Omit<Route, "id">) => {
    const newRoute: Route = {
      ...routeData,
      id: (routes.length + 1).toString(),
    };
    setRoutes([...routes, newRoute]);
    setActiveModal(null);
  };
  const handleAssignDriver = (routeId: string, driverId: string) => {
    setRoutes(
      routes.map((r) =>
        r.id === routeId ? { ...r, assignedDriverId: driverId } : r
      )
    );
    setDrivers(
      drivers.map((d) =>
        d.id == driverId
          ? { ...d, availability: "Assigned", assignedRoute: routeId }
          : d
      )
    );
  };

  const handleUnassignDriver = (routeId: string) => {
    const route = routes.find((r) => r.id == routeId);
    if (route?.assignedDriverId) {
      setRoutes(
        routes.map((r) =>
          r.id === routeId ? { ...r, assignedDriverId: undefined } : r
        )
      );
      setDrivers(
        drivers.map((d) =>
          d.id === route.assignedDriverId
            ? { ...d, availability: "Available", assignedRoute: undefined }
            : d
        )
      );
    }
  };
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold gradient-primary bg-clip-text text-transparent">
              Driver Dashboard
            </h1>
            <p className="text-muted-foreground text-lg">
              Manage drivers and routes with beautiful, modern interface
            </p>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            onClick={() => setActiveModal("driver")}
            className="gradient-primary btn-ripple hover-elevate shadow-primary"
            variant="default"
            size="lg"
          >
            <Plus className="mr-2 h-5 w-5"></Plus>
            Add Driver
          </Button>

          <Button
            className="gradient-secondary btn-ripple hover-elevate shadow-secondary"
            onClick={() => setActiveModal("route")}
            variant="secondary"
            size="lg"
          >
            <Route className="mr-2 h-5 w-5"></Route>
            Add Route
          </Button>

          <Button
            onClick={() => setActiveModal("calendar")}
            variant="outline"
            size="lg"
            className="hover-elevate transition-smooth border-primary/20 hover:border-primary/40"
          >
            <Calendar className="mr-2 h-5 w-5"></Calendar>
            Calendar View
          </Button>
        </div>
        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search drives and routes..."
              className="pl-10 bg-card border-border/50 focus:border-primary/50 transition-smooth"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterStatus === "All" ? "default" : "outline"}
              className="btn-ripple"
              onClick={() => setFilterStatus("All")}
            >
              All
            </Button>
            <Button
              variant={filterStatus === "Assigned" ? "default" : "outline"}
              className="btn-ripple"
              onClick={() => setFilterStatus("Assigned")}
            >
              Assigned
            </Button>
            <Button
              variant={filterStatus === "Unassigned" ? "default" : "outline"}
              className="btn-ripple"
              onClick={() => setFilterStatus("Unassigned")}
            >
              Unassigned
            </Button>
          </div>
        </div>
        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Routes */}
          <Card className="gradient-card hover-elevate shadow-elegant border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Route className="h-6 w-6 text-primary" />
                Routes ({filteredRoutes.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredRoutes.map((r) => (
                <RouteCard
                  key={r.id}
                  route={r}
                  getDriverById={getDriverById}
                  handleUnassignDriver={handleUnassignDriver}
                  setSelectedRouteForAssignment={setSelectedRouteForAssignment}
                  setActiveModal={setActiveModal}
                />
              ))}
            </CardContent>
          </Card>
          {/* Drivers */}
          <Card className="gradient-card hover-elevate shadow-elegant border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-xl">
                <div className="flex items-center gap-2">
                  <Users className="h-6 w-6 text-secondary" />
                  Drivers ({filteredDrivers.length})
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveModal("driverFilter")}
                  className="hover:border-secondary/50 btn-ripple"
                >
                  <Filter className="h-4 w-4 mr-1" />
                  Filter
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredDrivers.map((driver) => (
                <DriverCard key={driver.id} driver={driver} routes={routes} />
              ))}
            </CardContent>
          </Card>
        </div>
        {/* Modals */}
        {activeModal === "driver" && (
          <DriverForm
            onSubmit={handleAddDriver}
            onClose={() => setActiveModal(null)}
          />
        )}
        {activeModal === "route" && (
          <RouteForm
            onSubmit={handleAddRoute}
            onClose={() => setActiveModal(null)}
          />
        )}
        {activeModal === "calendar" && (
          <CalendarView
            drivers={drivers}
            routes={routes}
            onClose={() => setActiveModal(null)}
          />
        )}
        {activeModal === "assignment" && selectedRouteForAssignment && (
          <AssignmentModal
            route={selectedRouteForAssignment}
            availableDrivers={drivers.filter(
              (d) => d.availability === "Available"
            )}
            onAssign={(driverId) => {
              if (selectedRouteForAssignment.assignedDriverId) {
                handleUnassignDriver(selectedRouteForAssignment.id);
              }
              handleAssignDriver(selectedRouteForAssignment.id, driverId);
              setActiveModal(null);
              setSelectedRouteForAssignment(null);
            }}
            onClose={() => {
              setActiveModal(null);
              setSelectedRouteForAssignment(null);
            }}
          />
        )}
        {activeModal === "driverFilter" && (
          <DriverFilterModal
            currentFilters={driverFilters}
            onApplyFilters={setDriverFilters}
            onClose={() => setActiveModal(null)}
          />
        )}
      </div>
    </div>
  );
}
export default Dashboard;
