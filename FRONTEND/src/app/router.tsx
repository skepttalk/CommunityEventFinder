import { createBrowserRouter } from "react-router-dom"

import Landing from "../pages/Landing"
import Login from "../pages/Auth/Login"
import Register from "../pages/Auth/Register"

import EventList from "../pages/Events/EventList"
import EventDetails from "../pages/Events/EventDetails"

import Dashboard from "../pages/Dashboard/Dashboard"
import CalendarView from "../pages/Calendar/CalendarView"

import ProtectedRoute from "../components/layout/ProtectedRoute"
import MainLayout from "../components/layout/MainLayout"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/register",
    element: <Register />,
  },

  {
    element: <MainLayout />,
    children: [
      {
        path: "/events",
        element: <EventList />,
      },
      {
        path: "/events/:id",
        element: <EventDetails />,
      },
      {
        path: "/calendar",
        element: (
          <ProtectedRoute>
            <CalendarView />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },

  {
    path: "*",
    element: (
      <div className="flex items-center justify-center h-screen text-xl">
        404 Page Not Found
      </div>
    ),
  },
])