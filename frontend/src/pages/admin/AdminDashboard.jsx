import { useEffect, useState } from "react";

import {
  getDashboard,
  createUser,
  createAdmin,
  createStoreOwner,
  createStore,
  getUsers,
  getUserById,
  getStores,
  updatePassword,
} from "../../services/admin.service.js";

// Layout
import AdminHeader from "../../components/admin/AdminHeader.jsx";
import AdminStats from "../../components/admin/AdminStats.jsx";
import AdminActions from "../../components/admin/AdminActions.jsx";

// Creation Modals
import CreateUserModal from "../../components/admin/CreateUserModal.jsx";
import CreateAdminModal from "../../components/admin/CreateAdminModal.jsx";
import CreateStoreOwnerModal from "../../components/admin/CreateStoreOwnerModal.jsx";
import CreateStoreModal from "../../components/admin/CreateStoreModal.jsx";

// User Management
import UserSearch from "../../components/admin/UserSearch.jsx";
import UserTable from "../../components/admin/UserTable.jsx";
import UserDetailsModal from "../../components/admin/UserDetailsModal.jsx";

// Store Management
import StoreSearch from "../../components/admin/StoreSearch.jsx";
import StoreTable from "../../components/admin/StoreTable.jsx";
import AdminNavbar from "../../components/admin/AdminNavbar.jsx";
import ChangePasswordModal from "../../components/admin/ChangePasswordModal.jsx";

import { useAuth } from "../../context/AuthContext.jsx";

const AdminDashboard = () => {

  // =====================================================
  // Dashboard State
  // =====================================================

  const [dashboardData, setDashboardData] = useState(null);
  const [dashboardLoading, setDashboardLoading] = useState(false);


  // =====================================================
  // User State
  // =====================================================

  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);

  const [individualUser, setIndividualUser] = useState(null);
  const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);


  // =====================================================
  // Store State
  // =====================================================

  const [stores, setStores] = useState([]);
  const [storesLoading, setStoresLoading] = useState(false);

  const [owners, setOwners] = useState([]);
  const [ownersLoading, setOwnersLoading] = useState(false);


  // =====================================================
  // Search State - Users
  // =====================================================

  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchAddress, setSearchAddress] = useState("");
  const [searchRole, setSearchRole] = useState("");


  // =====================================================
  // Search State - Stores
  // =====================================================

  const [storeSearchName, setStoreSearchName] = useState("");
  const [storeSearchAddress, setStoreSearchAddress] = useState("");


  // =====================================================
  // Creation Form State
  // =====================================================

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [ownerId, setOwnerId] = useState("");


  // =====================================================
  // Modal State
  // =====================================================

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false);
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);


  // =====================================================
  // Common Action State
  // =====================================================

  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

