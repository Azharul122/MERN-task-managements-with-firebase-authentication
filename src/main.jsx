import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from "./Components/ErrorBoundary";

import Home from "./Components/Pages/Home";
import TaskHome from "./Components/TaskHome";
import TaskInput from "./Components/Tasks/TaskInput";
import EditTasks from "./Components/Tasks/EditTasks";
import AuthProvider from "./Components/Providers/AuthProvider";
import Login from "./Components/Pages/Login";
import Register from "./Components/Pages/Register";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    children: [
      {
        path: "/",
        element: <TaskHome></TaskHome>,
      },
      {
        path: "/create-task",
        element: (
          <PrivateRoute>
            <TaskInput></TaskInput>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/edit-task/:id",
        element: (
          <PrivateRoute>
            <EditTasks></EditTasks>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
