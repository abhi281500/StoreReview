import { useEffect, useState } from "react";

import {
  getOwnerDashboard,
  getOwnerRatings,
  updateOwnerPassword,
} from "../../services/owner.service";

import { useAuth } from "../../context/AuthContext.jsx";

import OwnerNavbar from "../../components/owner/OwnerNavbar.jsx";
import OwnerHeader from "../../components/owner/OwnerHeader.jsx";
import OwnerStats from "../../components/owner/OwnerStats.jsx";
import StoreInfo from "../../components/owner/StoreInfo.jsx";
import RatingTable from "../../components/owner/RatingTable.jsx";

import ChangePassword from "../../components/user/ChangePassword.jsx";

const OwnerDashboard = () => {
  // -----------------------------
  // Dashboard State
  // -----------------------------

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [dashboard, setDashboard] = useState(null);
  const [ratings, setRatings] = useState([]);

  // -----------------------------
  // Change Password State
  // -----------------------------

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [isPasswordUpdating, setIsPasswordUpdating] = useState(false);

  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  // -----------------------------
  // Auth
  // -----------------------------

  const { logout } = useAuth();

  // -----------------------------
  // Logout
  // -----------------------------

  const handleLogout = () => {
    logout();
  };

  // -----------------------------
  // Open Password Modal
  // -----------------------------

  const handleChangePassword = () => {
    setPasswordError("");
    setPasswordSuccess("");
    setIsPasswordOpen(true);
  };

  // -----------------------------
  // Close Password Modal
  // -----------------------------

  const handleClosePassword = () => {
    if (isPasswordUpdating) return;

    setIsPasswordOpen(false);

    setPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setPasswordError("");
    setPasswordSuccess("");
  };

  // -----------------------------
  // Get Owner Dashboard
  // -----------------------------

  const getDashboard = async () => {
    try {
      setLoading(true);
      setError(null);

      const api = await getOwnerDashboard();

      console.log("OWNER DASHBOARD:", api);

      setDashboard(api.data);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // Get Owner Ratings
  // -----------------------------

  const getRatings = async () => {
    try {
      setLoading(true);
      setError(null);

      const api = await getOwnerRatings();

      console.log("OWNER RATINGS:", api);

      setRatings(api.data);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch ratings"
      );
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // Update Password
  // -----------------------------

  const updatePassword = async (e) => {
    e.preventDefault();

    setPasswordError("");
    setPasswordSuccess("");

    // Confirm password validation
    if (newPassword !== confirmPassword) {
      setPasswordError(
        "New password and confirm password do not match."
      );
      return;
    }

    // Password validation
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;

    if (!passwordRegex.test(newPassword)) {
      setPasswordError(
        "Password must be 8–16 characters and include an uppercase letter and a special character."
      );
      return;
    }

    try {
      setIsPasswordUpdating(true);

      const credentials = {
        password,
        newPassword,
        confirmPassword,
      };

      console.log("PASSWORD CREDENTIALS:", credentials);

      const api = await updateOwnerPassword(credentials);

      console.log("PASSWORD UPDATE RESPONSE:", api);

      setPasswordSuccess(
        api?.message || "Password updated successfully."
      );

      setPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        setIsPasswordOpen(false);
        setPasswordSuccess("");
      }, 1200);
    } catch (error) {
      console.error(error);

      setPasswordError(
        error.response?.data?.message ||
          error.message ||
          "Failed to update password"
      );
    } finally {
      setIsPasswordUpdating(false);
    }
  };

  // -----------------------------
  // Fetch Dashboard + Ratings
  // -----------------------------

  useEffect(() => {
    getDashboard();
    getRatings();
  }, []);

  // -----------------------------
  // Loading
  // -----------------------------

  if (loading && !dashboard) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  // -----------------------------
  // UI
  // -----------------------------

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Navbar */}
      <OwnerNavbar
        onChangePassword={handleChangePassword}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Error */}
        {error && (
          <div className="mb-6 flex items-center justify-between rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">

            <span>{error}</span>

            <button
              type="button"
              onClick={() => setError(null)}
              className="font-semibold hover:text-red-900"
            >
              ✕
            </button>

          </div>
        )}

        {/* Header */}
        <OwnerHeader
          storeName={dashboard?.store?.name || "Your Store"}
        />

        {/* Stats */}
        <OwnerStats
          averageRating={dashboard?.averageRating || 0}
          totalRatings={dashboard?.totalRatings || 0}
        />

        {/* Store Information */}
        <StoreInfo
          store={dashboard?.store}
        />

        {/* Ratings Table */}
        <RatingTable
          ratings={ratings}
        />

      </main>

      {/* Change Password Modal */}
      {isPasswordOpen && (
        <ChangePassword
          currentPassword={password}
          newPassword={newPassword}
          confirmPassword={confirmPassword}
          isUpdating={isPasswordUpdating}
          error={passwordError}
          success={passwordSuccess}
          onCurrentPasswordChange={setPassword}
          onNewPasswordChange={setNewPassword}
          onConfirmPasswordChange={setConfirmPassword}
          onSubmit={updatePassword}
          onClose={handleClosePassword}
        />
      )}

    </div>
  );
};

export default OwnerDashboard;