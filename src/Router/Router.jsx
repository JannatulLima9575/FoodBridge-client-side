import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import AuthLayout from "../Layouts/AuthLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import AllDonations from "../Pages/AllDonations";
import Dashboard from "../Pages/Dashboard/Dashboard";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import PrivateRoute from "./PrivateRoute";
import Payment from "../Pages/Dashboard/Payments/Payment";
import DonationDetails from "../Pages/SubPage/DonationDetails";
import MyDonations from "../Pages/SubPage/MyDonations";
import EditDonation from "../Pages/SubPage/EditDonation";
import DashboardAnalytics from "../Pages/Dashboard/Restaurant/DashboardAnalytics";
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
import RequestRole from "../Pages/Dashboard/User/RequestRole";
import NotFound from "../Pages/NotFound";
import DonationStatistics from "../Pages/Dashboard/Restaurant/DonationStatistics";
import { Component } from "react";
import Profile from "../Pages/Dashboard/Profile";
import ReportedDonations from "../Pages/Dashboard/ReportedDonations";
import RequestCharityRole from "../Pages/Dashboard/Charity/RequestCharityRole";
import Transactions from "../Pages/Dashboard/Charity/Transactions";
import MyReviews from "../Pages/Dashboard/Charity/MyReviews";
import UserFavorites from "../Pages/Dashboard/Charity/UserFavorites";
import TransactionHistory from "../Pages/Dashboard/Charity/TransactionHistory";
import ReceivedDonations from "../Pages/Dashboard/Charity/ReceivedDonations";
import MyPickups from "../Pages/Dashboard/Charity/MyPickups";
import MyRequests from "../Pages/Dashboard/Charity/MyRequests";
import CharityProfile from "../Pages/Dashboard/Charity/CharityProfile";
import AdminProfile from "../Pages/Dashboard/Admin/AdminProfile";
import FeatureDonations from "../Pages/Dashboard/Admin/FeatureDonations";
import ManageRequests from "../Pages/Dashboard/Admin/ManageRequests";
import RestaurantProfile from "./../Pages/Dashboard/Restaurant/RestaurantProfile";

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
          fetch(
            `https://food-bridge-server-side.vercel.app/donations/${params.id}`
          ),
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
        index: true, // ✅ Default dashboard route
        element: <DashboardHome />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      /* 👤 User Role Routes */
      {
        path: "request-charity",
        element: <RequestCharityRole />,
      },
      {
        path: "user-favorites",
        element: <UserFavorites />,
      },
      {
        path: "my-reviews",
        element: <MyReviews />,
      },
      {
        path: "transactions",
        element: <Transactions />,
      },
      {
        path: "restaurant-profile",
        element: (
          <RestaurantRoute>
            <RestaurantProfile />
          </RestaurantRoute>
        ),
      },
      {
        path: "donation-statistics",
        element: (
          <PrivateRoute>
            <RestaurantRoute>
              <DonationStatistics />
            </RestaurantRoute>
          </PrivateRoute>
        ),
      },
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
        path: "charity-profile",
        element: (
          <CharityRoute>
            <CharityProfile />
          </CharityRoute>
        ),
      },
      {
        path: "my-requests",
        element: (
          <CharityRoute>
            <MyRequests />
          </CharityRoute>
        ),
      },
      {
        path: "my-pickups",
        element: (
          <CharityRoute>
            <MyPickups />
          </CharityRoute>
        ),
      },
      {
        path: "received-donations",
        element: (
          <CharityRoute>
            <ReceivedDonations />
          </CharityRoute>
        ),
      },
      {
        path: "transaction-history",
        element: (
          <CharityRoute>
            <TransactionHistory />
          </CharityRoute>
        ),
      },
      {
        path: "statistics",
        element: (
          <RestaurantRoute>
            <DonationStatistics />
          </RestaurantRoute>
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
        path: "payment-success",
        element: (
          <PrivateRoute>
            <PaymentSuccess />
          </PrivateRoute>
        ),
      },

      {
        path: "request-role",
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
        path: "manage-requests",
        element: (
          <AdminRoute>
            <ManageRequests />
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
      {
        path: "reported-donations",
        element: (
          <AdminRoute>
            <ReportedDonations />
          </AdminRoute>
        ),
      },
      {
        path: "admin-profile",
        element: <AdminProfile />,
      },
      {
        path: "feature-donations",
        element: <FeatureDonations />,
      },
    ],
  },
  {
    path: "/unauthorized",
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
