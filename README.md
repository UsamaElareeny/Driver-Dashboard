# Driver Management Dashboard

A modern, dark-themed driver management dashboard built with React. This application provides comprehensive tools for managing drivers, routes, and assignments with an intuitive calendar interface.

## 🚀 Features

- **Driver Management**: Add, edit, and manage driver profiles with photo uploads and cropping
- **Route Planning**: Create and manage delivery routes with detailed information
- **Assignment System**: Assign drivers to routes with calendar integration
- **Calendar View**: Visual calendar interface for tracking assignments and schedules
- **Responsive Design**: Fully responsive interface that works on all devices
- **Filter System**: Advanced filtering options for drivers and routes

## 📦 Installation

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Setup

1. **Clone the repository**

   ```bash
   git clone <your-repository-url>
   cd fleet-management-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── AssignmentModal.tsx # Assignment creation modal
│   ├── CalendarView.tsx    # Calendar interface
│   ├── Dashboard.tsx       # Main dashboard component
│   ├── DriverForm.tsx      # Driver creation/editing form
│   ├── DriverFilterModal.tsx # Driver filtering interface
│   ├── ImageCropper.tsx    # Profile photo cropping
│   └── RouteForm.tsx       # Route creation/editing form
├── hooks/
│   ├── useTheme.ts         # Theme management hook
│   └── use-mobile.tsx      # Mobile detection hook
├── pages/
│   ├── Index.tsx           # Landing page
│   └── NotFound.tsx        # 404 error page
├── lib/
│   └── utils.ts            # Utility functions
├── assets/                 # Static assets and images
├── index.css              # Global styles and design tokens
└── main.tsx               # Application entry point
```
