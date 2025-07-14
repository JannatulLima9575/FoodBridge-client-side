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
import RestaurantRoute from './RestaurantRoute';

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
        element: <DashboardAnalytics />,
      },
      {
        path: "my-donations",
        element: <MyDonations />,
      },
      {
        path: "edit-donation/:id",
        element: <EditDonation />,
      },
      {
        path: "payment/:id", // Dynamic donation payment page
        element: <Payment />,
      },
      {
        path: "my-payments",
        element: <MyPayments />,
      },
      {
        path: "view-requests",
        element: <ViewRequests />,
      },
      {
        path: "payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "/dashboard/favorites",
        element: <Favorites />,
      },
      {
        path: "add-donation",

        element: <RestaurantRoute>
          <AddDonation />
        </RestaurantRoute>,
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
