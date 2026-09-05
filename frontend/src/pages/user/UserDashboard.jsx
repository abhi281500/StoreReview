import { useEffect, useState } from "react";

import {
  getStores,
  submitRating,
  updateRating,
  updatePassword,
} from "../../services/user.service.js";

import StoreTable from "../../components/user/StoreTable.jsx";
import StoreSearch from "../../components/user/StoreSearch.jsx";
import RatingModal from "../../components/user/RatingModal.jsx";
import ChangePassword from "../../components/user/ChangePassword.jsx";
import Navbar from "../../components/user/Navbar.jsx";
import { useAuth } from "../../context/AuthContext.jsx";


const UserDashboard = () => {
  
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  const [searchName, setSearchName] = useState("");
  const [searchAddress, setSearchAddress] = useState("");

 
  const [selectedStore, setSelectedStore] = useState(null);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [rating, setRating] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  
  
 
  
const [isPasswordOpen, setIsPasswordOpen] = useState(false);
const [currentPassword, setCurrentPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [isPasswordUpdating, setIsPasswordUpdating] = useState(false);
const [passwordError, setPasswordError] = useState("");
const [passwordSuccess, setPasswordSuccess] = useState(""); 
  const fetchStores = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getStores();

      console.log(data.data);

      setStores(data.data);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch stores"
      );
    } finally {
      setLoading(false);
    }
  };

 
  const openRatingModal = (store) => {
    setSelectedStore(store);
    setIsUpdating(false);
    setRating("");
    setIsRatingOpen(true);
  };

 
  const openUpdateModal = (store) => {
    setSelectedStore(store);
    setIsUpdating(true);
    setRating(String(store.userSubmittedRating));
    setIsRatingOpen(true);
  };

 
  const closeRatingModal = () => {
    setIsRatingOpen(false);
    setSelectedStore(null);
    setRating("");
    setIsUpdating(false);
  };

  
  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  
  const handleRatingSubmit = async (e) => {
    e.preventDefault();

    if (!selectedStore || !rating) {
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      let data;

      if (isUpdating) {
        const credentials = {
          rating: rating,
        };

        data = await updateRating(selectedStore.id, credentials);
      } else {
        const credentials = {
          storeId: selectedStore.id,
          rating: rating,
        };

        data = await submitRating(credentials);
      }

      console.log(data);

      closeRatingModal();

      // Refresh stores so rating/overall rating updates
      await fetchStores();
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong"
      );
    } finally {
      setSubmitting(false);
    }
  };

  
  const changePassword = async (e) => {
  e.preventDefault();

  setPasswordError("");
  setPasswordSuccess("");

  if (newPassword !== confirmPassword) {
    setPasswordError("New password and confirm password do not match");
    return;
  }

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
      currentPassword,
      newPassword,
      confirmPassword,
    };

    const data = await updatePassword(credentials);

    console.log(data);

    setPasswordSuccess(
      data?.message || "Password updated successfully"
    );

    setCurrentPassword("");
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

  
  const filteredStores = stores.filter((store) => {
    const nameMatch = store.name
      .toLowerCase()
      .includes(searchName.toLowerCase());

    const addressMatch = store.address
      .toLowerCase()
      .includes(searchAddress.toLowerCase());

    return nameMatch && addressMatch;
  });


  const { logout } = useAuth();
  const handleLogout = () => {
  logout();
};
  
  useEffect(() => {
    fetchStores();
  }, []);

  
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-xl font-semibold text-gray-700">
          Loading stores...
        </h1>
      </div>
    );
  }

  
 return (
  <div className="min-h-screen bg-slate-50">

    {/* Navbar */}
    <Navbar
      onChangePassword={() => setIsPasswordOpen(true)}
      onLogout={handleLogout}
    />

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
    {/* Dashboard Header */}
<section className="mb-8">

  <div className="max-w-3xl">

    {/* Small Label */}
    <div className="mb-3 flex items-center gap-2">
      <span className="h-2 w-2 rounded-full bg-blue-600"></span>

      <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
        User Dashboard
      </span>
    </div>

    {/* Main Heading */}
    <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
      Discover & Rate Stores
    </h1>

    {/* Description */}
    <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
      Browse available stores, check their ratings, and share your
      experience with the community.
    </p>

  </div>

</section>

      {/* Stats */}
      {/* Stats Cards */}
<section className="mb-8 grid gap-5 sm:grid-cols-2">

  {/* Available Stores */}
  <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">

    <div className="flex items-start justify-between">

      <div>
        <p className="text-sm font-medium text-slate-500">
          Available Stores
        </p>

        <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
          {stores.length}
        </p>

        <p className="mt-1 text-xs text-slate-400">
          Total stores available
        </p>
      </div>

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl transition group-hover:scale-105">
        🏪
      </div>

    </div>

  </div>


  {/* Showing Results */}
  <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">

    <div className="flex items-start justify-between">

      <div>
        <p className="text-sm font-medium text-slate-500">
          Showing Results
        </p>

        <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
          {filteredStores.length}
        </p>

        <p className="mt-1 text-xs text-slate-400">
          Based on your search
        </p>
      </div>

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-xl transition group-hover:scale-105">
        🔍
      </div>

    </div>

  </div>

</section>

      {/* Search Section */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

        <div className="mb-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Find a Store
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Search stores by name or address.
          </p>
        </div>

        <StoreSearch
          searchName={searchName}
          searchAddress={searchAddress}
          onNameChange={setSearchName}
          onAddressChange={setSearchAddress}
        />

      </div>

      {/* Store Table */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Stores
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Click column headings to sort the results.
            </p>
          </div>

          <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            {filteredStores.length} stores
          </span>

        </div>

        {filteredStores.length === 0 ? (
          <div className="px-6 py-16 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl">
              🔍
            </div>

            <h3 className="mt-4 text-base font-semibold text-slate-900">
              No stores found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search terms.
            </p>

          </div>
        ) : (
          <StoreTable
            stores={filteredStores}
            onRate={openRatingModal}
            onUpdate={openUpdateModal}
          />
        )}

      </div>

    </main>

    {/* Rating Modal */}
    <RatingModal
      isOpen={isRatingOpen}
      selectedStore={selectedStore}
      rating={rating}
      isUpdating={isUpdating}
      submitting={submitting}
      onChange={handleRatingChange}
      onSubmit={handleRatingSubmit}
      onClose={closeRatingModal}
    />

    {/* Change Password */}
    {isPasswordOpen && (
      <ChangePassword
  currentPassword={currentPassword}
  newPassword={newPassword}
  confirmPassword={confirmPassword}
  isUpdating={isPasswordUpdating}
  error={passwordError}
  success={passwordSuccess}
  onCurrentPasswordChange={setCurrentPassword}
  onNewPasswordChange={setNewPassword}
  onConfirmPasswordChange={setConfirmPassword}
  onSubmit={changePassword}
  onClose={() => {
    setIsPasswordOpen(false);
    setPasswordError("");
    setPasswordSuccess("");
  }}
/>
    )}

  </div>
);
};

export default UserDashboard;