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
import DashboardAnalytics from "../Pages/Dashboard/DashboardAnalytics";
import ViewRequests from "../Pages/SubPage/ViewRequests";
import MyPayments from "../Pages/Dashboard/Payments/MyPayments";
import PaymentSuccess from "../Pages/Dashboard/Payments/PaymentSuccess";
import Favorites from "../Pages/SubPage/Favorites";
import AddDonation from "../Pages/Dashboard/AddDonation";

import RestaurantRoute from "./RestaurantRoute";
import AdminRoute from "./AdminRoute";
import CharityRoute from "./CharityRoute";
import Unauthorized from "../Pages/Dashboard/Unauthorized";

import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import ManageDonations from "../Pages/Dashboard/Admin/ManageDonations";
import RoleRequests from "../Pages/Dashboard/Admin/RoleRequests";
import PaymentHistory from "../Pages/Dashboard/Admin/PaymentHistory";
import RequestRole from "../Pages/Dashboard/Admin/RequestRole";
import NotFound from "../Pages/NotFound";

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
        loader: ({ params }) =>
          fetch(`http://localhost:5000/donations/${params.id}`),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "analytics",
        element: (
          <RestaurantRoute>
            <DashboardAnalytics />
          </RestaurantRoute>
        ),
      },
      {
        path: "add-donation",
        element: (
          <RestaurantRoute>
            <AddDonation />
          </RestaurantRoute>
        ),
      },
      {
        path: "my-donations",
        element: (
          <RestaurantRoute>
            <MyDonations />
          </RestaurantRoute>
        ),
      },
      {
        path: "edit-donation/:id",
        element: (
          <RestaurantRoute>
            <EditDonation />
          </RestaurantRoute>
        ),
      },
      {
        path: "view-requests",
        element: (
          <RestaurantRoute>
            <ViewRequests />
          </RestaurantRoute>
        ),
      },
      {
        path: "payment/:id",
        element: (
          <CharityRoute>
            <Payment />
          </CharityRoute>
        ),
      },
      {
        path: "my-payments",
        element: (
          <CharityRoute>
            <MyPayments />
          </CharityRoute>
        ),
      },
      {
        path: "favorites",
        element: (
          <PrivateRoute>
            <Favorites />
          </PrivateRoute>
        ),
      },
      {
        path: "payment-success", // ✅ Fixed
        element: (
          <PrivateRoute>
            <PaymentSuccess />
          </PrivateRoute>
        ),
      },
      {
        path: "request-role", // ✅ Fixed
        element: (
          <PrivateRoute>
            <RequestRole />
          </PrivateRoute>
        ),
      },

      // 🛡 Admin Routes
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "manage-donations",
        element: (
          <AdminRoute>
            <ManageDonations />
          </AdminRoute>
        ),
      },
      {
        path: "role-requests",
        element: (
          <AdminRoute>
            <RoleRequests />
          </AdminRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <AdminRoute>
            <PaymentHistory />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "/unauthorized", // 🔒 Unauthorized route
    element: <Unauthorized />,
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
  {
    path: "*",
    element: <NotFound />,
  },
]);