const [currentPassword, setCurrentPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

const [passwordLoading, setPasswordLoading] = useState(false);
const [passwordError, setPasswordError] = useState("");
const [passwordSuccess, setPasswordSuccess] = useState("");

  // =====================================================
  // Helper - API Error Message
  // =====================================================

  const getErrorMessage = (error, fallbackMessage) => {
    return (
      error.response?.data?.message ||
      error.message ||
      fallbackMessage
    );
  };
  const { logout } = useAuth();
  const handleLogout = () => {
  logout();
};

const resetPasswordForm = () => {
  setCurrentPassword("");
  setNewPassword("");
  setConfirmPassword("");
  setPasswordError("");
  setPasswordSuccess("");
};
const closePasswordModal = () => {
  setIsPasswordModalOpen(false);
  resetPasswordForm();
};
const handleChangePassword = async (e) => {
  e.preventDefault();

  setPasswordError("");
  setPasswordSuccess("");

  // Password match
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
    setPasswordLoading(true);

    const credentials = {
      currentPassword,
      newPassword,
      confirmPassword,
    };

    const api = await updatePassword(credentials);

    console.log(
      "ADMIN PASSWORD UPDATE RESPONSE:",
      api
    );

    setPasswordSuccess(
      api?.message ||
      "Password updated successfully."
    );

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setTimeout(() => {
      closePasswordModal();
    }, 1200);

  } catch (error) {
    console.error(
      "ADMIN PASSWORD UPDATE ERROR:",
      error
    );

    setPasswordError(
      error.response?.data?.message ||
      error.message ||
      "Failed to update password."
    );
  } finally {
    setPasswordLoading(false);
  }
};

  // =====================================================
  // Reset Creation Form
  // =====================================================

  const resetForm = () => {
    setName("");
    setEmail("");
    setAddress("");
    setPassword("");
    setOwnerId("");
    setError(null);
  };


  // =====================================================
  // Get Dashboard
  // =====================================================

  const handleDashboard = async () => {
    try {
      setDashboardLoading(true);

      const api = await getDashboard();

      console.log("DASHBOARD RESPONSE:", api);

      setDashboardData(api.data);

    } catch (error) {
      console.error("DASHBOARD ERROR:", error);

      setError(
        getErrorMessage(
          error,
          "Failed to fetch dashboard data"
        )
      );
    } finally {
      setDashboardLoading(false);
    }
  };


  // =====================================================
  // Get Users
  // =====================================================

  const handleGetUsers = async () => {
    try {
      setUsersLoading(true);

      const api = await getUsers();

      console.log("USERS RESPONSE:", api);

      setUsers(api.data || []);

    } catch (error) {
      console.error("GET USERS ERROR:", error);

      setError(
        getErrorMessage(
          error,
          "Failed to fetch users"
        )
      );
    } finally {
      setUsersLoading(false);
    }
  };


  // =====================================================
  // Get Stores
  // =====================================================

  const handleGetStores = async () => {
    try {
      setStoresLoading(true);

      const api = await getStores();

      console.log("STORES RESPONSE:", api);

      setStores(api.data || []);

    } catch (error) {
      console.error("GET STORES ERROR:", error);

      setError(
        getErrorMessage(
          error,
          "Failed to fetch stores"
        )
      );
    } finally {
      setStoresLoading(false);
    }
  };


  // =====================================================
  // Get Store Owners
  // =====================================================

  const handleGetOwners = async () => {
    try {
      setOwnersLoading(true);

      const api = await getUsers();

      console.log(
        "ALL USERS FOR OWNER FILTER:",
        api
      );

      const storeOwners = (api.data || []).filter(
        (user) => user.role === "STORE_OWNER"
      );

      setOwners(storeOwners);

    } catch (error) {
      console.error(
        "GET STORE OWNERS ERROR:",
        error
      );

      setError(
        getErrorMessage(
          error,
          "Failed to fetch store owners"
        )
      );
    } finally {
      setOwnersLoading(false);
    }
  };


  // =====================================================
  // Get Individual User
  // =====================================================

  const handleGetUserById = async (id) => {
    if (!id) {
      return;
    }

    try {
      setDetailsLoading(true);
      setError(null);

      const api = await getUserById(id);

      console.log(
        "USER DETAILS RESPONSE:",
        api
      );

      setIndividualUser(api.data);

    } catch (error) {
      console.error(
        "GET USER DETAILS ERROR:",
        error
      );

      setError(
        getErrorMessage(
          error,
          "Failed to fetch user details"
        )
      );
    } finally {
      setDetailsLoading(false);
    }
  };


  // =====================================================
  // View User Details
  // =====================================================

  const handleViewUserDetails = async (id) => {
    setIndividualUser(null);
    setError(null);
    setIsUserDetailsOpen(true);

    await handleGetUserById(id);
  };


  // =====================================================
  // Create User
  // =====================================================

  const handleCreateUser = async (e) => {
    e.preventDefault();

    const credentials = {
      name,
      email,
      address,
      password,
    };

    try {
      setActionLoading(true);
      setError(null);

      const api = await createUser(credentials);

      console.log(
        "CREATE USER RESPONSE:",
        api
      );

      closeUserModal();

      await Promise.all([
        handleGetUsers(),
        handleDashboard(),
      ]);

    } catch (error) {
      console.error(
        "CREATE USER ERROR:",
        error
      );

      setError(
        getErrorMessage(
          error,
          "Failed to create user"
        )
      );
    } finally {
      setActionLoading(false);
    }
  };


  // =====================================================
  // Create Admin
  // =====================================================

  const handleCreateAdmin = async (e) => {
    e.preventDefault();

    const credentials = {
      name,
      email,
      address,
      password,
    };

    try {
      setActionLoading(true);
      setError(null);

      const api = await createAdmin(credentials);

      console.log(
        "CREATE ADMIN RESPONSE:",
        api
      );

      closeAdminModal();

      await Promise.all([
        handleGetUsers(),
        handleDashboard(),
      ]);

    } catch (error) {
      console.error(
        "CREATE ADMIN ERROR:",
        error
      );

      setError(
        getErrorMessage(
          error,
          "Failed to create admin"
        )
      );
    } finally {
      setActionLoading(false);
    }
  };


  // =====================================================
  // Create Store Owner
  // =====================================================

  const handleCreateStoreOwner = async (e) => {
    e.preventDefault();

    const credentials = {
      name,
      email,
      address,
      password,
    };

    try {
      setActionLoading(true);
      setError(null);

      const api = await createStoreOwner(
        credentials
      );

      console.log(
        "CREATE STORE OWNER RESPONSE:",
        api
      );

      closeOwnerModal();

      await Promise.all([
        handleGetUsers(),
        handleGetOwners(),
        handleDashboard(),
      ]);

    } catch (error) {
      console.error(
        "CREATE STORE OWNER ERROR:",
        error
      );

      setError(
        getErrorMessage(
          error,
          "Failed to create store owner"
        )
      );
    } finally {
      setActionLoading(false);
    }
  };


  // =====================================================
  // Create Store
  // =====================================================

  const handleCreateStore = async (e) => {
    e.preventDefault();

    if (!ownerId) {
      setError("Please select a store owner.");
      return;
    }

    const credentials = {
      name,
      email,
      address,
      ownerId,
    };

    try {
      setActionLoading(true);
      setError(null);

      const api = await createStore(
        credentials
      );

      console.log(
        "CREATE STORE RESPONSE:",
        api
      );

      closeStoreModal();

      await Promise.all([
        handleGetStores(),
        handleDashboard(),
      ]);

    } catch (error) {
      console.error(
        "CREATE STORE ERROR:",
        error
      );

      setError(
        getErrorMessage(
          error,
          "Failed to create store"
        )
      );
    } finally {
      setActionLoading(false);
    }
  };


  // =====================================================
  // Close User Modal
  // =====================================================

  const closeUserModal = () => {
    setIsUserModalOpen(false);
    resetForm();
  };


  // =====================================================
  // Close Admin Modal
  // =====================================================

  const closeAdminModal = () => {
    setIsAdminModalOpen(false);
    resetForm();
  };


  // =====================================================
  // Close Owner Modal
  // =====================================================

  const closeOwnerModal = () => {
    setIsOwnerModalOpen(false);
    resetForm();
  };


  // =====================================================
  // Close Store Modal
  // =====================================================

  const closeStoreModal = () => {
    setIsStoreModalOpen(false);
    resetForm();
  };


  // =====================================================
  // Filter Users
  // =====================================================

  const filteredUsers = users.filter((user) => {

    const nameMatch =
      !searchName ||
      user.name
        ?.toLowerCase()
        .includes(
          searchName.toLowerCase()
        );

    const emailMatch =
      !searchEmail ||
      user.email
        ?.toLowerCase()
        .includes(
          searchEmail.toLowerCase()
        );

    const addressMatch =
      !searchAddress ||
      user.address
        ?.toLowerCase()
        .includes(
          searchAddress.toLowerCase()
        );

    const roleMatch =
      !searchRole ||
      user.role === searchRole;

    return (
      nameMatch &&
      emailMatch &&
      addressMatch &&
      roleMatch
    );
  });


  // =====================================================
  // Filter Stores
  // =====================================================

  const filteredStores = stores.filter((store) => {

    const nameMatch =
      !storeSearchName ||
      store.name
        ?.toLowerCase()
        .includes(
          storeSearchName.toLowerCase()
        );

    const addressMatch =
      !storeSearchAddress ||
      store.address
        ?.toLowerCase()
        .includes(
          storeSearchAddress.toLowerCase()
        );

    return (
      nameMatch &&
      addressMatch
    );
  });


  // =====================================================
  // Initial Data Fetch
  // =====================================================

  useEffect(() => {

    handleDashboard();
    handleGetUsers();
    handleGetStores();
    handleGetOwners();

  }, []);


  // =====================================================
  // Render
  // =====================================================

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminNavbar
      onChangePassword={() => {
        resetPasswordForm();
        setIsPasswordModalOpen(true);
      }}
      onLogout={handleLogout}
    />


      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">


        {/* =================================================
            Header
        ================================================= */}

        <AdminHeader />


        {/* =================================================
            Error Message
        ================================================= */}

        {error && !isUserModalOpen &&
          !isAdminModalOpen &&
          !isOwnerModalOpen &&
          !isStoreModalOpen && (
            <div className="mb-6 flex items-center justify-between rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">

              <span>{error}</span>

              <button
                type="button"
                onClick={() => setError(null)}
                className="ml-4 font-semibold text-red-700 hover:text-red-900"
              >
                ✕
              </button>

            </div>
          )}


        {/* =================================================
            Statistics
        ================================================= */}

        <AdminStats
          totalUsers={
            dashboardData?.totalUsers || 0
          }
          totalStores={
            dashboardData?.totalStores || 0
          }
          totalRatings={
            dashboardData?.totalRatings || 0
          }
        />


        {/* =================================================
            Quick Actions
        ================================================= */}

        <AdminActions

          onAddUser={() => {
            resetForm();
            setIsUserModalOpen(true);
          }}

          onAddAdmin={() => {
            resetForm();
            setIsAdminModalOpen(true);
          }}

          onAddStoreOwner={() => {
            resetForm();
            setIsOwnerModalOpen(true);
          }}

          onAddStore={() => {
            resetForm();
            setIsStoreModalOpen(true);
            handleGetOwners();
          }}

        />


        {/* =================================================
            User Management
        ================================================= */}

        <section className="mb-10">

          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900">
              User Management
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Search, sort, and view registered users.
            </p>
          </div>


          <UserSearch
            searchName={searchName}
            searchEmail={searchEmail}
            searchAddress={searchAddress}
            searchRole={searchRole}

            onNameChange={setSearchName}
            onEmailChange={setSearchEmail}
            onAddressChange={setSearchAddress}
            onRoleChange={setSearchRole}

            onClear={() => {
              setSearchName("");
              setSearchEmail("");
              setSearchAddress("");
              setSearchRole("");
            }}
          />


          {usersLoading ? (

            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">

              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

              <p className="mt-4 text-sm text-slate-500">
                Loading users...
              </p>

            </div>

          ) : (

            <UserTable
              users={filteredUsers}
              onViewDetails={handleViewUserDetails}
            />

          )}

        </section>


        {/* =================================================
            Store Management
        ================================================= */}

        <section className="mb-10">

          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900">
              Store Management
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Search and view stores registered on the platform.
            </p>
          </div>


          <StoreSearch
            searchName={storeSearchName}
            searchAddress={storeSearchAddress}

            onNameChange={setStoreSearchName}
            onAddressChange={setStoreSearchAddress}

            onClear={() => {
              setStoreSearchName("");
              setStoreSearchAddress("");
            }}
          />


          {storesLoading ? (

            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">

              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

              <p className="mt-4 text-sm text-slate-500">
                Loading stores...
              </p>

            </div>

          ) : (

            <StoreTable
              stores={filteredStores}
            />

          )}

        </section>


        {/* =================================================
            Create User Modal
        ================================================= */}

        {isUserModalOpen && (
          <CreateUserModal
            name={name}
            email={email}
            address={address}
            password={password}

            loading={actionLoading}
            error={error}

            onNameChange={setName}
            onEmailChange={setEmail}
            onAddressChange={setAddress}
            onPasswordChange={setPassword}

            onSubmit={handleCreateUser}
            onClose={closeUserModal}
          />
        )}


        {/* =================================================
            Create Admin Modal
        ================================================= */}

        {isAdminModalOpen && (
          <CreateAdminModal
            name={name}
            email={email}
            address={address}
            password={password}

            loading={actionLoading}
            error={error}

            onNameChange={setName}
            onEmailChange={setEmail}
            onAddressChange={setAddress}
            onPasswordChange={setPassword}

            onSubmit={handleCreateAdmin}
            onClose={closeAdminModal}
          />
        )}


        {/* =================================================
            Create Store Owner Modal
        ================================================= */}

        {isOwnerModalOpen && (
          <CreateStoreOwnerModal
            name={name}
            email={email}
            address={address}
            password={password}

            loading={actionLoading}
            error={error}

            onNameChange={setName}
            onEmailChange={setEmail}
            onAddressChange={setAddress}
            onPasswordChange={setPassword}

            onSubmit={handleCreateStoreOwner}
            onClose={closeOwnerModal}
          />
        )}


        {/* =================================================
            Create Store Modal
        ================================================= */}

        {isStoreModalOpen && (
          <CreateStoreModal
            name={name}
            email={email}
            address={address}
            ownerId={ownerId}
            owners={owners}

            loading={
              actionLoading ||
              ownersLoading
            }

            error={error}

            onNameChange={setName}
            onEmailChange={setEmail}
            onAddressChange={setAddress}
            onOwnerChange={setOwnerId}

            onSubmit={handleCreateStore}
            onClose={closeStoreModal}
          />
        )}


        {/* =================================================
            User Details Modal
        ================================================= */}

        {isUserDetailsOpen && (
          <UserDetailsModal
            user={individualUser}
            loading={detailsLoading}
            error={error}

            onClose={() => {
              setIsUserDetailsOpen(false);
              setIndividualUser(null);
              setError(null);
            }}
          />
        )}


        {isPasswordModalOpen && (
  <ChangePasswordModal
    currentPassword={currentPassword}
    newPassword={newPassword}
    confirmPassword={confirmPassword}

    loading={passwordLoading}
    error={passwordError}
    success={passwordSuccess}

    onCurrentPasswordChange={setCurrentPassword}
    onNewPasswordChange={setNewPassword}
    onConfirmPasswordChange={setConfirmPassword}

    onSubmit={handleChangePassword}
    onClose={closePasswordModal}
  />
)}

      </main>

    </div>
  );
};


export default AdminDashboard;