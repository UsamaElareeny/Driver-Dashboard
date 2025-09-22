export interface Driver {
  id: string;
  name: string;
  availability: "Available" | "Assigned" | "Unavailable";
  photo?: string;
  assignedRoute?: string;
}

export interface Route {
  id: string;
  name: string;
  startLocation: string;
  endLocation: string;
  time: string;
  assignedDriverId?: string;
}

// Mock data with Egyptian names and routes
export const initialDrivers: Driver[] = [
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

export const initialRoutes: Route[] = [
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
