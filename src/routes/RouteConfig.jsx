import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import UserHome from "../pages/UserHome";
import SelectSeat from "../pages/SelectSeat";
import UserProfile from "../components/UserComponents/UserProfile";
import SearchResults from "../components/UserComponents/SearchResults";
import ConfirmTicketPage from "../pages/ConfirmTicketPage";
import ProtectedRoute from "./ProtectedRoute";
import OperatorHome from "../components/BusOperatorComponents/OperatorHome";
import AdminDashboard from "../components/AdminComponents/AdminDashBoard";
import AdminHome from "../components/AdminComponents/AdminHome";
import { Toaster } from "react-hot-toast";
import LandingPage from "../pages/LandingPage";
import ForgotPassword from "../components/Common/ForgotPassword";
import ResetPassword from "../components/Common/ResetPassword";
export default function RouteConfig() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/adminHome" element={<AdminHome />} />

        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/operatorHome"
          element={
            <ProtectedRoute>
              <OperatorHome />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/userhome"
          element={
            <ProtectedRoute>
              <UserHome />
            </ProtectedRoute>
          }
        />

        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <SearchResults />
            </ProtectedRoute>
          }
        />

        <Route
          path="/booking"
          element={
            <ProtectedRoute>
              <SelectSeat />
            </ProtectedRoute>
          }
        />

        <Route
          path="/confirm-ticket"
          element={
            <ProtectedRoute>
              <ConfirmTicketPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}
