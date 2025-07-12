import { createBrowserRouter } from "react-router"; 
import RootLayout from "../Layouts/RootLayout";
import AuthLayout from "../Layouts/AuthLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import AllDonations from "../Pages/AllDonations";
import Dashboard from "../Pages/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import Payment from "../Pages/Dashboard/Payments/Payment";
import DonationDetails from "../Pages/SubPage/DonationDetails";
import MyDonations from "../Pages/SubPage/MyDonations";
import EditDonation from "../Pages/SubPage/EditDonation";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "donations",
        element: (
          <PrivateRoute>
            <AllDonations />
          </PrivateRoute>
        ),
      },
      {
        path: "donations/:id",
        element: <DonationDetails />,
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
        children: [
          {
            path: "my-donations",
            element: <MyDonations />,
          },
          {
            path: "edit-donation/:id",
            element: <EditDonation />,
          },
          {
            path: "payment/:id",
            element: <Payment />,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);